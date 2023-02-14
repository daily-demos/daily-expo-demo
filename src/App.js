import { StatusBar } from 'expo-status-bar';
import {View, SafeAreaView, StyleSheet, Text, Button} from 'react-native';
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
  const [inCall, setInCall] = useState(false);

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

  const joinRoom = () => {
    console.log('Invoking to join')
    callObject.join({
      // TODO add your URL here
      url: 'https://filipi.daily.co/public',
    });
  }

  const leaveRoom = async () => {
    console.log('Invoking to leave')
    await callObject.leave();
    let videos = document.getElementsByTagName('video');
    for (let vid of videos) {
      vid.remove();
    }
  };

  // Create the callObject and join the meeting
  useEffect(() => {
    const callObject = Daily.createCallObject();
    callObject.on('joined-meeting', () => setInCall(true));
    callObject.on('left-meeting', () => setInCall(false));
    callObject.on('participant-joined', handleNewParticipantsState);
    callObject.on('participant-updated', handleNewParticipantsState);
    setCallObject(callObject);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Sample Daily call with Expo</Text>
      <View>
        {inCall ? (
          <Button onPress={() => leaveRoom()} title="Leave call"></Button>
        ) : (
          <Button onPress={() => joinRoom()} title="Join call"></Button>
        )}
      </View>
      <DailyMediaView
        videoTrack={videoTrack}
        mirror={false}
        objectFit="cover"
        style={styles.media}
      />
    </SafeAreaView>
  );
}
