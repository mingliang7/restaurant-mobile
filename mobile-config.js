// Set up resources such as icons and launch screens.
App.info({
  name: 'Restaurant-App',
  description: 'Best Salution App For Your Business',
  version: '0.0.1'
});

App.icons({
  //android
  'android_xhdpi': 'resources/icons/icon-android.png',
  //ios
  'iphone': 'resources/icons/icon-iphone.png',
  'iphone_2x': 'resources/icons/icon-iphone.png',
  'iphone_3x': 'resources/icons/icon-iphone.png',
  'ipad': 'resources/icons/icon-ios.png'
});

App.launchScreens({
  //android
  'android_xhdpi_portrait': 'resources/splash/rabbit-p.png',
  'android_xhdpi_landscape': 'resources/splash/rabbit-l.png',
  //ios
  'iphone': 'resources/splash/launch-screen-iphone-4-4s.png',
  'iphone_2x': 'resources/splash/launch-screen-iphone-4-4s.png',
  'iphone5': 'resources/splash/launch-screen-iphone5.png',
  'iphone6': 'resources/splash/launch-screen-iphone6.png',
  'ipad_portrait': 'resources/splash/rabbit-p.png',
  'ipad_landscape': 'resources/splash/rabbit-l.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
