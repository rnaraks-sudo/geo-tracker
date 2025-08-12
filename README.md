# Tracker+CO₂ (Capacitor App)
This packages your offline PWA as a native app shell. For *true* background tracking, add a background-geolocation plugin (see below).

## Quick Start
1) Install Node 18+ and Android Studio / Xcode.
2) `cd tracker-capacitor`
3) `npm install`
4) Add platforms:
   - Android: `npm run cap:add:android`
   - iOS: `npm run cap:add:ios`
5) Copy web assets into native containers: `npm run cap:copy`
6) Open IDE:
   - Android: `npm run cap:open:android` (then build a debug APK from Android Studio)
   - iOS: `npm run cap:open:ios` (then build & run from Xcode)

## Background Tracking (Recommended)
Browsers/PWAs can't track with screen fully off. In native, add one of these:
- **Transistorsoft**: `cordova-background-geolocation-lt` via Capacitor (commercial, battle-tested)
- **Capacitor Community**: `@capacitor/geolocation` (foreground only) + `cordova-background-geolocation` (community; background)

### Transistorsoft (suggested) sketch
1) `npm install cordova-background-geolocation-lt`
2) Sync: `npx cap sync`
3) Wire `native-bridge.js` start/stop to plugin:
   ```js
   // window.BackgroundGeolocation is injected natively after sync
   BackgroundGeolocation.ready({
     desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
     distanceFilter: 10,
     stopTimeout: 5,
     debug: false,
     logLevel: BackgroundGeolocation.LOG_LEVEL_INFO,
     stopOnTerminate: false,
     startOnBoot: true,
     foregroundService: true
   }, state => {
     if (!state.enabled) BackgroundGeolocation.start();
   });
   BackgroundGeolocation.onLocation(loc => window.dispatchEvent(new CustomEvent('bg:location', {detail: loc})));
   ```
4) AndroidManifest will request background permissions automatically. Ensure a foreground notification is configured.

### iOS setup highlights
- Xcode → Signing & Capabilities → Background Modes → **Location updates**
- `Info.plist` keys: `NSLocationAlwaysAndWhenInUseUsageDescription`, `NSLocationWhenInUseUsageDescription`

## App IDs / Icons
- Update `capacitor.config.ts` with your appId/appName.
- Replace icons in `www/icons/` and Android/iOS launcher icons via platforms' tooling.

## PWA Dev (web only)
- `npm run dev` → http://localhost:8080 (grant location).

## Data model
- All tracking data is stored locally via `localStorage`. Export/Import JSON from the app UI.
