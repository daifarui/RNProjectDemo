import React, {Component} from 'react';
import {
  ToastAndroid,
  Platform,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'


/**
 * Dialog组件
 * <Dialog ref="dialog" callback={this.callback.bind(this)}/>
 * 调用show方法，调起组件   this.refs.dialog.show("确定删除吗");
 */

export default class CommonToast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toast ref="toast" position='bottom' style={{borderRadius: 5}}/>
    );
  }

  // noinspection JSAnnotator
  /**
   * 弹出控件
   * titile: 标题
   */
  show(text) {
    if (Platform.OS === 'ios')
      this.refs.toast.show(text);
    else
      ToastAndroid.show(text, ToastAndroid.SHORT)
  }
}
