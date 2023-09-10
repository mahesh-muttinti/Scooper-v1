import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginWithUsernameAndPassword} from '../screens';
const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator initialRouteName="LoginWithUsernameAndPassword">
      <Stack.Screen
        name="LoginWithUsernameAndPassword"
        component={LoginWithUsernameAndPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
