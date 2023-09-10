/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {TripTypeDropDown} from './TripTypeDropdown';
import {ServiceTypeDropDown} from './ServiceTypeDropdown';
import {ProviderTypeDropdown} from './ProviderTypeDropdown';
import {PaymentTypeDropdown} from './PaymentTypeDropdown';
import {DestinationLocationDropdown} from './DestinationLocationDropdown';
import {DriverGroupForm} from './DriverGroupForm';
import {UserGroupForm} from './UserGroupForm';
import {RideNowCTA} from './RideNowCTA';
import {RideLaterCTA} from './RideLaterCTA';
import {DateTimePicker} from '../../general/DateTimePicker';
import {useFormHandler} from '../../../hooks/createTrip/useFormHandler';

export const Form = observer(() => {
  const {
    formData,
    setFormField,
    open,
    handleRideLater,
    handleConfirmPickDate,
    setOpen,
    selectedDate,
  } = useFormHandler();

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingTop: 24,
        flex: 1,
        height: '100%',
        borderRadius: 24,
        backgroundColor: '#eee',
      }}>
      <DestinationLocationDropdown />
      <View style={{zIndex: 12, ...styles.dropdownGapStyle}}>
        <TripTypeDropDown
          // @ts-ignore
          onSelectTripType={selectedTripType => {
            setFormField('trip_type_option', selectedTripType?.value);
          }}
        />
      </View>
      <View style={{zIndex: 11, ...styles.dropdownGapStyle}}>
        <ServiceTypeDropDown
          // @ts-ignore
          onSelectTripType={selectedTripType => {
            setFormField('service_type_id', selectedTripType?.value);
          }}
        />
      </View>

      <UserGroupForm />

      <View style={{zIndex: 10, ...styles.dropdownGapStyle}}>
        <ProviderTypeDropdown />
      </View>

      <View style={{zIndex: 9, ...styles.dropdownGapStyle}}>
        <PaymentTypeDropdown
          // @ts-ignore
          onSelectPaymentType={selectedPaymentType => {
            setFormField('payment_mode', selectedPaymentType?.value);
            setFormField('payment_type', selectedPaymentType?.value);
          }}
        />
      </View>

      {formData.provider_type === '2' ? <DriverGroupForm /> : null}

      <DateTimePicker
        // @ts-ignore
        onConfirm={handleConfirmPickDate}
        onCancel={() => {
          setOpen(false);
        }}
        date={selectedDate}
        modal={true}
        open={open}
        minuteInterval={5}
        minimumDate={new Date()}
      />

      <RideNowCTA />
      <RideLaterCTA onSubmit={handleRideLater} />
    </View>
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
