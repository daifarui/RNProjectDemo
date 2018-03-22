import React, {Component} from 'react';
import {
  StyleSheet,
  Text, TouchableWithoutFeedback,
  View,
} from 'react-native';


import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
import {convertH, convertW} from "../../../utils/convertUnit";
import Touchable from "../../../components/common/Touchable";
import TopMovedTextInput from "../../../components/animatedTextInput/TopMovedTextInput";

@connect(({login}) => ({login}))
class RetrievePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_tel: '',
      user_code: '',
      user_pwd: '',
      user_re_pwd: '',
      hide_Pwd: true,
      hide_re_Pwd: true,
    }
  }

  static navigationOptions = {
    title: '重置密码'
  };

  render() {
    return <TouchableWithoutFeedback style={styles.container} onPress={() => dismissKeyboard()}>
      <View style={styles.container}>

        <TopMovedTextInput
          style={{
            borderBottomWidth: 1,
            marginLeft: convertW(30),
            marginRight: convertW(30),
            marginTop: convertH(15),
            borderBottomColor: '#a0a0a0',
          }}
          label={'手机号'}
          borderColor={'#31343B'}
          inputStyle={{padding: 0, color: '#31343B', fontWeight: 'normal', fontSize: convertH(15),}}
          labelStyle={{padding: 0, color: '#a0a0a0', fontSize: convertH(13),}}
          value={this.state.user_tel}
          onChangeText={(text) => {
            this.setState({user_tel: text})
          }}
        />
        <View
          style={{
            marginLeft: convertW(30),
            marginTop: convertH(15),
            flexDirection: 'row',
            marginRight: convertW(30),
            alignItems: 'center',
          }}>
          <TopMovedTextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#a0a0a0',
              marginRight: 20,
              flex: 1,
            }}
            label={'验证码'}
            borderColor={'#31343B'}
            inputStyle={{padding: 0, color: '#31343B', fontWeight: 'normal', fontSize: convertH(15),}}
            labelStyle={{padding: 0, color: '#a0a0a0', fontSize: convertH(13),}}
            value={this.state.user_code}
            onChangeText={(text) => {
              this.setState({user_code: text})
            }}
          />
          <Touchable>
            <View style={{
              width: convertW(100), height: convertH(30), justifyContent: 'center',
              alignItems: 'center', borderRadius: convertH(4), backgroundColor: '#0092ff'
            }}>
              <Text style={{color: '#fff', fontSize: convertW(13), backgroundColor: 'transparent'}}>获取验证码</Text>
            </View>

          </Touchable>
        </View>


        <View style={{width: '100%'}}>
          <TopMovedTextInput
            style={{
              borderBottomWidth: 1,
              marginLeft: convertW(30),
              marginRight: convertW(30),
              marginTop: convertH(15),
              borderBottomColor: '#a0a0a0',
            }}
            label={'新密码'}
            borderColor={'#31343B'}
            inputStyle={{
              color: '#31343B',
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
        </View>
        <View style={{width: '100%'}}>
          <TopMovedTextInput
            style={{
              borderBottomWidth: 1,
              marginLeft: convertW(30),
              marginRight: convertW(30),
              marginTop: convertH(15),
              borderBottomColor: '#a0a0a0',
            }}
            label={'确认密码'}
            borderColor={'#31343B'}
            inputStyle={{
              color: '#31343B',
              fontWeight: 'normal',
              fontSize: convertH(15),
            }}
            secureTextEntry={this.state.hide_re_Pwd}
            labelStyle={{padding: 0, color: '#a0a0a0', fontSize: convertH(13),}}
            value={this.state.user_re_pwd}
            onChangeText={(text) => {
              this.setState({user_re_pwd: text})
            }}
          />
        </View>


        <Touchable
          backgroundColor={'#ccc'}
          onPress={() => {
            dismissKeyboard();
            this.register()
          }}>
          <View style={styles.btn}>
            <Text style={{color: '#fff', fontSize: convertH(16), backgroundColor: 'transparent'}}>重置密码</Text>
          </View>
        </Touchable>

      </View>
    </TouchableWithoutFeedback>
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

export default RetrievePwd;