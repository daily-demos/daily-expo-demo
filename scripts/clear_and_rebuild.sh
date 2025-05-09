#!/bin/bash
# clear
rm -rf ./ios/
rm -rf ./android/
# Use the version of node specified in .nvmrc
nvm i
# Install dependencies
npm i
# Before a native app can be compiled, the native source code must be generated.
npx expo prebuild
