import {createAction, NavigationActions} from '../../../utils/'
import * as Server from '../services/test'

export default {
  namespace: 'test',
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
      const data = yield call(Server.getDetail, payload);

      if (data.response_code === '000000') {
        yield put(createAction('updateData')({}));
        payload.callback(data.response_data);
      } else { //失败
        payload.callback(false);
      }

    },

    * login({payload}, {call, put, select}) {

      payload.callback(true);
    },

    * loginOut({payload}, {call, put, select}) {

      payload.callback(true);
    },
  }
}
