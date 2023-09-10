/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth, Protected} from './src/stacks';
import {navigationRef} from './src/utils/rootNavigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import ScooperImage from './src/assets/scooper.png';
import {enableLatestRenderer} from 'react-native-maps';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

enableLatestRenderer();

const Stack = createStackNavigator();
export const AuthContext = React.createContext(null);

function App(): JSX.Element {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('@access_token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: token});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (payload: any) => {
        try {
          console.log('🚀 ~ file: App.tsx:82 ~ signIn: ~ payload:', payload);

          const {data: response} = await axios.post(
            'https://staging.ohmelogistics.com/dispatcher_mobile/login',
            payload,
          );
          console.log(
            '🚀 ~ file: App.tsx:85 ~ signIn: ~ response:',
            JSON.stringify(response),
          );
          if (response.success === false) {
            console.log(
              'response.success === false: ',
              response.success === false,
            );
            return response;
          } else {
            await AsyncStorage.setItem('@access_token', response.token);
            await AsyncStorage.setItem('@dispatcher_id', response.user_id);

            console.log(
              '🚀 ~ file: App.tsx:97 ~ signIn: ~ accessToken:',
              response.token,
            );

            dispatch({type: 'SIGN_IN', token: response.token});
            return response;
          }
        } catch (error) {
          console.log('🚀 ~ file: App.tsx:78 ~ signIn: ~ error:', error);
          return error;
        }
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* @ts-ignore */}
        <AuthContext.Provider value={authContext}>
          {/* @ts-ignore */}
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              {state.isLoading ? (
                <Stack.Screen
                  name="Splash"
                  options={{headerShown: false}}
                  component={SplashScreen}
                />
              ) : state.userToken === null || state.userToken === undefined ? (
                <Stack.Screen
                  name="Auth"
                  component={Auth}
                  options={{
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    headerShown: false,
                  }}
                />
              ) : (
                // User is signed in
                <Stack.Screen
                  name="Protected"
                  component={Protected}
                  options={{headerShown: false}}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
}

function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image source={ScooperImage} style={{height: 150, width: 150}} />
    </View>
  );
}
export default App;
