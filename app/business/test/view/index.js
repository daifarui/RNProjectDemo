import {createRoute, headerConfig} from '../../../utils'
import account from './Account'
import detail from './Detail'
import home from './Home'
import login from './Login'

const namespace = "test";
const RouteConfig = createRoute({
  login: {screen: login},
  account: {screen: account},
  detail: {screen: detail},
  home: {screen: home},

}, namespace);

export default RouteConfig
