module.exports = function (RED) {
    "use strict";
    var isUtf8 = require('is-utf8');

    function MQTTInDynamicNode(n) {

        function subscribe(node, topic, qos) {
            if (!topic || !/^(#$|(\+|[^+#]*)(\/(\+|[^+#]*))*(\/(\+|#|[^+#]*))?$)/.test(topic)) {
                return node.warn(RED._("mqtt.errors.invalid-topic"));
            }

            if (node.brokerConn) {
                node.status({ fill: "red", shape: "ring", text: "node-red:common.status.disconnected" });
                if (topic) {
                    if(node.previousTopic)
                    {
                        node.brokerConn.unsubscribe(node.previousTopic, node.id);
                    }

                    node.brokerConn.register(node);
                    node.brokerConn.subscribe(topic, qos, function (topic, payload, packet) {
                        var clientId = null;
                        if (isUtf8(payload)) { payload = payload.toString(); }
                        try{
                            payload = JSON.parse(payload);
                            clientId = payload.clientId;
                            delete payload.clientId;
                        }catch (err){
                            // err
                        }
                        var msg = { topic: topic, payload: payload, qos: packet.qos, retain: packet.retain, clientId: clientId };
                        if ((node.brokerConn.broker === "localhost") || (node.brokerConn.broker === "127.0.0.1")) {
                            msg._topic = topic;
                        }
                        node.send(msg);
                    }, node.id);
                    if (node.brokerConn.connected) {
                        node.status({ fill: "green", shape: "dot", text: "node-red:common.status.connected" });
                    }
                }
                else {
                    node.error(RED._("mqtt.errors.not-defined"));
                }
        }
    };

        RED.nodes.createNode(this, n);

        this.broker = n.broker;
        this.topic = n.topic;
        this.qos = parseInt(n.qos);
        this.brokerConn = RED.nodes.getNode(this.broker);

        var node = this;

        subscribe(node, this.topic, this.qos);

        this.on('input', function (msg) {
            var qos = this.qos == null ? msg.qos == null ? 2 : msg.qos : this.qos;
            var topic = this.topic == null ? msg.topic : this.topic;
            this.previousTopic = topic;

            subscribe(node, topic, qos);
            
            }.bind(this));

        this.on('close', function (done) {
            if (node.brokerConn) {
                node.brokerConn.unsubscribe(node.topic, node.id);
                node.brokerConn.deregister(node, done);
            }
        });
    }

RED.nodes.registerType("mqtt in dynamic", MQTTInDynamicNode);

function MQTTOutDynamicNode(n) {
        RED.nodes.createNode(this,n);
        this.topic = n.topic;
        this.qos = n.qos || null;
        this.retain = n.retain;
        this.broker = n.broker;
        this.brokerConn = RED.nodes.getNode(this.broker);
        var node = this;

        if (this.brokerConn) {
            this.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"});
            this.on("input",function(msg) {
                if (msg.qos) {
                    msg.qos = parseInt(msg.qos);
                    if ((msg.qos !== 0) && (msg.qos !== 1) && (msg.qos !== 2)) {
                        msg.qos = null;
                    }
                }
                msg.qos = Number(node.qos || msg.qos || 0);
                msg.retain = node.retain || msg.retain || false;
                msg.retain = ((msg.retain === true) || (msg.retain === "true")) || false;
                if (node.topic) {
                    msg.topic = node.topic;
                }
                if ( msg.hasOwnProperty("payload")) {
					msg.payload.clientId = msg.clientId;
					delete msg.clientId;
                    if (msg.hasOwnProperty("topic") && (typeof msg.topic === "string") && (msg.topic !== "")) { // topic must exist
                        this.brokerConn.publish(msg);  // send the message
                    }
                    else { node.warn(RED._("mqtt.errors.invalid-topic")); }
                }
            });
            if (this.brokerConn.connected) {
                node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
            }
            node.brokerConn.register(node);
            this.on('close', function(done) {
                node.brokerConn.deregister(node,done);
            });
        } else {
            this.error(RED._("mqtt.errors.missing-config"));
        }
    }
RED.nodes.registerType("mqtt out dynamic",MQTTOutDynamicNode);
};