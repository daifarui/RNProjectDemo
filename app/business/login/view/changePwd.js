import React, {Component} from 'react';
import {
  View,
} from 'react-native';


import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
import {convertH,convertW} from "../../../utils/convertUnit";


@connect(({login}) => ({login}))
class ChangePwd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View/>
  }


}

export default ChangePwd;