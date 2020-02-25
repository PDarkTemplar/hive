import ClearDay from './ClearDay';
import ClearNight from './ClearNight';
import Cloud from './Cloud';
import CloudDay from './CloudDay';
import CloudNight from './CloudNight';
import Fog from './Fog';
import Rain from './Rain';
import Sleet from './Sleet';
import Snow from './Snow';
import Wind from './Wind';

const exportData: any = {};
exportData['clear-day'] = ClearDay;
exportData['clear-night'] = ClearNight;
exportData['partly-cloudy-day'] = CloudDay;
exportData['partly-cloudy-night'] = CloudNight;
exportData.cloudy = Cloud;
exportData.fog = Fog;
exportData.rain = Rain;
exportData.sleet = Sleet;
exportData.snow = Snow;
exportData.wind = Wind;

export default exportData;
