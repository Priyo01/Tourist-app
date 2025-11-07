import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../Utils/colors';
import { spacing } from '../Utils/spacing';
import { fonts } from '../../assets/fonts/fonts';
import { body } from '../Utils/fontSizes';

interface BottomButtonProps {
  price: string;
  buttonText: string;
  onButtonPress?: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({
  price,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View style={styles.bottomRow}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.AvailabilityButton} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(60),
    paddingHorizontal: spacing.mediumSpacing,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priceText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  AvailabilityButton: {
    width: 'auto',
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBlue,
    borderRadius: moderateScale(8),
    marginRight: spacing.largeSpacing,
    paddingHorizontal:moderateScale(15)
  },
  buttonText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    color: colors.white,
  },
});

export default BottomButton;
