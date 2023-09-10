import React, {useMemo} from 'react';
import {Alert, StyleSheet} from 'react-native';
import Button from '../../Button';
import {useDispatch, useSelector} from 'react-redux';
import {clearMapState} from '../../../redux/mapSlice';
import {useNavigation} from '@react-navigation/native';
const {useDispatcherApis} = require('../../../apis');
const {createTripFormStore} = require('./createTripFormState');

export const RideLaterCTA = ({onSubmit = () => {}}) => {
  const {submitForm, setFormField, formData, clearFields} = createTripFormStore;
  const {createTrip, loading: isApiCalling} = useDispatcherApis();
  const {data: checkUserResponse, checkUser} = useDispatcherApis();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const drivers = useSelector(state => {
    // @ts-ignore
    return state?.drivers?.drivers;
  });

  const handleSubmit = React.useCallback(async () => {
    try {
      const result = submitForm();
      console.log(
        '🚀 ~ file: Dashboard.tsx:61 ~ handleSubmit ~ result:',
        result,
      );
      if (result === true) {
        await createTrip({payload: {...formData}});
        clearFields();
        dispatch(clearMapState());
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'request_list', screenHeading: 'Normal Trips'},
        });
      } else {
        if (!formData.user_id) {
          await checkUser({payload: {...formData}});
        } else {
          Alert.alert('Validations failed to create the trip');
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: Dashboard.tsx:59 ~ handleSubmit ~ error:', error);
      return error;
    }
  }, []);

  const callCreateTripAPIOnUserCheck = React.useCallback(async () => {
    try {
      const userId = checkUserResponse?.user?._id;

      if (userId) {
        setFormField('user_id', userId);

        console.log(
          '🚀 ~ file: Dashboard.tsx:115 ~ callCreateTripAPIOnUserCheck ~ formData:',
          JSON.stringify(formData, null, 2),
        );
        await handleSubmit();
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Dashboard.tsx:111 ~ callCreateTripAPIOnUserCheck ~ error:',
        error,
      );
      return error;
    }
  }, [checkUserResponse]);

  React.useEffect(() => {
    callCreateTripAPIOnUserCheck();
  }, [callCreateTripAPIOnUserCheck]);

  const noDriversFound = useMemo(() => {
    return (
      !drivers ||
      (drivers && drivers?.providers?.length === 0) ||
      (drivers && drivers?.success === false)
    );
  }, [drivers]);
  console.log(
    '🚀 ~ file: RideNowCTA.tsx:73 ~ noDriversFound ~ noDriversFound:',
    noDriversFound,
  );

  return (
    <>
      <Button
        color={'green'}
        wrapperStyle={styles.buttonWrapperStyles}
        title="Ride Later"
        onPress={() => {
          // handleSubmit();
          onSubmit();
        }}
        processing={isApiCalling}
        // disabled={noDriversFound}
      />
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
    marginBottom: 16,
  },
  dropdownGapStyle: {
    marginBottom: 24,
  },
});
