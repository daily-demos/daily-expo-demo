import {View, SafeAreaView, StyleSheet, Text, Button, TextInput} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Daily, {DailyMediaView, DailyEventObjectParticipant} from '@daily-co/react-native-daily-js';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fa',
    width: '100%',
  },
  outCallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCallContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dailyMediaView: {
    flex: 1,
    aspectRatio: 9/16,
  },
  roomUrlInput: {
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    borderWidth: 1,
    width: '100%',
  },
  infoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    flex: 1
  }
});

const ROOM_URL_TEMPLATE = 'https://filipi.daily.co/public';

export default function App() {

  const [videoTrack, setVideoTrack] = useState();
  const [callObject, setCallObject] = useState();
  const [inCall, setInCall] = useState(false);
  const [roomUrl, setRoomUrl] = useState(ROOM_URL_TEMPLATE);
  const [amountOfRemoteParticipants, setAmountOfRemoteParticipants] = useState(0);

  const handleNewParticipantsState = (event: DailyEventObjectParticipant) => {
    // ignoring to don't show the video from the local participant
    if (event.participant.local) {
      return;
    }
    const videoTrack = event.participant.tracks.video;
    setVideoTrack(videoTrack.track);
    //-1 to ignore the local participant
    setAmountOfRemoteParticipants(callObject.participantCounts().present - 1)
  }

  const joinRoom = () => {
    console.log('Invoking to join')
    callObject.join({
      url: roomUrl,
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
    setCallObject(callObject);
    return () => {};
  }, []);

  //Add the listeners
  useEffect(() => {
    if(!callObject) {
      return
    }
    callObject.on('joined-meeting', () => setInCall(true));
    callObject.on('left-meeting', () => setInCall(false));
    callObject.on('participant-joined', handleNewParticipantsState);
    callObject.on('participant-updated', handleNewParticipantsState);
    callObject.on('participant-left', handleNewParticipantsState);
    return () => {};
  }, [callObject]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {inCall ? (
        <View style={styles.inCallContainer}>
          { amountOfRemoteParticipants > 0 ? (
            <DailyMediaView
              videoTrack={videoTrack}
              mirror={false}
              objectFit="cover"
              style={styles.dailyMediaView}
            />
          ) : (
            <View style={styles.infoView}>
              <Text>There is no one else in this call yet!</Text>
              <Text>Invite the participants to join this call:</Text>
              <Text>{roomUrl}</Text>
            </View>
          )}
          <Button style={styles.controlButton} onPress={() => leaveRoom()} title="Leave call"></Button>
        </View>
      ) : (
        <View style={styles.outCallContainer}>
          <View style={styles.infoView}>
            <Text>Not in a call yet</Text>
            <TextInput style={styles.roomUrlInput} value={roomUrl} onChangeText={(e) => setRoomUrl(e.target.value)} />
            <Button style={styles.controlButton}  onPress={() => joinRoom()} title="Join call"></Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
