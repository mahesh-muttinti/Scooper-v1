import React from 'react';
import InputField from '../../InputField';
import {observer} from 'mobx-react-lite';
import {createTripFormStore} from './createTripFormState';
import {StyleSheet, Text} from 'react-native';

export const UserForm = observer(() => {
  const {formData, setFormField, errors, clearField} = createTripFormStore;

  const handleChangeUserField = (fieldName: any, value: string) => {
    clearField('user_id');
    setFormField(fieldName, value);
  };

  return (
    <>
      <InputField
        labelStyles={styles.labelStyles}
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        label="First Name"
        value={formData.first_name}
        style={[styles.input, errors.first_name ? styles.inputError : null]}
        placeholder="First Name"
        onChange={(value: string) => {
          handleChangeUserField('first_name', value);
        }}
        // @ts-ignore
        errorComponent={
          errors.first_name ? (
            <Text style={styles.errorText}>{errors.first_name}</Text>
          ) : null
        }
      />
      <InputField
        labelStyles={styles.labelStyles}
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        label="Last Name"
        value={formData.last_name}
        style={[styles.input, errors.last_name ? styles.inputError : null]}
        placeholder="Last Name"
        onChange={(value: string) => {
          handleChangeUserField('last_name', value);
        }}
        // @ts-ignore
        errorComponent={
          errors.last_name ? (
            <Text style={styles.errorText}>{errors.last_name}</Text>
          ) : null
        }
      />
      <InputField
        labelStyles={styles.labelStyles}
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        label="Email"
        value={formData.email}
        style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Email"
        onChange={(value: string) => {
          handleChangeUserField('email', value);
        }}
        // @ts-ignore
        errorComponent={
          errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null
        }
      />
      <InputField
        labelStyles={styles.labelStyles}
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        label="Phone"
        value={formData.phone}
        style={[styles.input, errors.phone ? styles.inputError : null]}
        placeholder="Phone"
        onChange={(value: string) => {
          handleChangeUserField('phone', value);
        }}
        // @ts-ignore
        errorComponent={
          errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null
        }
      />
    </>
  );
});

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    color: 'black',
    borderRadius: 7,
    width: '100%',
  },
  inputBoxContainerStyle: {},
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
    marginBottom: 16,
    marginHorizontal: 24,
  },
  dropdownGapStyle: {
    marginBottom: 24,
  },
});
