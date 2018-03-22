import router from './router'
import test from '../business/test/models/test'
import login from '../business/login/models/login'
import home from '../business/home/models/home'


export function registerModels(app) {
  app.model(router);
  app.model(login);
  app.model(home);
  app.model(test);


}
