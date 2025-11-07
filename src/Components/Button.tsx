import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import images from '../../assets/images/images';
import { spacing } from '../Utils/spacing';
import { body } from '../Utils/fontSizes';

type ButtonProps = {
  btntxt: string;
  customButtonStyle?: ViewStyle | ViewStyle[];
  custombtnText?: TextStyle | TextStyle[];
  BtnFunction: () => void;
  isIcon?: boolean;
  icon?:any
};

const Button = ({
  btntxt,
  customButtonStyle,
  custombtnText,
  BtnFunction,
  isIcon = false,
  icon
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={BtnFunction}
      style={[
        styles.container,
        isIcon ? styles.rowContainer : styles.centerContainer,
        customButtonStyle,
      ]}
      activeOpacity={0.8}
    >
      {isIcon && (
        <Image
          source={icon}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.ButtonText, custombtnText]}>{btntxt}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(45),
    backgroundColor: colors.buttonBlue,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(12),
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
  },
  iconStyle: {
    width: scale(28),
    height: verticalScale(28),
    marginRight: spacing.smallSpacing,
  },
  ButtonText: {
    color: colors.white,
    fontSize: body,
    fontFamily: fonts.MontserratSemiBold,
  },
});
