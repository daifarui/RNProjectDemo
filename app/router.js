import React, {PureComponent} from 'react'
import {BackHandler, Animated, Easing, DeviceEventEmitter, View} from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {connect} from 'dva'

import rootRouter from './business/routeConfig'
import Toast from './components/common/toast';

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

const AppNavigator = StackNavigator(
  {
    Main: {screen: rootRouter},//????
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
      headerTitleStyle: {
        alignSelf: "center",
      },
      headerStyle: {
        backgroundColor: "red",
      }

    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 50,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return {opacity, transform: [{translateY}]}
      },
    }),
  }
);




@connect(({router}) => ({router}))
export default class Router extends PureComponent {

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {

    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    // let now = new Date().getTime();
    // if(now - lastBackPressed < 2500) {
    //   return false;
    // }
    // lastBackPressed = now;
    // ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
    // return true;
    return false;
  };


  render() {
    const {dispatch, router} = this.props;
    window.dispatch = dispatch;
    const navigation = addNavigationHelpers({dispatch, state: router});
    return <View style={{flex: 1, width: "100%"}}>
      <AppNavigator navigation={navigation} ref={(c) => window.nav = c}/>
      <Toast ref={(c) => window.toast = c}/>
    </View>

  }
}


export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}
