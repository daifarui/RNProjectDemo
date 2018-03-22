import React, {Component} from 'react';

const Realm = require('realm');
const UserDBSchema = {
  name: 'UserDB',
  // primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
  properties: {
    // id: 'int',
    user_name: 'string',
    user_tel: {type: 'string', default: '00000000000'},   // 添加默认值的写法
    address: {type: 'string', default: null},
    extendField1: {type: 'string', default: null},
    extendField2: {type: 'string', default: null},
    extendField3: {type: 'string', default: null},
  }
};


export default class RealmDataUtil extends Component {

  /**
   * 保存新用户
   * @param user
   * @param callback
   */
  static saveUser(user, callback) {
    Realm.open({schema: UserDBSchema}).then(realm => {
      // ...use the realm instance here
      realm.write(() => {
        let UserDB = realm.objects('UserDB');
        let result;
        (user.user_name) ? result = UserDB.filtered('user_name == ' + user.user_name) : null;
        if (result) {//有数据
          callback('用户名已存在');
          return
        }
        (user.user_tel && result === undefined) ? result = UserDB.filtered('user_tel == ' + user.user_tel) : null;
        if (result) {//有数据
          callback('手机号已存在');
          return
        }
        let data = {};
        (user.user_name) ? data.user_name = user.user_name : null;
        (user.user_tel) ? data.user_tel = user.user_tel : null;
        (user.address) ? data.address = user.address : null;
        (user.extendField1) ? data.extendField1 = user.extendField1 : null;
        (user.extendField2) ? data.extendField2 = user.extendField2 : null;
        (user.extendField3) ? data.extendField3 = user.extendField3 : null;
        realm.create('UserDB', {
          ...data
        });
      });
      callback(true);
    }).catch(error => {
      // Handle the error here if something went wrong
      callback(error);
    });
  }

  /**
   * 更新数据
   *方式一  有主键
   *    realm.create('Person', {id: 0, name: '', tel_number: ''}, true);
   *方式二:如果表中没有主键,那么可以通过直接赋值更新对象
   *  //获取Person对象
   *  let Persons = realm.objects('Person');
   *  //设置筛选条件
   *  let person = Persons.filtered('name == ***');
   *  //更新数据
   *  person.name = '666'
   * @param user
   * @param callback
   */
  static updateUser(user, callback) {
    Realm.open({schema: UserDBSchema}).then(realm => {
      // ...use the realm instance here
      realm.write(() => {
        let UserDB = realm.objects('UserDB');
        let result;
        (user.user_name) ? result = UserDB.filtered('user_name == ' + user.user_name) : null;
        (user.user_tel && result === undefined) ? result = UserDB.filtered('user_tel == ' + user.user_tel) : null;
        if (result) { //查询到创建  修改
          (user.user_name) ? result.user_name = user.user_name : null;
          (user.user_tel) ? result.user_tel = user.user_tel : null;
          (user.address) ? result.address = user.address : null;
          (user.extendField1) ? result.extendField1 = user.extendField1 : null;
          (user.extendField2) ? result.extendField2 = user.extendField2 : null;
          (user.extendField3) ? result.extendField3 = user.extendField3 : null;
          callback(true)
        } else {
          callback('用户名或手机号有误信息有误')
        }
      });
    }).catch(error => {
      // Handle the error here if something went wrong
      callback(error);
    });
  }

  /**
   * 清除用户数据
   * @param user
   * @param callback
   */
  static deleteUser(user, callback) {
    Realm.open({schema: UserDBSchema}).then(realm => {
      // ...use the realm instance here
      realm.write(() => {
        let UserDB = realm.objects('UserDB');
        let result;
        (user.user_name) ? result = UserDB.filtered('user_name == ' + user.user_name) : null;
        (user.user_tel && result === undefined) ? result = UserDB.filtered('user_tel == ' + user.user_tel) : null;
        if (result) { //查询到创建  修改
          realm.delete(result);
          callback(true)
        } else {
          callback('用户名或手机号有误信息有误')
        }
      });
    }).catch(error => {
      // Handle the error here if something went wrong
      callback(error);
    });
  }

  /**
   * 清空用户表
   * @param callback
   */
  static clearUserDB(callback) {
    Realm.open({schema: UserDBSchema}).then(realm => {
      // ...use the realm instance here
      realm.write(() => {
        let UserDB = realm.objects('UserDB');
        // 删除
        realm.delete(UserDB);

        // let allBooks = realm.objects('UserDB');
        // realm.delete(allBooks); // Deletes all books
      });
      callback(true);
    }).catch(error => {
      // Handle the error here if something went wrong
      callback(error);
    });
  }

}