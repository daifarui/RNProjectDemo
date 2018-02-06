package com.rnprojectdemo;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.devio.rn.splashscreen.SplashScreen;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

  //构建一个阻塞的单一数据的队列
  public static ArrayBlockingQueue<WritableNativeArray> mQueue = new ArrayBlockingQueue<>(1);

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNProjectDemo";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    WritableNativeArray array = new WritableNativeArray();
    if (resultCode == 6666 && requestCode == 6666) {
      ArrayList<String> choiceFile = new ArrayList<>();
      choiceFile.addAll(data.getStringArrayListExtra("key"));
      for (int i = 0; i < choiceFile.size(); i++) {

        WritableNativeMap map = new WritableNativeMap();

        array.pushMap(map);
      }
      mQueue.add(array);
    } else {
      clearQueue();
    }
  }


  /**
   * 清空数据返回RN
   */
  private void clearQueue() {
    WritableNativeArray array = new WritableNativeArray();
    mQueue.clear();
    mQueue.add(array);
  }
}
