import {createRoute, headerConfig} from '../../../utils'
import changePwd from './changePwd'
import retrievePwd from './retrievePwd'
import register from './register'
import loginMain from './loginMain'

const namespace = "login";
const RouteConfig = createRoute({
  login: {screen: loginMain},
  changePwd: {screen: changePwd},
  retrievePwd: {screen: retrievePwd},
  register: {screen: register},

}, namespace);

export default RouteConfig
