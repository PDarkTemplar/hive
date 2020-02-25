import { runInAction, action, when } from 'mobx';
import mqtt from 'async-mqtt';

import Store from 'store/Store';

class Mqtt {
    private store: Store;

    private client?: mqtt.AsyncMqttClient;

    private clientId: string = `mqttjs_${Math.random()
        .toString(16)
        .substr(2, 8)}`;

    private subscriptions: Map<string, ((result: any) => void)[]> = new Map();

    constructor(globalStore: Store) {
        this.store = globalStore;
    }

    setPassword(token: string) {
        if (this.client) {
            this.client.options.password = token;
        }
    }

    @action.bound
    unload() {
        if (this.client) {
            this.client.end();
        }
    }

    @action.bound
    async publish(topic: string, data?: any) {
        if (this.client && this.store.viewModels.mqttView.initialized) {
            if (!data) {
                data = {};
            }
            data.clientId = this.clientId;
            await this.client.publish(topic, JSON.stringify(data), { qos: 1 });
        } else {
            this.publishAfterInit(topic, data);
        }
    }

    @action.bound
    async subscribe(topic: string, callback: (result: any) => void) {
        if (this.client && this.store.viewModels.mqttView.initialized) {
            const subscription = this.subscriptions.get(topic);
            if (subscription && !subscription.includes(callback)) {
                subscription.push(callback);
            }
            if (!subscription) {
                this.subscriptions.set(topic, [callback]);
            }
            await this.client.subscribe(topic, { qos: 1 });
        } else {
            this.subscribeAfterInit(topic, callback);
        }
    }

    @action.bound
    private subscribeAfterInit(topic: string, callback: (result: any) => void) {
        when(
            () => this.store.viewModels.mqttView.initialized,
            () => this.subscribe(topic, callback)
        );
    }

    @action.bound
    private publishAfterInit(topic: string, data?: any) {
        when(
            () => this.store.viewModels.mqttView.initialized,
            () => {
                // wait for all subs
                setTimeout(() => this.publish(topic, data), 0);
            }
        );
    }

    unsubscribe(topic: string, callback?: (result: any) => void) {
        if (!callback) {
            this.subscriptions.delete(topic);
            if (this.client) {
                return this.client.unsubscribe(topic);
            }
            throw new Error('Error. mqtt client not initialized');
        }

        const subscription = this.subscriptions.get(topic);
        if (subscription) {
            const index = subscription.indexOf(callback);
            if (index > -1) {
                subscription.splice(index, 1);
            }
            if (!subscription.length) {
                this.subscriptions.delete(topic);
                if (this.client) {
                    return this.client.unsubscribe(topic);
                }
                throw new Error('Error. mqtt client not initialized');
            }
        }
        throw new Error('Error. no subscription');
    }

    connect(token: string) {
        const { commonView, authView, mqttView } = this.store.viewModels;
        const { authService } = this.store.services;

        if (this.client) {
            this.client.options.password = token;
            return;
        }

        this.client = mqtt.connect(MQTT_PATH, {
            username: 'anyuser',
            clientId: this.clientId,
            password: token,
            keepalive: 60,
            connectTimeout: 30000,
            clean: true,
        });
        this.client.on('close', () => {
            runInAction(() => {
                if (authView.authorized) {
                    commonView.setLoadingText('Connection with server lost...');
                    commonView.loading = true;
                }
            });
        });
        this.client.on('error', () => {
            runInAction(() => {
                authService.reconnect();
                setTimeout(() => {
                    if (commonView.loading) {
                        window.location.reload();
                    }
                }, 5000);
            });
        });
        this.client.on('connect', () => {
            runInAction(() => {
                if (!mqttView.initialized) {
                    mqttView.initialized = true;
                }
                authView.loading = false;
                commonView.loading = false;
            });
        });
        this.client.on('message', (topic: string, message: Buffer) => {
            const messageResult = JSON.parse(message.toString());
            if (messageResult.clientId !== this.clientId && messageResult.clientId != null) return;

            delete messageResult.clientId;

            const subscription = this.subscriptions.get(topic);

            if (subscription) {
                subscription.forEach(x => {
                    runInAction(() => {
                        x(messageResult);
                    });
                });
            }
        });
    }
}

export default Mqtt;
