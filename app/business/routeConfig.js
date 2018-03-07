import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {Image, TouchableOpacity, Platform, View} from 'react-native'
import React, {Component} from 'react'

import First from './first'
import Test from './test/view'
import Login from './login/view'


let ios = Platform.OS === 'ios';
let android = Platform.OS === 'android';


headStyle = {};
headStyle.backgroundColor = '#0092ff';
headStyle.shadowColor = 'black';
headStyle.shadowOpacity = 0;
headStyle.shadowRadius = 0;

if (android) {
  headStyle.height = 50;
  headStyle.elevation = 0;
  headStyle.shadowOffset = {width: 0, height: 0}
}
window.routeList = {
  ...Login,
  ...Test,
  ...First,
};

const rootRouter = StackNavigator(
  {
    ...window.routeList
  },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'normal',
      },
      headerStyle: {
        ...headStyle
      },
      headerLeft: (
        <TouchableOpacity
          style={{width: 40, height: '100%', justifyContent: 'center',}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{width: 11, marginLeft: 15, resizeMode: 'contain'}}
            source={require('../images/goback.png')}
          />
        </TouchableOpacity>
      ),

      headerRight: <View/>
    }),
  }
);
export default rootRouter
