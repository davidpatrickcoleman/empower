# Installation Guide

# Set-up
nvm use 14

## Android

- `eas build -p android`
- To run in Emulator, run the following command: `expo build:android`

## iOS
- To deploy the App to the App Store, you have two options:
  - run the following command: `expo build:ios` and select 'archive' and enter credentials
  - run the following command: `expo build:ios` and select 'archive' and choose not to enter credentials (especially if you're not on the team). Then download the ipa and use Transporter.app to upload it to Appstore Connect
