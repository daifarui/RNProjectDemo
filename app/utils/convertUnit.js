/**
 * Created by dfr 用于统一单位装换
 */
'use strict';

import {Dimensions} from 'react-native';

// device width/height
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
console.log('w:' + deviceWidth + '__' + 'h:' + deviceHeight);
// design width/height
const uiHeight = 731;
const uiWidth = 411;

export function convertH(uiElement) {
  return uiElement * deviceHeight / uiHeight;
}

export function convertW(uiElement) {
  return uiElement * deviceWidth / uiWidth;
}