import {createAction, NavigationActions} from '../../../utils/'
import * as Server from '../services/home'

export default {
  namespace: 'home',
  state: {
    data1: false,
    data2: {},
    data3: [],

  },
  reducers: {
    updateData(state, {payload}) {
      return {...state, ...payload}
    },

  },
  effects: {

    * setData({payload}, {call, put, select}) {
      yield put(createAction('updateData')({}))
    },

    * getData({payload}, {call, put, select}) {
      const data = yield call(Server.login, payload);

      if (data.response_code === '000000') {
        yield put(createAction('updateData')({}));
        payload.callback(data.response_data);
      } else { //失败
        payload.callback(false);
      }

    },

    * login({payload}, {call, put, select}) {
      const data = yield call(Server.login, payload);

      payload.callback(data.response_code);
    },

    * register({payload}, {call, put, select}) {
      const data = yield call(Server.register, payload);

      payload.callback(true);
    },

    * changePwd({payload}, {call, put, select}) {
      const data = yield call(Server.changePwd, payload);

      payload.callback(true);
    },

    * retrievePwd({payload}, {call, put, select}) {
      const data = yield call(Server.retrievePwd, payload);

      payload.callback(true);
    },

    * sendSMSCode({payload}, {call, put, select}) {
      const data = yield call(Server.sendSMSCode, payload);

      payload.callback(true);
    },


    * loginOut({payload}, {call, put, select}) {
      payload.callback(true);
    },
  }
}
