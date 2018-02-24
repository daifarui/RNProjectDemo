/**
 * Created by dfr 用于统一单位装换
 */
'use strict';

import {Dimensions} from 'react-native';

// device width/height
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// design width/height
const uiHeight = 592;
const uiWidth = 420;

export default function convertH(uiElement) {
  return uiElement *  deviceHeight / uiHeight;
}

export default function convertW(uiElement) {
  return uiElement *  deviceWidth / uiWidth;
}