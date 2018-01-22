import {createRoute, headerConfig} from '../../../utils'
import account from './Account'
import detail from './Detail'
import home from './Home'
import login from './Login'

const namespace = "test";
const RouteConfig = createRoute({
  account: {screen: account},
  detail: {screen: detail},
  home: {screen: home},
  login: {screen: login},
}, namespace);

export default RouteConfig
