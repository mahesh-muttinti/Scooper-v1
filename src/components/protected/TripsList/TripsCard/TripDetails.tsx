/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LineDivider from '../../../general/LineDivider';

export const TripDetails = ({tripData}: any) => {
  const {
    user_detail,
    provider_detail,
    vehicle_detail,
    source_address,
    destination_address,
    typename,
    city_type_detail,
  } = tripData;

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.userName}>Trip Details</Text>
        {/* <Text style={styles.addressTitle}>Trip ID:</Text>
        <Text style={styles.addressText}>{tripData?.unique_id}</Text> */}
        <Text style={styles.addressTitle}>Trip Came At:</Text>

        <Text style={styles.addressText}>
          {moment(
            tripData?.is_schedule_trip
              ? tripData?.server_start_time_for_schedule
              : tripData?.created_at,
          ).format("DD MMM 'YY hh:mm a")}
        </Text>
        <Text style={styles.addressTitle}>Pickup Address:</Text>
        <Text style={styles.addressText}>{source_address}</Text>
        <Text style={styles.addressTitle}>Destination Address:</Text>
        <Text style={styles.addressText}>{destination_address}</Text>
        {typename || city_type_detail ? (
          <>
            <Text style={styles.addressTitle}>Requested Vehicle Type:</Text>
            <Text style={styles.addressText}>
              {typename || city_type_detail?.typename}
            </Text>
          </>
        ) : null}
      </View>
      <LineDivider color="black" style={{marginBottom: 24}} />
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>User Details</Text>
        <Text style={styles.userEmail}>
          {user_detail?.first_name} {user_detail?.last_name}
        </Text>
        <Text style={styles.userEmail}>{user_detail?.email}</Text>
        <Text style={styles.userEmail}>{user_detail?.phone}</Text>
      </View>
      {provider_detail ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Driver Details</Text>
          <Text style={styles.userEmail}>
            {provider_detail?.first_name} {provider_detail?.last_name}
          </Text>
          <Text style={styles.userEmail}>{provider_detail?.email}</Text>
          <Text style={styles.userEmail}>{provider_detail?.phone}</Text>
        </View>
      ) : null}
      {vehicle_detail ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Vehicle Details</Text>
          <Text style={styles.userEmail}>
            Vehicle Number: {vehicle_detail?.[0]?.plat_no}
          </Text>
          <Text style={styles.userEmail}>
            Model: {vehicle_detail?.[0]?.model}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    paddingBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  addressContainer: {
    marginBottom: 14,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    paddingBottom: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 12,
  },
  mapContainer: {
    flex: 1,
    // Add styles for your map container here
  },
});
