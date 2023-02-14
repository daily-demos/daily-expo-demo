# daily-expo-demo

A simple app showcasing `react-native-daily-js`, the [Daily](https://www.daily.co) library for React Native working together with [Expo](https://docs.expo.dev/introduction/expo/).

## Usage

### General Expo setup

This package cannot be used in the "Expo Go" app because [it requires custom native code](https://docs.expo.io/workflow/customizing/).

More details about how to create your own development client instead of expo go in order to use native code which are not by default included on Expo can be found [here](https://docs.expo.dev/development/introduction/).

This demo use `@daily-co/config-plugin-rn-daily-js` in order to work with Expo. More details [here](https://github.com/daily-co/rn-daily-js-expo-config-plugin).

### Remote Building

If you do not have experience with Xcode and Android studio builds or do not have them installed locally on your computer, you will need to follow [this guide from Expo to use EAS Build](https://docs.expo.dev/development/create-development-builds/#create-and-install-eas-build).

### Local Building

You will need to have both Xcode and Android installed locally on your computer.

#### Install the demo dependencies

```bash
# Use the version of node specified in .nvmrc
nvm i

# Install dependencies
npm i

# Before a native app can be compiled, the native source code must be generated.
npx expo prebuild
```

#### Running on iOS

First, you'll need to do a one-time setup. This is required to build to a physical device.

If you're familiar with Xcode, you'll need to open `ios/dailyexpodemo.xcworkspace` and, in the target settings, provide a development team registered with Apple.

If you're newer to Xcode, here are some more detailed instructions to get you started.

First, open the project in Xcode. Make sure to specifically select `dailyexpodemo.xcworkspace` from `/ios`. This is also a good time to plug in your device to be sure the following steps are successful.

From the main menu, select `Preferences` and then `Accounts`. Click the `+` sign to add an account (e.g. an Apple ID).

Once an is account added, close `Preferences` and select the folder icon in the top left corner. Then select `dailyexpodemo` from the side panel and navigate to `Signing & Capabilities` in the top nav bar. Open the "Team" dropdown and select the account added in the previous step. The "Signing Certificate" section should update accordingly with your account information.

**iOS debugging tips:**

- If you see the error `Change your bundle identifier to a unique string to try again` update the "Bundle Identifier" input in `Signing & Capabilities` to make it unique. This should clear the error.

- If you see an error that says `Xcode was unable to launch because it has an invalid code signature, inadequate entitlements or its profile has not been explicitly trusted by the user` you may need to update the settings on your iPhone device to enable the required permissions. Open `Settings` on your iPhone, select `General`, then `Device Management`, and click `Trust` for DailyPlayground.

- You may also be prompted to enter you login keychain password. Be sure to click `Always trust` to avoid the prompt showing multiple times.

After, simply run:
```
npm run ios
```

#### Running on Android

After plugging in an Android device [configured for debugging](https://developer.android.com/studio/debug/dev-options), simply run:

```
npm run android
```

---

### Room configuration

You will need to have your own room in order to use this app. 

As a reminder, you can create and configure rooms through your [Daily dashboard](https://dashboard.daily.co/rooms) or through calls to the [Daily REST API](https://docs.daily.co/reference#rooms).

---
