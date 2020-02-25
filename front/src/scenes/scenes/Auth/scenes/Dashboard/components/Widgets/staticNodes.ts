import Ventilation from './ventilation/model/Widget';
import Weather from './weather/model/Widget';
import Conditionaire from './conditionaire/model/Widget';
import Media from './media/model/Widget';
import Co2 from './co2/model/Widget';

function getStaticNodes() {
    return [
        new Ventilation(),
        new Weather(),
        new Conditionaire('c1', 'living conditionaire'),
        new Conditionaire('c2', 'vika conditionaire'),
        new Media(),
        new Co2('co21', 'co2'),
    ];
}

export default getStaticNodes;
