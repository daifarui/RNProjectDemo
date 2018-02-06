import React from "react";
import {
  Alert,
  Platform,
  DeviceEventEmitter
} from "react-native";


import {
  NavigationActions,
} from 'react-navigation'

let ios = Platform.OS === 'ios';
let android = Platform.OS === 'android';
import Storage from './database/storageCache'

import dva from "dva/mobile";


import {registerModels} from "./models";
import Router from "./router";

window.fileUrl = 'www.davis.com';
alert = function (msg, fn) {
  Alert.alert('', msg, [
    {
      text: '确定', onPress: () => {
        if (typeof fn === "function") {
          fn();
        }
      }
    },
  ])
}

// console.log=function(){return;};

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


const app = dva({
  initialState: {},
  // extraEnhancers: [autoRehydrate()],
  onError(e) {
    console.log("onError", e);
  }
});

registerModels(app);

app.router(() => <Router/>);

DeviceEventEmitter.addListener('NativeToRNMsg', data => {

  if (window.routeList[data.routeName] === undefined) {
    window.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'first/first', params: data.params})],
    }));
  } else {
    window.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: data.routeName, params: data.params})],
    }));
  }


});


export default app.start();

