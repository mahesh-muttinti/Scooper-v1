import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens';
import TripsList from '../screens/protected/Trips/List';
const Stack = createStackNavigator();

export default function Protected() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
        // initialParams={{setUserToken}}
      />
      <Stack.Screen
        name="TripsList"
        component={TripsList}
        options={{
          headerShown: false,
        }}
        // initialParams={{setUserToken}}
      />
    </Stack.Navigator>
  );
}
