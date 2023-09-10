import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';

export const PaymentTypeDropdown = ({onSelectPaymentType = () => {}}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');

  const tripTypeOptions = useMemo(() => {
    const paymentTypes = [
      {label: 'Cash', value: '1'},
      {label: 'UPI/Other', value: '2'},
      // Add more service types as needed
    ];

    return paymentTypes;
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
          onSelectPaymentType(item);
        }}
      />
    </View>
  );
};
