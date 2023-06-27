# Installation Guide

# Set-up
nvm use 14

# Check if the npm packages are ok
npx expo install --check

# Check if the npm packages are ok
npx expo prebuild

# Run in an iOS simulator

- `eas build -p ios --profile preview`


## Android

- `eas build -p android`
- To run in Emulator, run the following command: `eas build -p android`

## iOS
- To deploy the App to the App Store, you have two options:
  - run the following command: `eas build -p ios` and select 'archive' and choose not to enter credentials (especially if you're not on the team). Then download the ipa and use Transporter.app to upload it to Appstore Connect
