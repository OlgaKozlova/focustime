import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import {spacing} from '../utils/sizes'

export const Focus = (props) => {
  const {setCurrentSubject} = props;
  const [subject, setSubject] = useState(null);

  const handleChangeSubject = useCallback(
    (value) => {
      setSubject(value);
    },
    [setSubject]
  );

const handleChangeCurrentSubject = useCallback(
    () => {
      setCurrentSubject(subject);
    },
    [setCurrentSubject, subject]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="What would you like to focus on?"
          onChangeText={handleChangeSubject}
          style={styles.textInput}
        />
        <View style={styles.buttonContainer}>
          <RoundedButton title="+" size={50} onPress={handleChangeCurrentSubject}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  }
});
