import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../helpers/Colors';
import ComponentStyles from '../styles/ComponentStyles';

export default function DropDown({
  label,
  items,
  value,
  setValue,
  isOpen,
  setIsOpen,
  placeholder,
  ...rest
}) {
  return (
    <View style={ComponentStyles.inputGroupContainer}>
      <Text style={ComponentStyles.inputLabel}>{label}</Text>
      <DropDownPicker
        style={ComponentStyles.dropDownInput}
        value={value}
        setValue={setValue}
        items={items}
        open={isOpen}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        setOpen={setIsOpen}
        autoScroll
        placeholder={placeholder}
        placeholderStyle={{color: Colors.GRAY}}
        dropDownContainerStyle={{
          backgroundColor: Colors.WHITE,
          borderWidth: 1,
          elevation: 10,
          zIndex: 10,
          borderColor: Colors.LIGHT_GRAY,
        }}
        {...rest}
      />
    </View>
  );
}
