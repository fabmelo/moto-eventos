import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.motoeventos.app',
  appName: 'moto-eventos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "backgroundColor": "#c60407",
      "androidSplashResourceName": "splash",
      "showSpinner": false,
      "splashFullScreen": true,
      "splashImmersive": true
    },
  },
};

export default config;
