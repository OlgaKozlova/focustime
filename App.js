import React, {useState, useCallback} from 'react';
import { Text, View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import {colors} from './src/utils/colors';
import {Focus} from './src/features/Focus'
import {FocusHistory} from './src/features/FocusHistory'
import {Timer} from './src/features/Timer';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  const handleCurrentSubject = useCallback((text) => {
    setCurrentSubject(text)
  }, [setCurrentSubject])
  
  return (
    <SafeAreaView style={styles.container}>
      {
        currentSubject
          ? <Timer
              focusSubject={currentSubject}
              onTimerEnd={(subject) => {
                setHistory((history) => [...history, subject])
              }}
              clearSubject={() => {setCurrentSubject(null)}}
            />
          : <>
            <Focus setCurrentSubject={handleCurrentSubject}/>
            <FocusHistory history={history}/>
          </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  }
});
