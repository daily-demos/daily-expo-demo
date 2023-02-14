import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Daily, {DailyMediaView, DailyEventObjectParticipant} from '@daily-co/react-native-daily-js';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  media: {
    flex: 1,
    aspectRatio: 9/16,
  },
});

export default function App() {

  const [videoTrack, setVideoTrack] = useState(null);
  const [callObject, setCallObject] = useState(null);

  const handleNewParticipantsState = useCallback(
    (event: DailyEventObjectParticipant) => {
      // ignoring to don't show the video from the local participant
      if (event.participant.local) {
        return;
      }
      const videoTrack = event.participant.tracks.video;
      setVideoTrack(videoTrack.track);
    },
    [],
  );

  useEffect(() => {
    if (!callObject) {
      return;
    }
    callObject.on('participant-joined', handleNewParticipantsState);
    callObject.on('participant-updated', handleNewParticipantsState);
  }, [handleNewParticipantsState, callObject]);

  // Create the callObject and join the meeting
  useEffect(() => {
    const call = Daily.createCallObject();
    call.join({
      // TODO add your URL here
      url: 'https://YOUR_DOMAIN.daily.co/YOUR_ROOM',
    });
    setCallObject(call);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Sample Daily call with Expo</Text>
      <DailyMediaView
        videoTrack={videoTrack}
        mirror={false}
        objectFit="cover"
        style={styles.media}
      />
    </SafeAreaView>
  );
}
