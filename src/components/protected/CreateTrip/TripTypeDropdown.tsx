import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';

export const TripTypeDropDown = ({onSelectTripType = () => {}}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');

  const tripTypeOptions = useMemo(() => {
    const tripTypes = [
      {label: 'Normal', value: '1'},
      {label: 'Car Rental', value: '2'},
      // Add more trip types as needed
    ];
    return tripTypes;
  }, []);

  return (
    <View>
      <Dropdown
        // @ts-ignore
        data={tripTypeOptions}
        // @ts-ignore
        setOpen={setDropdownOpen}
        // @ts-ignore
        value={selectedOption}
        open={dropdownOpen}
        placeholder="Select Trip Type"
        // @ts-ignore
        onSelect={(item: any) => {
          setSelectedOption(item?.value);
          // @ts-ignore
          onSelectTripType(item);
        }}
      />
    </View>
  );
};
