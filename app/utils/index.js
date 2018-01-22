export {NavigationActions} from 'react-navigation'

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const createAction = type => payload => ({type, payload});
export const createRoute = (_config, _namespace) => {
  let routes = {};
  for (let key in _config) {
    routes[`${_namespace}/${key}`] = _config[key];  //{'first/one',{screen: one},'first/two',{screen: two},}
  }
  return routes;
};

