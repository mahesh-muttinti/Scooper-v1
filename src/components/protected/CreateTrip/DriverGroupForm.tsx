/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DriverForm} from './DriverForm';
import {DriversDropDown} from './DriversDropdown';
import {StyleSheet, View} from 'react-native';

export const DriverGroupForm = () => {
  return (
    <>
      <View style={{zIndex: 8, ...styles.dropdownGapStyle}}>
        <DriversDropDown />
      </View>
      <DriverForm />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 8,
    paddingHorizontal: 12,
    color: 'black',
    borderRadius: 7,
  },
  labelStyles: {
    color: 'grey',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  buttonWrapperStyles: {
    marginTop: 16,
    marginBottom: 300,
  },
  dropdownGapStyle: {
    marginBottom: 24,
  },
});
