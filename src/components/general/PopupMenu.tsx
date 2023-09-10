/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../App';

export interface MenuItemInterface {
  label: string;
  onPress: () => void;
}

const menuOptions = [
  {
    name: 'normal',
    title: 'Normal Trips',
  },
  {
    name: 'accepted',
    title: 'Accepted Trips',
  },
  {
    name: 'arrived',
    title: 'Arrived Trips',
  },
  {
    name: 'started',
    title: 'Started Trips',
  },
  {
    name: 'logout',
    title: 'Logout',
  },
];

const MenuList: React.FC = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const {signOut} = React.useContext(AuthContext);

  const handleSelectOption = (value: string) => {
    switch (value) {
      case 'normal':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'request_list', screenHeading: 'Normal Trips'},
        });
        break;
      case 'accepted':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {
            key: 'accepted_request_list',
            screenHeading: 'Accepted Trips',
          },
        });
        break;
      case 'arrived':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'arrived_request_list', screenHeading: 'Arrived Trips'},
        });
        break;
      case 'started':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'started_request_list', screenHeading: 'Started Trips'},
        });
        break;
      case 'logout':
        // @ts-ignore
        signOut();

        break;
      default:
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'request_list', screenHeading: 'Normal Trips'},
        });
    }
  };
  return (
    <View style={{backgroundColor: 'red', position: 'relative'}}>
      <View
        style={{
          // position: 'absolute',
          height: 200,
          top: 0,
          backgroundColor: 'white',
          width: '100%',
        }}>
        {menuOptions?.map((option, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleSelectOption(option.name);
              }}
              key={index}
              style={{}}>
              <Text style={{color: 'black'}}>{option.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MenuList;
