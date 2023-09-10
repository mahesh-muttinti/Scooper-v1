import {View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';
import {useDispatcherApis} from '../../../apis';
import {createTripFormStore} from './createTripFormState';
import {observer} from 'mobx-react-lite';
import {useDispatch} from 'react-redux';

type DriverType = {
  name: string;
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export const DriversDropDown = observer(() => {
  const [usersOpen, setUsersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const {
    data: drivers,
    loading: isDriversFetching,
    getNearbyProvidersOnManualType,
  } = useDispatcherApis();
  console.log(
    '🚀 ~ file: DriversDropdown.tsx:25 ~ DriversDropDown ~ drivers:',
    JSON.stringify(drivers, null, 2),
  );

  const {formData, setFormField} = createTripFormStore;

  useEffect(() => {
    // if (debouncedSearchTerm.length > 0) {
    // const payload = {name: debouncedSearchTerm};
    // fetchUsers({payload: payload});
    const payload = {
      service_type_id: formData?.service_type_id,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };
    getNearbyProvidersOnManualType({payload});
    // }
  }, [getNearbyProvidersOnManualType]);

  const driversList = useMemo(() => {
    console.log(
      '🚀 ~ file: DriversDropdown.tsx:44 ~ returndrivers?.providers?.map ~ drivers:',
      JSON.stringify(drivers, null, 2),
    );
    // @ts-ignore
    return drivers?.providers?.map((driver: DriverType) => ({
      // @ts-ignore
      label: `${driver?.first_name} ${driver?.last_name} - ${driver?.vehicle_detail?.[0]?.plate_no}`,
      value: driver?._id,
      fullName: `${driver?.first_name} ${driver?.last_name}`,
      ...driver,
    }));
  }, [drivers]);

  return (
    <View>
      <Dropdown
        data={driversList}
        // @ts-ignore
        setOpen={setUsersOpen}
        value={selectedUser}
        open={usersOpen}
        placeholder="Select Driver"
        // @ts-ignore
        onSelect={(item: any) => {
          setSelectedUser(item?.value);
          setFormField('provider_full_name', item?.fullName);
          setFormField('provider_phone', item?.phone);
          setFormField('provider_id', item?.value);
        }}
        loading={isDriversFetching}
        searchable={true}
      />
    </View>
  );
});
