import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corpName: '',
    }
  }

  componentWillMount() {
    window.currentRouter = this.props.navigation.state.routeName;
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (<View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>
        Double tap R on your keyboard to reload,{'\n'}
        Shake or press menu button for dev menu
        Profile page Profile page Profile page Profile page
      </Text>
      <View style={styles.circle}>
        <Image style={styles.image}
               source={{uri: 'http://112.29.169.4//group1/M00/10/B7/rAETdlpdqXyAFugVAAF6oPLxTGc425.jpg'}}/>
        <View style={styles.fixCircleClipping}/>

      </View>
      <TextInput source={{width: '100%', height: 50,}}
                 placeholder="请填写真实名称(不少于3个字)"
                 numberOfLines={1}
                 placeholderTextColor={'#ccc'}
                 ref="_name"
                 value={this.state.corpName}
                 underlineColorAndroid={'transparent'}
                 onChangeText={text => this.setState({corpName: text})
                 }/>
      <Text>{this.state.corpName.substring(0, 1) + '+' + this.state.corpName.substring(1, this.state.corpName.length)}</Text>

    </View>)
  }
}


let circleSize = 100;
let radius = 10;
let circleFixBorder = circleSize - 2 * radius;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: '#fff',
    width: circleSize,
    height: circleSize,
    overflow: 'hidden',
  },
  image: {
    width: circleSize,
    height: circleSize,
    resizeMode: Image.resizeMode.stretch
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: circleSize / 2 + circleFixBorder / 2,
    borderWidth: circleFixBorder,
    borderColor: '#fff'
  },
});

export default First;
