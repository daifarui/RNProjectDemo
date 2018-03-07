import React from 'react'

import {TouchableOpacity, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native'

// const Touchable = props => <TouchableOpacity activeOpacity={0.8} {...props} />;


const Touchable = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...props}/>

    );
  } else if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity activeOpacity={0.8} {...props} />
    );
  }
};


export default Touchable
