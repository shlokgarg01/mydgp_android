import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import ComponentStyles from '../styles/ComponentStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CTABtn({
  label,
  onClick,
  disabled,
  bgColor,
  color,
  icon,
  iconColor,
  width,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[
        ComponentStyles.btnContainer,
        ComponentStyles.horizontalAlign,
        {
          backgroundColor: bgColor,
          width: width ?? '46%',
          marginBottom: 10,
          justifyContent: 'center',
        },
      ]}>
      {icon ? (
        <Icon
          name={icon}
          size={25}
          color={iconColor}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <Text style={[ComponentStyles.btnLabel, { color: color }]}>{label}</Text>
    </TouchableOpacity>
  );
}
