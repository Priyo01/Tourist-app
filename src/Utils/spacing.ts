import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const spacing = {
  containerSmallSpacing: verticalScale(5),
  containerMediumSpacing: verticalScale(10),
  containerLargeSpacing: verticalScale(15),
  containerExtraLargeSpacing: verticalScale(20),

  smallSpacing: verticalScale(5),
  mediumSpacing: verticalScale(10),
  largeSpacing: verticalScale(15),
  extraLargeSpacing: verticalScale(20),

  inputHorizontal: scale(10),
  inputVertical: verticalScale(15),

  cardHorizontal: scale(10),
  cardVertical: verticalScale(10),
  paragraphHorizontal: scale(15),
  paragraphVertical: verticalScale(15),

  iconHorizontal: scale(15),
  iconVertical: verticalScale(15),

  errorVertical: verticalScale(5),
};

export const fontSizes = {
  caption: moderateScale(12),
  bodySmall: moderateScale(14),
  bodyMedium: moderateScale(16),
  bodyLarge: moderateScale(18),
  headingSmall: moderateScale(20),
  headingMedium: moderateScale(24),
  headingLarge: moderateScale(28),
};
