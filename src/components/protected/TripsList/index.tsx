import React, {FC, useCallback, useEffect} from 'react';
import {useDispatcherApis} from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './TripsCard';
import {useRoute} from '@react-navigation/native';
import {getTripStatus} from '../../../utils/getTripStatus';
import {FlatList} from 'react-native';
import {SkeletonItem} from '../../general/SkeletonItem';
import moment from 'moment';

export const TripsList: FC = () => {
  const {loading, data: tripsList, getTripsList} = useDispatcherApis();

  const route = useRoute();
  // @ts-ignore
  const tripKey = route?.params?.key;
  console.log('🚀 ~ file: index.tsx:23 ~ tripKey:', tripKey);

  const getTrips = useCallback(async () => {
    try {
      const dispatcherId = await AsyncStorage.getItem('@dispatcher_id');
      const payload = {
        dispatcher_id: dispatcherId,
      };
      await getTripsList({payload});
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:19 ~ getTrips ~ error:', error);
      return error;
    }
  }, []);

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return (
    <FlatList
      data={loading ? Array.from({length: 10}) : tripsList?.[`${tripKey}`]}
      keyExtractor={(_, index) => index?.toString()}
      renderItem={({item}) =>
        loading ? <SkeletonItem /> : <ListItem item={item} />
      }
    />
  );
};

const ListItem = ({item: trip, index}: any) => {
  return (
    <Card
      key={index}
      id={trip?.unique_id}
      state={getTripStatus({
        isProviderAccepted: trip?.is_provider_accepted,
        isProviderStatus: trip?.is_provider_status,
      })}
      tripData={trip}
      pickupAt={moment(
        // @ts-ignore
        item?.is_schedule_trip
          ? // @ts-ignore
            item?.server_start_time_for_schedule
          : // @ts-ignore
            item?.created_at,
      ).format('DD-MM-YYYY HH:mm')}
      onCancel={() => {}}
    />
  );
};
