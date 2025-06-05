import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import {Timing} from './Timing'

const ONE_SEC = 1000;
const PATTERN = [
  5 * ONE_SEC,
  2 * ONE_SEC,
  3 * ONE_SEC,
]

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
   const [minutes, setMinutes] = useState(0.1);
   const onEnd = (reset) => {
     Vibration.vibrate(PATTERN);
     setIsStarted(false);
     setProgress(1);
     reset();
     onTimerEnd(focusSubject)
   }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={setProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar color={colors.progressBar} style={{height: 10}} progress={progress}/>
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
      <RoundedButton size={50} title="-" onPress={clearSubject}/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
     flex: 0.1,
     flexDirection: 'row',
     padding: 15,
     justifyContent: 'space-around',
     alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
