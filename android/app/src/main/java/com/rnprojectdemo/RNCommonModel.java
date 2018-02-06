package com.rnprojectdemo;

import android.content.Intent;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by daifarui on 2018/2/2.
 */

class RNCommonModel extends ReactContextBaseJavaModule {

  private static ReactApplicationContext mContext;

  public RNCommonModel(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNToNative";
  }


  /**
   * 向RN发送消息
   *
   * @param msg
   */
  public static void sendMsgToRN(String msg, WritableNativeMap map) {
    try {
      WritableNativeMap writableMap = new WritableNativeMap();
      writableMap.putString("routeName", msg);
      writableMap.putMap("params", map);
      WritableNativeMap rnMaps = new WritableNativeMap();
      writableMap.putMap("rnParams", rnMaps);
      mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("NativeToRNMsg", writableMap);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }


  @ReactMethod
  public void getMsg(String msg, Promise promise) {
    try {
      promise.resolve("返回给ReactNative的消息");
    } catch (Exception e) {
      promise.reject(e);
    }
  }


  @ReactMethod
  public void getMsgTwo(Promise promise) {
    try {
      promise.resolve("返回给ReactNative的消息");
    } catch (Exception e) {
      promise.reject(e);
    }
  }


  /**
   * 获取原生对象
   */
  @ReactMethod
  public void getMsgThree(String str,Promise promise) {
    WritableNativeMap map = new WritableNativeMap();
    map.putString("telNum", "");
    map.putString("id", "");
    map.putString("avatar", "");
    map.putString("memberName", "");
    try {
      promise.resolve(map);
    } catch (Exception e) {
      promise.reject(e);
    }
  }


  /**
   * 参数 对象
   */
  @ReactMethod
  public void getMsgFour(ReadableMap msg, Promise promise) {
    try {
      ReadableMap body = msg.getMap("key");
      WritableNativeMap map = new WritableNativeMap();
      promise.resolve(map);
    } catch (Exception e) {
      promise.reject(e);
      e.printStackTrace();
    }
  }


  /**
   * 参数 对象 加 key
   */
  @ReactMethod
  public void getMsgFive(ReadableMap msg, String key, Promise promise) {
    try {
      ReadableMap body = msg.getMap("body");
      WritableNativeMap map = new WritableNativeMap();
      promise.resolve(map);
    } catch (Exception e) {
      promise.reject(e);
      e.printStackTrace();
    }
  }


  /**
   * goTONAtiveActivity
   */
  @ReactMethod
  public void goTONativeActivity(ReadableArray selectPeople, final Promise promise) {
    try {
      ArrayList<String> receiveList = new ArrayList<String>();
      if (selectPeople != null && selectPeople.size() > 0) {
        ArrayList<Object> receiveObject = selectPeople.toArrayList();
        receiveList.addAll(Arrays.asList(receiveObject.toArray(new String[receiveObject.size()])));

      }
      Intent addIntent = new Intent(getCurrentActivity(), MainActivity.class);
      getCurrentActivity().startActivityForResult(addIntent, 6666);

      //进行回调数据
      WritableNativeArray array = MainActivity.mQueue.take();
      promise.resolve(array);
    } catch (Exception e) {
      promise.reject(e);
      e.printStackTrace();
    }
  }


}
