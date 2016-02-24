// Set up resources such as icons and launch screens.
App.info({
  name: 'Restaurant-App',
  description: 'An Android app built with Meteor',
  version: '0.0.1'
});

App.icons({
    // 'android_hdpi': 'resources/icons/icon-72x72.png',
    'android_xhdpi': 'resources/icons/icon.png'
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'android_xhdpi_portrait': 'resources/splash/rabbit.png',
  // ... more screen sizes and platforms ...
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
