import {createRoute, headerConfig} from '../../../utils'
import homeMain from './homeMain'


const namespace = "home";
const RouteConfig = createRoute({
  home: {screen: homeMain},


}, namespace);

export default RouteConfig
