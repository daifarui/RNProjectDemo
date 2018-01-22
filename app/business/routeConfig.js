import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {Image, TouchableOpacity, Platform} from 'react-native'
import React, {Component} from 'react'

import First from './first'
import Test from './test/view'


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
  ...First,
  ...Test,
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
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'normal'
      },
      headerStyle: {
        ...headStyle
      },
      headerLeft: (
        <TouchableOpacity
          style={{width: 40, height: '100%', justifyContent: 'center',}}
          onPress={() => {
            window.nav.goBack();
          }}
        >
          <Image
            style={{width: 11, marginLeft: 15, resizeMode: 'contain'}}
            source={require('../images/goback.png')}
          />
        </TouchableOpacity>
      ),

      headerRight: (
        <TouchableOpacity>
          <Image style={{width: 40, height: 40, marginLeft: 15}}/>
        </TouchableOpacity>

      )
    }),
  }
);
export default rootRouter
