/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {UsersDropdown} from './UsersDropdown';
import {createTripFormStore} from './createTripFormState';
import {UserForm} from './UserForm';
import {observer} from 'mobx-react-lite';

export const UserGroupForm = observer(() => {
  const {setFormField} = createTripFormStore;

  const handlePrefillUserDetails = useCallback((userObj: any) => {
    const userObjFullName = userObj?.name;
    const firstName = userObjFullName?.split(' ')?.[0];
    const lastName = userObjFullName?.split(' ')?.pop();
    const userId = userObj?.id;

    setFormField('first_name', firstName);
    setFormField('last_name', lastName);
    setFormField('email', userObj?.email);
    setFormField('phone', userObj?.phone);
    setFormField('user_id', userId);
  }, []);
  return (
    <>
      <View style={{zIndex: 10, ...styles.dropdownGapStyle}}>
        <UsersDropdown
          // @ts-ignore
          onGetUser={userObj => {
            console.log('🚀 ~ file: Form.tsx:82 ~ Form ~ userObj:', userObj);
          }}
          onSelectUser={(userObj: any) => {
            handlePrefillUserDetails(userObj);
          }}
        />
      </View>

      <UserForm />
    </>
  );
});

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
