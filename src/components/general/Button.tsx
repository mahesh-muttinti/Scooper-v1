import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button({
  textStyles = {},
  buttonStyles = {},
  onPress = () => {},
  children,
}: any) {
  return (
    <TouchableOpacity style={{...buttonStyles}} onPress={onPress}>
      {children && typeof children === 'string' ? (
        <Text style={{...textStyles}}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
