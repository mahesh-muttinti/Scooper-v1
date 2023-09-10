import {View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Dropdown from '../../Dropdown';
import {useDebounce} from '../../../hooks/useDebounceValue';
import {useDispatcherApis} from '../../../apis';
import {createTripFormStore} from './createTripFormState';

type UserType = {
  name: string;
  id: string;
  email: string;
  country_phone_code: string;
  phone: string;
};

export const UsersDropdown = () => {
  const [usersOpen, setUsersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');
  const debouncedSearchTerm = useDebounce(userName, 1000);
  const {setFormField} = createTripFormStore;

  const {
    fetchUsers,
    data: users,
    loading: isUsersFetching,
  } = useDispatcherApis();

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      const payload = {name: debouncedSearchTerm};
      fetchUsers({payload: payload});
    }
  }, [fetchUsers, debouncedSearchTerm]);

  const usersList = useMemo(() => {
    // @ts-ignore
    return users?.map((user: UserType) => ({
      label: user.name,
      value: user.id,
      ...user,
    }));
  }, [users]);

  const handlePrefillUserDetails = useCallback((userObj: any) => {
    setSelectedUser(userObj?.value);
    const userObjFullName = userObj?.name;
    const firstName = userObjFullName?.split(' ')?.[0];
    const lastName = userObjFullName?.split(' ')?.pop();
    const userId = userObj?.id;
    setFormField('first_name', firstName);
    setFormField('last_name', lastName);
    setFormField('email', userObj?.email);
    setFormField('phone', userObj?.phone);
    setFormField('user_id', userId);
  }, []);

  return (
    <View>
      <Dropdown
        data={usersList}
        // @ts-ignore
        setOpen={setUsersOpen}
        value={selectedUser}
        open={usersOpen}
        placeholder="User"
        // @ts-ignore
        onSelect={(user: any) => {
          handlePrefillUserDetails(user);
        }}
        // @ts-ignore
        onSearch={value => {
          setUserName(value);
        }}
        loading={isUsersFetching}
        searchable={true}
      />
    </View>
  );
};
