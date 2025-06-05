#!/bin/bash
# clear
rm package-lock.json
rm -rf ./ios/
rm -rf ./android/
rm -rf node_modules/
# Use the version of node specified in .nvmrc
nvm i
# Install dependencies
npm i
# Before a native app can be compiled, the native source code must be generated.
npx expo prebuild
