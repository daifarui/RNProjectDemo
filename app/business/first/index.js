
/**
 * 首页
 */
import first from './first'

import {createRoute, headerConfig} from '../../utils'

const namespace = "first";

const RouteConfig = createRoute({
  first: {screen: first},


}, namespace);

export default RouteConfig
