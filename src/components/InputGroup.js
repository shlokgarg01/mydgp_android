import React from 'react';
import {View, Text, TextInput} from 'react-native';
import ComponentStyles from '../styles/ComponentStyles';

const InputGroup = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  maxLength,
  ...rest
}) => {
  return (
    <View style={ComponentStyles.inputGroupContainer}>
      <Text style={ComponentStyles.inputLabel}>{label}</Text>
      <TextInput
        keyboardType={type}
        style={ComponentStyles.inputField}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        placeholderTextColor={'#757575'}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  );
};

export default InputGroup;
