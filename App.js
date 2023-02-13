import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { registerGlobals } from "@daily-co/react-native-webrtc";

export default function App() {

  Platform.OS !== "web" && useEffect(async () => {
    console.log('Registering webrtc globals')
    registerGlobals();
    console.log('Options', await navigator.mediaDevices.enumerateDevices())
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app =) Nice!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
