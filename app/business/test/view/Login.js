import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import {Button} from '../../../components/common/Button'
import Touchable from '../../../components/common/Touchable'

import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
@connect(({test}) => ({test}))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  onLogin = () => {
    this.props.dispatch({
      type:'test/login',
      payload:{
        data:{body:{}},
        callback:(result)=>{
          this.props.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'test/home',
              params: {}
            })],
          }));
        }
      }
    })
  };

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  };

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <Button text="Login" onPress={this.onLogin} />
        )}
        {!fetching && (
          <Touchable style={styles.close} text="Close" onPress={this.onClose}>
            <Text>Close</Text>
          </Touchable>
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
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})

export default Login
