/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Button, InputField} from '../../components';
import {AuthContext} from '../../../App';
import AuthScreenWrapper from '../../components/hoc/AuthWrapper';
// @ts-ignore
import {authErrors} from '../../constants/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Scooper from '../../svgs/Scooper';
import {STYLES} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

export default function AuthOptions() {
  const navigation = useNavigation();
  return (
    <AuthScreenWrapper showBackArrowIcon={false}>
      <View
        style={{
          justifyContent: 'center',
          height: height,
        }}>
        <View style={{alignItems: 'center', paddingVertical: 24}}>
          <Scooper />
        </View>

        <View style={{paddingHorizontal: 24, paddingTop: 32}}>
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{marginBottom: 18, paddingVertical: 16}}
            title="Login"
            textStyles={{fontSize: 20}}
            onPress={() => {
              navigation.navigate('LoginWithUsernameAndPassword');
            }}
            // processing={isApiCalling}
          />
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{marginBottom: 40, paddingVertical: 16}}
            title="Register"
            textStyles={{fontSize: 20}}
            // onPress={handleSubmit}
            // processing={isApiCalling}
          />
        </View>
      </View>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    color: 'black',
    width: '100%',
  },
  inputBoxContainer: {
    borderBottomColor: '#294959',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: 'black',
    textAlign: 'center',
  },
  errorMessageStyle: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  validInput: {
    borderBottomColor: 'green',
  },
});
