import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.motoeventos.app',
  appName: 'Moto Eventos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      "launchShowDuration": 6000,
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
