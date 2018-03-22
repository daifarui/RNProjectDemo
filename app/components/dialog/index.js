import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';


export default class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      remind: this.props.remind,
      remindStyle: this.props.remindStyle,
      left: this.props.left,
      leftStyle: this.props.leftStyle,
      leftFun: this.props.leftFun !== undefined ? this.props.leftFun : this.dismiss,
      right: this.props.right,
      rightStyle: this.props.rightStyle,
      rightFun: this.props.rightFun !== undefined ? this.props.rightFun : this.dismiss,
      show: this.props.show,
    }

  }

  static propTypes = {};

  static defaultProps = {
    title: '',
    content: '',
    remind: '',
    remindStyle: {color: '#0092ff', fontSize: 12},
    left: '取消',
    leftStyle: {color: '#0092ff', fontSize: 15},
    right: '确定',
    rightStyle: {color: '#0092ff', fontSize: 15},
    show: false,
  };


  componentWillReceiveProps(nextProps) {
    let leftStyle = this.state.leftStyle;
    let rightStyle = this.state.rightStyle;
    let remindStyle = this.state.remindStyle;
    this.setState({
      title: nextProps.title,
      content: nextProps.content,
      remind: nextProps.remind,
      remindStyle: {...remindStyle, ...nextProps.remindStyle},
      left: nextProps.left,
      leftStyle: {...leftStyle, ...nextProps.leftStyle},
      leftFun: nextProps.leftFun !== undefined ? nextProps.leftFun : this.dismiss,
      right: nextProps.right,
      rightStyle: {...rightStyle, ...nextProps.rightStyle},
      rightFun: nextProps.rightFun !== undefined ? nextProps.rightFun : this.dismiss,
      show: nextProps.show,
    })
  }

  dismiss = () => {
    this.setState({show: false})
  };


  componentWillMount() {

  }


  render() {
    return <Modal
      animationType={'none'}
      onRequestClose={() => this.dismiss()}
      supportedOrientations={['landscape', 'portrait']}
      transparent={true}
      visible={this.state.show}>
      <View style={{
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{borderRadius: 10, marginLeft: 30, marginRight: 30, backgroundColor: '#fff'}}>
          {this.state.title.length > 0 ? (
            <View style={{
              marginLeft: 15,
              marginRight: 15,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                color: '#31343B'
              }}>{this.state.title}</Text>
            </View>) : (<View style={{height: 20}}/>)}
          {this.state.content.length > 0 ? (<View style={{
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
          }}>
            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              padding: 0,
              backgroundColor: 'transparent',
              color: '#31343B'
            }}>{this.state.content}</Text>
          </View>) : (null)}
          {this.state.remind.length > 0 ? (<View style={{
            marginTop: -5,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
          }}>
            <Text style={[this.state.remindStyle, {
              textAlign: 'center',
              padding: 0,
              backgroundColor: 'transparent',
            }]}>{this.state.remind}</Text>
          </View>) : (null)}
          {this.state.title.length > 0 ? (null) : (<View style={{height: 20}}/>)}
          <View style={{backgroundColor: '#eef0f1', height: 1, marginLeft: 0, marginRight: 0,}}/>
          <View style={{height: 45, flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => {
                                this.dismiss();
                                this.state.leftFun()
                              }}>
              <Text style={{...this.state.leftStyle, backgroundColor: 'transparent',}}>{this.state.left}</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: '#eef0f1', height: '100%', width: 1}}/>
            <TouchableOpacity style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => {
                                this.dismiss();
                                this.state.rightFun();
                              }}>
              <Text style={{...this.state.rightStyle, backgroundColor: 'transparent',}}>{this.state.right}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  }

  show = () => {
    this.setState({
      show: true
    })
  };
  hide = () => {
    this.setState({
      show: false
    })
  }

}

