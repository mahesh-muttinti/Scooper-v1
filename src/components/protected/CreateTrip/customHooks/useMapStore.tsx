import {useEffect, useMemo, useRef, useState} from 'react';
import {createTripFormStore} from '../createTripFormState';

export const useMapStore = () => {
  const {formData} = createTripFormStore;

  const origin = useMemo(() => {
    return {
      latitude: formData.latitude,
      longitude: formData.longitude,
    };
  }, [formData]);
  const destination = useMemo(() => {
    return {
      latitude: formData.d_latitude,
      longitude: formData.d_longitude,
    };
  }, [formData]);
  const [waypoints, setWaypoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const [travelTime, setTravelTime] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    // Calculate the distance between waypoints when waypoints change
    if (waypoints.length > 1) {
      let totalDistance = 0;
      for (let i = 1; i < waypoints.length; i++) {
        const prevWaypoint = waypoints[i - 1];
        const currentWaypoint = waypoints[i];
        const segmentDistance = calculateDistance(
          prevWaypoint.latitude,
          prevWaypoint.longitude,
          currentWaypoint.latitude,
          currentWaypoint.longitude,
        );
        totalDistance += segmentDistance;
      }
      console.log(
        '🚀 ~ file: RenderMap.tsx:39 ~ useEffect ~ totalDistance:',
        totalDistance,
      );
      setDistance(totalDistance);
      const tempSpeed = 60;

      // Calculate estimated travel time
      const timeInHours = totalDistance / (tempSpeed * 1000); // Convert speed from km/h to m/s
      const timeInMinutes = timeInHours * 60;
      console.log(
        '🚀 ~ file: useMapStore.tsx:46 ~ useEffect ~ timeInMinutes:',
        timeInMinutes,
      );
      // setTravelTime(timeInMinutes);
    }
  }, [waypoints]);

  // Helper function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // Convert distance from nautical miles to kilometers
    dist = dist * 1000; // Convert distance from kilometers to meters

    // Convert distance from miles to your preferred unit (e.g., kilometers)
    // dist = dist * 1.609344;
    return dist;
  };
  return {
    distance,
    mapRef,
    setWaypoints,
    travelTime,
    setTravelTime,
    waypoints,
    origin,
    destination,
  };
};
console.log("🚀 ~ file: useMapStore.tsx:87 ~ useMapStore ~ useMapStore:", useMapStore)
console.log("🚀 ~ file: useMapStore.tsx:87 ~ useMapStore ~ useMapStore:", useMapStore)
console.log("🚀 ~ file: useMapStore.tsx:87 ~ useMapStore ~ useMapStore:", useMapStore)
console.log("🚀 ~ file: useMapStore.tsx:87 ~ useMapStore ~ useMapStore:", useMapStore)
