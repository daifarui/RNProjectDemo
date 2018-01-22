import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'

import {Button} from '../../../components/common/Button'

import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
@connect(({test}) => ({test}))
class Account extends Component {
  static navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
    tabBarIcon: ({focused, tintColor}) => (
      <Image
        style={[styles.icon, {tintColor: focused ? tintColor : 'gray'}]}
        source={require('../images/person.png')}
      />
    ),
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'test/login'}))
  };

  logout = () => {
    this.props.dispatch({
      type:'test/loginOut',
      payload:{
        data:{body:{}},
        callback:(result)=>{
          this.props.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'test/login',
              params: {}
            })],
          }));
        }
      }
    })
  };

  render() {
    const {login} = this.props
    return (
      <View style={styles.container}>
        {login ? (
          <Button text="Logout" onPress={this.logout}/>
        ) : (
          <Button text="Goto Login" onPress={this.gotoLogin}/>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Account
