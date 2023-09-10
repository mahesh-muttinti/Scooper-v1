import React from 'react';
import InputField from '../../InputField';
import {observer} from 'mobx-react-lite';
import {createTripFormStore} from './createTripFormState';
import {StyleSheet, Text} from 'react-native';

export const DriverForm = observer(() => {
  const {formData, setFormField, errors} = createTripFormStore;
  return (
    <>
      <InputField
        labelStyles={styles.labelStyles}
        label="Full Name"
        value={formData.provider_full_name}
        style={[styles.input, errors.first_name ? styles.inputError : null]}
        placeholder="Full Name"
        onChange={(value: string) => setFormField('provider_full_name', value)}
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        // @ts-ignore
        errorComponent={
          errors.provider_full_name ? (
            <Text style={styles.errorText}>{errors.provider_full_name}</Text>
          ) : null
        }
      />
      <InputField
        labelStyles={styles.labelStyles}
        label="Phone"
        value={formData.provider_phone}
        style={[styles.input, errors.phone ? styles.inputError : null]}
        placeholder="Phone"
        inputBoxContainerStyle={{
          marginBottom: 16,
          borderRadius: 25,
          paddingHorizontal: 7,
        }}
        onChange={(value: string) => setFormField('provider_phone', value)}
        // @ts-ignore
        errorComponent={
          errors.provider_phone ? (
            <Text style={styles.errorText}>{errors.provider_phone}</Text>
          ) : null
        }
        keyboardType={'numeric'}
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
