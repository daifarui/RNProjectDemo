import {createAction, NavigationActions} from '../utils'
import {routerReducer} from '../router'

const watcher = {type: 'watcher'};

const actions = [
  NavigationActions.BACK,
  NavigationActions.INIT,
  NavigationActions.NAVIGATE,
  NavigationActions.RESET,
  NavigationActions.SET_PARAMS,
  NavigationActions.URI,
  // 添加下面内容

  NavigationActions.POP,
  NavigationActions.POP_TO_TOP,
  NavigationActions.PUSH,
  NavigationActions.REPLACE,
  NavigationActions.COMPLETE_TRANSITION,

];

export default {
  namespace: 'router',
  state: {
    ...routerReducer(),
    statusColor:'#0092ff'
  },
  reducers: {
    apply(state, {payload: action}) {
      return routerReducer(state, action)
    },
  },
  effects: {
    watch: [
      function* ({take, call, put}) {
        while (true) {
          const payload = yield take(actions);
          yield put(createAction('apply')(payload));
          if (payload.type === 'Navigation/NAVIGATE') {
            console.log('11111', payload);
          }
        }
      }, watcher]
  },
}
