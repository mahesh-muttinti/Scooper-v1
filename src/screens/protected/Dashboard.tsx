/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';
import {CreateTrip} from './Trips/CreateTrip';
import {createTripFormStore} from '../../components/protected/CreateTrip/createTripFormState';
import {MapScreen} from '../../components/protected/Map/RenderMap';
import {observer} from 'mobx-react-lite';
import {SourceLocationDropdown} from '../../components/protected/CreateTrip/SourceLocationDropdown';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import SideBar from '../../components/protected/Sidebar';

const Drawer = createDrawerNavigator();

export default function DashboardWithDrawer() {
  // @ts-ignore

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '70%',
        },
      }}
      drawerContent={(props: any) => {
        return <SideBar {...props} />;
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{flexDirection: 'row', gap: 12, padding: 12}}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.openDrawer();
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: 25,
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 24,
          }}>
          <SourceLocationDropdown />
        </View>
      </View>

      <ProtectedWrapper scrollView={true} stickyHeader={<Map />}>
        <CreateTrip />
      </ProtectedWrapper>
    </>
  );
};

const Map = observer(() => {
  const {formData} = createTripFormStore;

  return (
    <>
      <View style={styles.mapStyle}>
        <MapScreen
          origin={{
            latitude: formData.latitude || 17.4243932,
            longitude: formData.longitude || 78.44101909999999,
          }}
          destination={{
            latitude: formData.d_latitude || 17.4243932,
            longitude: formData.d_longitude || 78.44101909999999,
          }}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  menuStyle: {
    marginLeft: 12,
    zIndex: 11,
    paddingTop: 24,
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  mapStyle: {
    height: '40%',
  },
});
