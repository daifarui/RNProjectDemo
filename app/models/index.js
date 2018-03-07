import router from './router'
import test from '../business/test/models/test'
import login from '../business/login/models/login'


export function registerModels(app) {
  app.model(router);
  app.model(login);
  app.model(test);


}
