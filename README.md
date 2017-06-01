# React Native Meteor Demo

The goal of this project is to show work with such technologies as SASS, Meteor, React Native.

_The tasks assigned:_

- Make layout using SASS
- Create a simple Meteor application (add step switching with style changes and display a hidden block when clicking on the checkbox)
- Make an app React Native

## Installation

- [Install Meteor](https://www.meteor.com/install)
- [Install React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- You will need a React Native package that should be installed globally `npm install -g react-native-cli`
- From the main directories run `npm install`
- Create configuration file `settings.js` similar to `mobile/app/config/settings.default.js`. 
If you're running on a device or in the Android simulator be sure to change `SERVER_URL`.

## Running

In terminal run `cd meteor/ && meteor`. 
Open the second terminal window and run `cd mobile/`.

##### Running on iOS Simulator

_**Note:** You must be on a Mac for this. Unfortunately, Apple only lets you develop for iOS on a Mac._

From the `mobile` directory run `react-native run-ios`.

##### Running on Android Simulator

On OSX you can get your IP address by running `ipconfig getifaddr en1` in a terminal window.
On linux running `ifconfig` will get you a list of your network interfaces along with their IP addresses. 
For the stock Google simulator you will want to use the IP of your active network connection (probably `eth0` or `wlan0`). 
If you are using the Genymotion simulator, it runs in a Virtual Box VM with a Host-only network interface. 
You will want to use the IP address of this network which may look like vboxnet0 under ifconfig.

- Get the IP address of your machine
- In `mobile/app/config/settings.js` change `localhost` to your machine's IP address
- Make sure you have an emulator configured and running.
- From the `mobile` directory run `react-native run-android`

##### Running on Device

Follow the instructions in [official docs](https://facebook.github.io/react-native/docs/running-on-device.html).