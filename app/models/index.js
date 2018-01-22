import router from './router'
import test from '../business/test/models/test'


export function registerModels(app) {
  app.model(router);
  app.model(test);


}
