/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {Form} from '../../../components/protected/CreateTrip/Form';

export const CreateTrip = () => {
  return (
    <View style={{backgroundColor: 'red', borderRadius: 24}}>
      {/* <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
          textAlign: 'center',
          color: 'black',
          paddingTop: 24,
        }}>
        Create Trip Form
      </Text> */}
      <Form />
    </View>
  );
};
