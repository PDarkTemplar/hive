import CommonView from './common/viewModels/Common';
import AuthView from './common/viewModels/Auth';
import MqttView from './common/viewModels/Mqtt';
import ZWaveView from './z-wave/viewModels';
import AdminView from './common/viewModels/Admin';
import DashboardView from './dashboard/viewModels/Dashboard';
import VentilationView from './ventilation/viewModels';
import WeatherView from './weather/viewModels';
import ConditionaireView from './conditionaire/viewModels';
import MediaView from './media/viewModels';
import Co2View from './co2/viewModels';

import AuthService from './common/services/Auth';
import MQTTService from './common/services/Mqtt';
import CommonService from './common/services/Common';
import ZWaveService from './z-wave/services';
import DashboardService from './dashboard/services/Dashboard';
import VentilationService from './ventilation/services';
import WeatherService from './weather/services';
import ConditionaireService from './conditionaire/services';
import MediaService from './media/services';
import Co2Service from './co2/services';

interface IViewModels {
    authView: AuthView;
    commonView: CommonView;
    mqttView: MqttView;
    zWaveView: ZWaveView;
    adminView: AdminView;
    dashboardView: DashboardView;
    ventilationView: VentilationView;
    weatherView: WeatherView;
    conditionaireView: ConditionaireView;
    mediaView: MediaView;
    co2View: Co2View;
}

interface IServices {
    authService: AuthService;
    mqttService: MQTTService;
    commonService: CommonService;
    zWaveService: ZWaveService;
    dashboardService: DashboardService;
    ventilationService: VentilationService;
    weatherService: WeatherService;
    conditionaireService: ConditionaireService;
    mediaService: MediaService;
    co2Service: Co2Service;
}

interface IStore {
    viewModels: IViewModels;
    services: IServices;
}

class Store implements IStore {
    viewModels: IViewModels;

    services: IServices;

    constructor() {
        this.services = {} as IServices;
        this.viewModels = {} as IViewModels;

        this.viewModels.authView = new AuthView();
        this.viewModels.commonView = new CommonView();
        this.viewModels.mqttView = new MqttView();
        this.viewModels.zWaveView = new ZWaveView();
        this.viewModels.adminView = new AdminView();
        this.viewModels.dashboardView = new DashboardView();
        this.viewModels.ventilationView = new VentilationView();
        this.viewModels.weatherView = new WeatherView();
        this.viewModels.conditionaireView = new ConditionaireView();
        this.viewModels.mediaView = new MediaView();
        this.viewModels.co2View = new Co2View();

        this.services.authService = new AuthService(this);
        this.services.mqttService = new MQTTService(this);
        this.services.commonService = new CommonService(this);
        this.services.zWaveService = new ZWaveService(this);
        this.services.dashboardService = new DashboardService(this);
        this.services.ventilationService = new VentilationService(this);
        this.services.weatherService = new WeatherService(this);
        this.services.conditionaireService = new ConditionaireService(this);
        this.services.mediaService = new MediaService(this);
        this.services.co2Service = new Co2Service(this);
    }
}

export default Store;
