import {View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';
import {useDispatcherApis} from '../../../apis';
import {createTripFormStore} from './createTripFormState';
import {useDispatch, useSelector} from 'react-redux';
import {
  setTotalDistance,
  setTotalTime,
  setMinFareAmount,
} from '../../../redux/mapSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearDrivers, setDrivers} from '../../../redux/driverSlice';
import {ErrorText} from '../../general/ErrorText';

type ServiceTypeTypes = {
  name: string;
  id: string;
};

export const ServiceTypeDropDown = () => {
  const [usersOpen, setUsersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {formData, setFormField} = createTripFormStore;
  const dispatch = useDispatch();
  const {
    fetchServiceTypes,
    data: serviceTypes,
    loading,
    // apiError,
  } = useDispatcherApis();

  const {
    getFareEstimateForTrip,
    data: fareEstimate,
    // loading: isFareEstimateLoading,
    // apiError,
  } = useDispatcherApis();

  const {
    getDispatcherDetails,
    data: dispatcherDetails,
    // apiError,
  } = useDispatcherApis();

  const {
    data: drivers,
    loading: isDriversFetching,
    getNearbyProvidersOnManualType,
  } = useDispatcherApis();

  console.log(
    '🚀 ~ file: DriversDropdown.tsx:25 ~ DriversDropDown ~ drivers:',
    JSON.stringify(drivers, null, 2),
  );

  useEffect(() => {
    if (
      formData?.service_type_id &&
      formData?.latitude &&
      formData?.longitude
    ) {
      const payload = {
        service_type_id: formData?.service_type_id,
        latitude: formData?.latitude,
        longitude: formData?.longitude,
      };
      getNearbyProvidersOnManualType({payload});
    }
  }, [formData?.service_type_id]);

  useEffect(() => {
    dispatch(setDrivers(drivers));
  }, [drivers]);

  const getDispatcherDetailsFn = useCallback(async () => {
    try {
      const dispatcherId = await AsyncStorage.getItem('@dispatcher_id');

      const payload = {
        dispatcherId: dispatcherId,
      };
      await getDispatcherDetails({payload});
    } catch (error) {
      console.log(
        '🚀 ~ file: ServiceTypeDropdown.tsx:52 ~ getDispatcherDetailsFn ~ error:',
        error,
      );
      return error;
    }
  }, []);

  useEffect(() => {
    getDispatcherDetailsFn();
  }, [getDispatcherDetailsFn]);

  const {distance, time} = useSelector((state: any) => {
    return state?.map;
  });

  const serviceTypesList = useMemo(() => {
    // @ts-ignore
    return serviceTypes?.citytypes?.map((serviceType: ServiceTypeTypes) => ({
      label: serviceType?.typename,
      value: serviceType?._id,
    }));
  }, [serviceTypes]);

  const prefillCityDetailsInTrip = useCallback(() => {
    const cityDetails = serviceTypes?.city_detail;
    setFormField('city_id', cityDetails?._id);
    setFormField('city', cityDetails?.city_name);
    setFormField('timezone', cityDetails?.timezone);
  }, [serviceTypes]);

  useEffect(() => {
    prefillCityDetailsInTrip();
  }, [prefillCityDetailsInTrip]);

  const handleSelectServiceType = (serviceType: any) => {
    dispatch(clearDrivers());
    setSelectedUser(serviceType.value);
    setFormField('service_type_id', serviceType?.value);
  };

  const getFareForTrip = useCallback(async () => {
    try {
      if (
        formData?.service_type_id &&
        formData?.latitude &&
        formData?.longitude &&
        formData?.d_latitude &&
        formData?.d_longitude
      ) {
        const payload = {
          service_type_id:
            formData?.service_type_id || '6401b2667e59316793278dc2',
          pickup_latitude: formData?.latitude,
          pickup_longitude: formData?.longitude,
          destination_latitude: formData?.d_latitude,
          destination_longitude: formData?.d_longitude,
          surge_multiplier: 1,
          is_multiple_stop: 0,
          is_surge_hours: 0,
          distance: distance,
          time: time,
        };

        await getFareEstimateForTrip({payload});
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ServiceTypeDropdown.tsx:54 ~ getFareForTrip ~ error:',
        error,
      );
      return error;
    }
  }, [
    formData?.service_type_id,
    formData?.latitude,
    formData?.longitude,
    formData?.d_latitude,
    formData?.d_longitude,
  ]);

  useEffect(() => {
    getFareForTrip();
  }, [getFareForTrip]);

  const fetchServiceTypesFn = useCallback(async () => {
    try {
      if (formData?.latitude && formData?.longitude && dispatcherDetails) {
        const payload = {
          subAdminCountry: dispatcherDetails?.dispatcher?.country,
          latitude: formData?.latitude,
          longitude: formData?.longitude,
        };

        await fetchServiceTypes({payload});
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ServiceTypeDropdown.tsx:128 ~ fetchServiceTypesFn ~ error:',
        error,
      );
      return error;
    }
  }, [dispatcherDetails, formData?.latitude, formData?.longitude]);

  useEffect(() => {
    fetchServiceTypesFn();
  }, [fetchServiceTypesFn]);

  const prefillDispatcherDetailsInTrip = useCallback(() => {
    console.log(
      '🚀 ~ file: ServiceTypeDropdown.tsx:167 ~ prefillDispatcherDetailsInTrip ~ dispatcherDetails?._id:',
      dispatcherDetails?.dispatcher?._id,
    );
    if (
      dispatcherDetails?.dispatcher?.country &&
      dispatcherDetails?.dispatcher?.country_phone_code &&
      dispatcherDetails?.dispatcher?._id
    ) {
      setFormField('country', dispatcherDetails?.dispatcher?.country);
      setFormField(
        'country_phone_code',
        dispatcherDetails?.dispatcher?.country_phone_code,
      );
      setFormField('user_type_id', dispatcherDetails?.dispatcher?._id);
    }
  }, [dispatcherDetails]);

  useEffect(() => {
    prefillDispatcherDetailsInTrip();
  }, [prefillDispatcherDetailsInTrip]);

  useEffect(() => {
    if (fareEstimate) {
      const totalDistance =
        parseFloat(fareEstimate?.distance)?.toFixed(2) + ' km';
      dispatch(setTotalDistance(totalDistance));

      const totalTime = parseFloat(fareEstimate?.time)?.toFixed(2) + ' min';
      dispatch(setTotalTime(totalTime));

      const minFareAmount = `₹ ${fareEstimate?.estimated_fare}`;
      dispatch(setMinFareAmount(minFareAmount));
    }
  }, [fareEstimate]);

  const noDriversFound = useMemo(() => {
    return drivers?.providers?.length === 0 || drivers?.success === false;
  }, [drivers]);

  return (
    <View>
      <Dropdown
        data={serviceTypesList}
        // @ts-ignore
        setOpen={setUsersOpen}
        value={selectedUser}
        open={usersOpen}
        placeholder="Select Service Types"
        // @ts-ignore
        onSelect={(serviceType: any) => {
          handleSelectServiceType(serviceType);
        }}
        loading={loading}
        searchable={false}
      />
      {noDriversFound ? <ErrorText errorText="Provider not found" /> : null}
    </View>
  );
};
