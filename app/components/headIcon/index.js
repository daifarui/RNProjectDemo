import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
} from 'react-native';


export default class HeadIcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      telNum: this.props.telNum,
      avatar: this.props.avatar,
      size: this.props.size,
      error: true,//avatar头像地址加载是否正确
      isGray: this.props.isGray
    };
  }

  static propTypes = {
    name: PropTypes.string,
    telNum: PropTypes.string,
    avatar: PropTypes.string,
    size: PropTypes.number,
    isGray: PropTypes.bool

  };

  static defaultProps = {
    name: '未知',
    telNum: '',
    avatar: '',
    size: 20,
    isGray: false
  };


  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      telNum: nextProps.telNum,
      size: nextProps.size,
      avatar: nextProps.avatar,
      isGray: nextProps.isGray
    })
    Image.getSize(window.fileUrl + nextProps.avatar, (width, height) => {
      this.setState({error: true});
    }, (e) => {
      this.setState({error: false});
    });
  }

  componentWillMount() {
    if (this.state.avatar === '') return;
    Image.getSize(window.fileUrl + this.state.avatar, (width, height) => {
    }, (e) => {
      this.setState({error: false});
    });
  }


  _getBackgroundColor() {
    if (Platform.OS === 'ios') {
      let colors = [
        '#f6bf26',
        '#6bb5ce',
        '#5c6bc0',
        '#f65e5e',
        '#bd84cd',
        '#ff8e6b',
        '#78c06e',
        '#3fb5f2'];
      if (this.state.telNum.length > 2) {
        try {
          let num = parseInt(this.state.telNum.substring(this.state.telNum.length - 2));
          let index = num % colors.length;
          return colors[index];

        } catch (e) {
          return colors[0];
        }
      } else {
        return colors[0];
      }
    } else {
      let colors = ['#F6CB54', '#8AD154', '#9A89B6', '#689EF6', '#40CAD6'];
      if (this.state.telNum.length > 1) {
        try {
          let num = parseInt(this.state.telNum.substring(this.state.telNum.length - 1));
          let index = num % colors.length;
          return colors[index];
        } catch (e) {
          return colors[0];
        }
      } else {
        return colors[0];
      }
    }
  }


  _getName = () => {
    let name = this.state.name;
    let iconName = '';
    if (name.length >= 3) {
      iconName = name.substring(name.length - 2);
    } else {
      iconName = name;
    }
    return iconName;
  };


  render() {
    let color = this._getBackgroundColor();
    let name = this._getName();
    let gray = 'rgba(255, 255, 255, 0)';
    if (this.state.isGray) {
      gray = 'rgba(255, 255, 255, 0.6)';
    }
    let icon;
    if (this.state.avatar.length > 0) {
      if (this.state.error) {
        icon = (<View style={{width: this.state.size, height: this.state.size, borderRadius: this.state.size / 2,}}>
            <Image
              style={{
                width: this.state.size,
                height: this.state.size,
                borderRadius: this.state.size / 2,
              }}
              source={{uri: window.fileUrl + this.state.avatar}}
            />
          </View>
        )
      } else {
        icon = (<View style={{
          width: this.state.size,
          height: this.state.size,
          borderRadius: this.state.size / 2,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: this.state.size / 3, color: '#fff', backgroundColor: 'transparent'}}>{name}</Text>
        </View>)
      }
    } else {
      icon = (<View style={{
        width: this.state.size,
        height: this.state.size,
        borderRadius: this.state.size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{fontSize: this.state.size / 3, color: '#fff', backgroundColor: 'transparent'}}>{name}</Text>
      </View>)
    }
    let view = <View style={{
      backgroundColor: gray,
      width: this.state.size,
      position: 'absolute',
      height: this.state.size,
      borderRadius: this.state.size / 2,
    }}/>
    icon = <View>{icon}{view}</View>
    return icon
  }

}

const styles = StyleSheet.create({});
