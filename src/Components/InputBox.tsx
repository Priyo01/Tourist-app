import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInputProps,
  Text,
} from 'react-native';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import { spacing } from '../Utils/spacing';
import { caption } from '../Utils/fontSizes';
import images from '../../assets/images/images';
import { moderateScale } from 'react-native-size-matters';
import { small } from '../Utils/fontSizes';

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: any;
  secureTextEntry?: boolean;
  error?: string;
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
  rightIcon?: any;
  handleRightIconPress?: () => void;
}

const InputBox = ({
  label,
  placeholder,
  icon,
  secureTextEntry = false,
  value,
  onChangeText,
  error,
  multiline,
  numberOfLines,
  rightIcon,
  handleRightIconPress,
  ...rest
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const containerHeight = multiline
    ? numberOfLines
      ? numberOfLines * 24 + 32
      : 120
    : 56;

  const containerStyle = multiline
    ? styles.multilineContainer
    : styles.singleLineContainer;

  return (
    <View style={error ? styles.outerError : styles.outerNormal}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View
        style={[
          containerStyle,
          { height: containerHeight },
          error ? styles.errorBorder : null,
        ]}
      >
        {!multiline && <Image source={icon} style={styles.leftIcon} />}
        <TextInput
          style={[styles.input, multiline ? styles.multilineInput : null]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...rest}
        />
        {secureTextEntry && !multiline && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIconContainer}
          >
            <Image
              source={isPasswordVisible ? images.eyeOpen : images.eyeClose}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && !multiline && (
          <TouchableOpacity onPress={handleRightIconPress}>
            <Image source={rightIcon} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
        {error && <Image source={images.errorInfo} style={styles.errorIcon} />}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  singleLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.inputHorizontal,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  multilineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.inputHorizontal,
    backgroundColor: '#fff',
  },
  outerNormal: {
    marginTop: spacing.mediumSpacing,
  },
  outerError: {
    marginTop: spacing.mediumSpacing,
  },
  inputLabel: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: small,
    color: colors.textPrimary,
    marginBottom: moderateScale(5),
  },
  errorBorder: {
    borderColor: colors.error,
  },
  leftIcon: {
    width: 24,
    height: 24,
    marginRight: spacing.iconHorizontal,
    tintColor: colors.black,
  },
  input: {
    flex: 1,
    fontSize: small,
    color: colors.textPrimary,
    height: 40,
    textAlignVertical: 'center',
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: spacing.mediumSpacing,
    paddingBottom: spacing.mediumSpacing,
    minHeight: 80,
  },
  rightIconContainer: {
    padding: spacing.smallSpacing,
  },
  rightIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  errorIcon: {
    width: 20,
    height: 20,
    tintColor: colors.error,
    marginLeft: spacing.mediumSpacing,
  },
  errorText: {
    color: colors.error,
    fontSize: caption,
  },
});

export default InputBox;
