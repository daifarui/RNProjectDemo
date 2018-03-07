import React, {Component} from 'react'
import {
  StyleSheet, View, Text, ActivityIndicator, TouchableNativeFeedback,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'
import {Button} from '../../../components/common/Button'
import Touchable from '../../../components/common/Touchable'

import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
import SplashScreen from "react-native-splash-screen";
import {convertH, convertW} from "../../../utils/convertUnit";
import HeadIcon from '../../../components/headIcon'

import TopMovedTextInput from '../../../components/animatedTextInput/TopMovedTextInput'

const dismissKeyboard = require('dismissKeyboard');

import Icon from 'react-native-vector-icons/FontAwesome';

@connect(({login}) => ({login}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_pwd: '',
      hide_Pwd: true,
    }
  }

  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  onLogin = () => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        data: {body: {user_name: this.state.user_name, user_pwd: this.state.user_pwd}},
        callback: (result) => {
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


  componentWillMount() {
    window.currentRouter = this.props.navigation.state.routeName;
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={() => dismissKeyboard()}>
        <View style={styles.container}>
          <View style={{marginTop: convertH(90), alignItems: 'center'}}>{
            (window.currentUser === undefined || window.currentUser === null) ?
              (<HeadIcon size={convertH(100)}/>) :
              (<HeadIcon size={convertH(100)} telNum={window.currentUser.telNum} avatar={window.currentUser.avatar}
                         name={window.currentUser.name}/>
              )
          }
          </View>

          <TopMovedTextInput
            style={{
              borderBottomWidth: 1,
              marginLeft: convertW(30),
              marginRight: convertW(30),
              marginTop: convertH(30),
              borderBottomColor: '#a0a0a0',
            }}
            label={'用户名/手机号'}
            borderColor={'#a0a0a0'}
            inputStyle={{padding: 0, color: '#31343B', fontWeight: 'normal', fontSize: convertH(15),}}
            labelStyle={{padding: 0, color: '#a0a0a0', fontSize: convertH(13),}}
            value={this.state.user_name}
            onChangeText={(text) => {
              this.setState({user_name: text})
            }}
          />
          <View style={{width: '100%'}}>
            <TopMovedTextInput
              style={{
                borderBottomWidth: 1,
                marginLeft: convertW(30),
                marginRight: convertW(30),
                marginTop: convertH(30),
                borderBottomColor: '#a0a0a0',
              }}
              label={'登录密码'}
              borderColor={'#a0a0a0'}
              inputStyle={{
                color: '#31343B',
                right: convertW(60),
                fontWeight: 'normal',
                fontSize: convertH(15),
              }}
              secureTextEntry={this.state.hide_Pwd}
              labelStyle={{padding: 0, color: '#a0a0a0', fontSize: convertH(13),}}
              value={this.state.user_pwd}
              onChangeText={(text) => {
                this.setState({user_pwd: text})
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute', width: convertW(40), height: convertH(40), right: convertW(30), top: convertH(40),
                justifyContent: 'center',
              }}
              onPress={() => {
                this.state.hide_Pwd ? (this.setState({hide_Pwd: false})) : (this.setState({hide_Pwd: true}));
              }}>
              <Icon name="eye" size={convertH(20)}
                    color={this.state.hide_Pwd ? ("#a0a0a0") : ('#31343B')}/>
            </TouchableOpacity>
          </View>


          <Touchable
            backgroundColor={'#ccc'}
            onPress={() => {
              dismissKeyboard();
              this.onLogin()
            }}>
            <View style={styles.btn}>
              <Text style={{color: '#fff', fontSize: convertH(16), backgroundColor: 'transparent'}}>确定</Text>
            </View>
          </Touchable>

          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: convertH(28)}}>
            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'login/register',
                }))
              }}>
              <Text
                style={{fontSize: convertH(16), color: 'rgb(80,99,118)', backgroundColor: 'transparent'}}>新用户注册</Text>
            </TouchableOpacity>

            <Text style={{
              width: convertW(1),
              marginTop: convertH(3),
              marginBottom: convertH(3),
              backgroundColor: 'rgb(100,122,144)',
              marginLeft: convertW(20),
              marginRight: convertW(20)
            }}/>

            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'login/retrievePwd',
                }))
              }}>
              <Text
                style={{fontSize: convertH(16), color: 'rgb(80,99,118)', backgroundColor: 'transparent'}}>忘记密码</Text>
            </TouchableOpacity>
          </View>


        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: convertH(44),
    marginTop: convertH(30),
    marginLeft: convertW(30),
    marginRight: convertW(30),
    backgroundColor: '#0092ff',
    borderRadius: convertH(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Login;
