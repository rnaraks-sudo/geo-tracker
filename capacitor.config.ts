import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'si.twomobile.tracker',
  appName: 'Tracker+CO2',
  webDir: 'www',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' }
};
export default config;
