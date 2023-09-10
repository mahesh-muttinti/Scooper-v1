import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';
import {createTripFormStore} from './createTripFormState';

export const ProviderTypeDropdown = ({onSelectProviderType = () => {}}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');
  const {setFormField} = createTripFormStore;

  const tripTypeOptions = useMemo(() => {
    const providerTypes = [
      {label: 'Nearest', value: '1'},
      {label: 'Manual', value: '2'},
      // Add more payment types as needed
    ];

    return providerTypes;
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
          onSelectProviderType(item);
          setFormField('provider_type', item?.value);
        }}
      />
    </View>
  );
};
