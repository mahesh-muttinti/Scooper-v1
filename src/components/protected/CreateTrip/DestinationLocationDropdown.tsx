import React, {useCallback, useEffect} from 'react';
import {useDispatcherApis} from '../../../apis';
import {observer} from 'mobx-react-lite';
import {createTripFormStore} from './createTripFormState';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {StyleSheet, Text, View} from 'react-native';
import {GOOGLE_MAPS_APIKEY} from '../../../constants/general';

export const DestinationLocationDropdown = observer(() => {
  const {data, getLocationByName} = useDispatcherApis();
  const {setFormField} = createTripFormStore;

  useEffect(() => {
    // @ts-ignore
    const lattitude = data?.results?.[0]?.geometry?.location?.lat;
    setFormField('d_latitude', lattitude);
  }, [data]);

  useEffect(() => {
    // @ts-ignore
    const langitude = data?.results?.[0]?.geometry?.location?.lng;
    setFormField('d_longitude', langitude);
  }, [data]);

  const handleGetDestinationLocation = useCallback(async (location: any) => {
    try {
      const payload = {
        location: location,
      };
      await getLocationByName({payload});
    } catch (error) {
      console.log(
        '🚀 ~ file: Form.tsx:26 ~ handleGetDestinationLocation ~ error:',
        error,
      );
      return error;
    }
  }, []);

  return (
    <>
      <GooglePlacesAutocomplete
        textInputProps={{
          placeholderTextColor: 'grey',
          returnKeyType: 'search',
        }}
        renderRow={rowData => {
          const title = rowData.structured_formatting.main_text;
          const address = rowData.structured_formatting.secondary_text;
          return (
            <View>
              <Text style={styles.result}>{title}</Text>
              <Text style={styles.result}>{address}</Text>
            </View>
          );
        }}
        styles={{
          container: {
            flex: 0,
            marginBottom: 24,
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            color: 'black',
            fontSize: 14,
            borderRadius: 25,
            height: 50,
            paddingHorizontal: 24,
          },
        }}
        placeholder="Enter Destination Address"
        onPress={(destination: any) => {
          const selectedText = destination.description || '';
          setFormField('destination_address', selectedText);
          handleGetDestinationLocation(selectedText);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en', // To receive the results in English
        }}
        listViewDisplayed={false} // Hide the list view
      />
    </>
  );
});

const styles = StyleSheet.create({
  result: {
    fontSize: 14,
    color: 'black',
  },
});
