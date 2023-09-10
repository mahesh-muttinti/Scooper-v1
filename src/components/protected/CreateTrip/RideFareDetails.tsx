import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useMapStoreContext} from './context/mapStoreContext';

export const RideFareDetails = () => {
  const {distance, travelTime} = useMapStoreContext();

  return (
    <>
      {/* Display the calculated distance */}
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>
          Distance: {distance?.toFixed(2)} meters
        </Text>
        <Text style={styles.distanceText}>
          Estimated Travel Time: {travelTime?.toFixed(2)} minutes
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  distanceContainer: {
    bottom: 16,
    left: 16,
    padding: 8,
    borderRadius: 8,
    color: 'green',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});
