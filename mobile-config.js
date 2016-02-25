// Set up resources such as icons and launch screens.
App.info({
  name: 'Restaurant-App',
  description: 'An Android app built with Meteor',
  version: '0.0.1'
});

App.icons({
  //android
  'android_xhdpi': 'resources/icons/icon-android.png',
  //ios
  'ipad': 'resources/icons/icon-ios.png',
});

App.launchScreens({
  //android
  'android_xhdpi_portrait': 'resources/splash/rabbit-p.png',
  'android_xhdpi_landscape': 'resources/splash/rabbit-l.png'
  //ios
  'ipad_portrait': 'resources/splash/rabbit-p.png',
  'ipad_landscape': 'resources/splash/rabbit-l.png',
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
