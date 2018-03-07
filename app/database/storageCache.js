import React, {Component} from 'react';
import Storage from 'react-native-storage';

import {
  AsyncStorage
} from 'react-native';


var storage;
var defaultExpires = 1000 * 3600 * 24;
var size = 1000;
var storageType = 0;

export default class BaseStorage extends Component {

  static _getStorage() {
    if (storage == undefined || (storage != undefined && storage._s == null)) {
      storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: size,
        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,
        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: defaultExpires,

        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,
        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是写到另一个文件里，这里require引入
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // sync: SYNC  // 这个sync文件是要你自己写的
      });
    }
    return storage;
  }

  /**
   * 此方法初始化的对象用于临时存储，进程重启后即丢失
   * @returns {*}
   * @private
   */
  static _getCacheStorage() {
    if (storage == undefined || (storage != undefined && storage._s != null)) {
      storage = new Storage({
        size: size,
        storageBackend: null,
        defaultExpires: defaultExpires,
        enableCache: true,
      });
    }
    return storage;
  }


  /**
   key:保存的key值
   object：保存的value
   expires：有效时间，（null永不过期）
   */
  static saveWithTime(key, object, expires) {
    storage.save({
      key: key,  // 注意:请不要在key中使用_下划线符号!
      data: object,
      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: expires
    });

  }

  /**
   * 保存数据默认一天过期
   * @param key
   * @param object
   * @private
   */
  static save(key, object) {
    this.saveWithTime(key, object, defaultExpires);
  }

  static remove(key) {
    // 删除单个数据
    storage.remove({
      key: key,
    });
  }

  static removeAll() {
    // 移除所有"key-id"数据（但会保留只有key的数据）
    storage.clearMap();
  }

  static clearDataByKey(key) {
    // !! 清除某个key下的所有数据
    storage.clearMapForKey(key);
  }

  /**
   查询数据
   */
  static load(key, callback) {
    storage.load({
      key: key,
    }).then(ret => {
      callback(ret);
      return ret;
    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      switch (err.name) {
        case 'NotFoundError':
          callback(null);
          return 'NotFoundError';
          break;
        case 'ExpiredError':
          callback(null);
          return 'ExpiredError';
          break;
        default:
          callback(null);
          return 'ExpiredError';
          break;
      }
    });
  }


  static loadDefault(key, params, someFlag, callback) {
    storage.load({
      key: key,
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      // autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      // syncInBackground: true,

      // 你还可以给sync方法传递额外的参数
      // syncParams: {
      //   params,
      //   someFlag: someFlag,
      // },
    }).then(ret => {

      callback(ret);
      return ret;
    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          callback(null);
          return 'NotFoundError';
          break;
        case 'ExpiredError':
          // TODO
          callback(null);
          return 'ExpiredError';
          break;
      }
    });
  }

}
