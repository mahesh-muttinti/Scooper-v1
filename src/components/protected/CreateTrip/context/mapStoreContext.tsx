import React, {useContext} from 'react';
import {useMapStore} from '../customHooks/useMapStore';

export const MapContext = React.createContext({
  distance: '',
  mapRef: null,
  setWaypoints: () => {},
  travelTime: '',
  setTravelTime: () => {},
  waypoints: '',
  origin: '',
  destination: '',
});

export const MapContextProvider = ({children}: any) => {
  const {
    distance,
    mapRef,
    setWaypoints,
    travelTime,
    setTravelTime,
    waypoints,
    origin,
    destination,
  } = useMapStore();

  const value = {
    distance,
    mapRef,
    setWaypoints,
    travelTime,
    setTravelTime,
    waypoints,
    origin,
    destination,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMapStoreContext = () => {
  const {
    distance,
    mapRef,
    setWaypoints,
    travelTime,
    setTravelTime,
    waypoints,
    origin,
    destination,
  } = useContext(MapContext);
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
