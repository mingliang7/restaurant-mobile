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
  'android_xhdpi_portrait': 'resources/splash/rabbit.png',
  //ios
  'ipad_portrait': 'resources/splash/rabbit.png',
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
