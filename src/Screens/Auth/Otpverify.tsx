import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from 'react-native-otp-entry';
import Backheader from '../../Components/Backheader';
import { colors } from '../../Utils/colors';
import { fonts } from '../../../assets/fonts/fonts';
import { moderateScale } from 'react-native-size-matters';
import { spacing } from '../../Utils/spacing';
import { bodySmall, headingMedium, bodyMedium, headingSmall } from '../../Utils/fontSizes';
import Button from '../../Components/Button';

const Otpverify = ({ navigation }: any) => {
  const handleResendOtp = () => {
    console.log('okk');
  };
  const handleVerifyOtp = () => {
    navigation.navigate('ResetPassword');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Backheader backIconpress={() => navigation.goBack()} />
      <View
        style={{
          marginTop: moderateScale(10),
          marginBottom: moderateScale(20),
          marginHorizontal: moderateScale(10),
        }}
      >
        <Text style={styles.Headingtext}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the verification code we jst sent on your email address.
        </Text>
      </View>
      <View style={styles.otpInputView}>
        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          autoFocus={false}
          hideStick={true}
          placeholder="******"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
          onTextChange={text => console.log(text)}
          onFilled={text => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          textProps={{
            accessibilityRole: 'text',
            accessibilityLabel: 'OTP digit',
            allowFontScaling: false,
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            placeholderTextStyle: styles.placeholderText,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          }}
        />
      </View>
      <View
        style={{
          marginVertical: moderateScale(20),
          marginHorizontal: moderateScale(10),
        }}
      >
        <Button btntxt="verify" BtnFunction={() => handleVerifyOtp()} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}
      >
        <Text style={styles.link}>Didn’t received code? </Text>
        <TouchableOpacity onPress={() => handleResendOtp()}>
          <Text style={[styles.link, { color: colors.buttonBlue }]}>
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Otpverify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Headingtext: {
    fontFamily: fonts.MontserratBold,
    fontSize: headingMedium,
    marginBottom: moderateScale(10),
    color: colors.black,
  },
  subtitle: {
    fontSize: bodyMedium,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginBottom: moderateScale(10),
  },
  otpInputView: {
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(50),
  },
  otpContainer: {
    width: '100%',
    marginBottom: moderateScale(20),
  },
  pinCodeContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  pinCodeText: {
    fontSize: headingSmall,
    fontFamily: fonts.MontserratBold,
    color: colors.black,
  },
  focusStick: {
    backgroundColor: colors.primary,
    width: moderateScale(2),
    height: moderateScale(30),
  },
  activePinCodeContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: headingSmall,
  },
  filledPinCodeContainer: {
    backgroundColor: colors.input,
  },
  disabledPinCodeContainer: {
    backgroundColor: colors.disabled,
    opacity: 0.5,
  },
  link: {
    color: colors.black,
    fontSize: bodySmall,
    fontFamily: fonts.MontserratSemiBold,
  },
});
