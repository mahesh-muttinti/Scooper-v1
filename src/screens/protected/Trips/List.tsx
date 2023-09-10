/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import ProtectedWrapper from '../../../components/hoc/ProtectedWrapper';
import TripsCard from '../../../components/protected/TripsList/TripsCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatcherApis} from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'; // You can choose a different icon library if you prefer
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getTripStatus} from '../../../utils/getTripStatus';
import {SkeletonItem} from '../../../components/general/SkeletonItem';
import moment from 'moment';

interface TripItem {
  id: number;
  title: string;
  status: string;
}

const TripsScreen = ({data, loading}: {data: TripItem[]; loading: boolean}) => (
  <FlatList
    data={loading ? Array.from({length: 10}) : data}
    keyExtractor={(_, index) => index?.toString()}
    renderItem={({item}: any) =>
      loading ? <SkeletonItem /> : <ListItem item={item} />
    }
  />
);

export default function TripsList({route}: any) {
  const navigation = useNavigation();
  const tripKey = route?.params?.key;
  const screenHeading = route?.params?.screenHeading;
  console.log('🚀 ~ file: List.tsx:76 ~ TripsList ~ tripKey:', tripKey);

  const {loading, data: tripsList, getTripsList} = useDispatcherApis();

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
    <ProtectedWrapper>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 24,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.canGoBack() ? navigation.goBack() : null;
          }}
          hitSlop={{left: 50, right: 50, top: 50, bottom: 50}}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: 16,
            color: 'black',
          }}>
          {screenHeading}
        </Text>
      </View>
      {/* @ts-ignore */}
      <TripsScreen loading={loading} data={tripsList?.[`${tripKey}`]} />
    </ProtectedWrapper>
  );
}

const ListItem = ({item}: {item: TripItem}) => {
  console.log(
    '🚀 ~ file: List.tsx:19 ~ renderListItem ~ trip:',
    JSON.stringify(item, null, 2),
  );

  return (
    <View style={{padding: 16}}>
      <TripsCard
        // @ts-ignore
        id={item?.unique_id}
        state={getTripStatus({
          // @ts-ignore
          isProviderAccepted: item?.is_provider_accepted,
          // @ts-ignore
          isProviderStatus: item?.is_provider_status,
        })}
        pickupAt={moment(
          // @ts-ignore
          item?.is_schedule_trip
            ? // @ts-ignore
              item?.server_start_time_for_schedule
            : // @ts-ignore
              item?.created_at,
        ).format('DD-MM-YYYY HH:mm')}
        onCancel={() => {}}
        tripData={item}
      />
    </View>
  );
};
