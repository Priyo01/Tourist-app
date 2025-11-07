import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputBox from '../../Components/InputBox';
import { colors } from '../../Utils/colors';
import { spacing } from '../../Utils/spacing';
import { bodySmall, headingMedium, bodyMedium, small } from '../../Utils/fontSizes';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backheader from '../../Components/Backheader';
import { moderateScale } from 'react-native-size-matters';
import Button from '../../Components/Button';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleResetPassword = () => {
    if (!email) setEmailError('Email is required');
    else setEmailError('');

    if (email) {
      navigation.navigate('Login');
    }
  };

  const handleForgetpassword = () => {
    navigation.navigate('Otpverify');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backheader backIconpress={() => navigation.goBack()} />
      <View
        style={{
          marginTop: moderateScale(10),
          marginBottom: moderateScale(20),
        }}
      >
        <Text style={styles.Headingtext}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </Text>
      </View>

      <View
        style={{
          marginTop: moderateScale(10),
          marginBottom: moderateScale(25),
        }}
      >
        <InputBox
          placeholder="Enter your email"
          icon={images.email}
          value={email}
          onChangeText={setEmail}
          error={emailError}
          label="Email"
        />
      </View>

      <View>
        <Button btntxt="Send Code" BtnFunction={() => handleForgetpassword()} />
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
        <Text style={styles.link}>Remember password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: colors.buttonBlue }]}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.inputHorizontal,
    backgroundColor: colors.white,
  },

  subtitle: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(10),
    borderRadius: 8,
    marginTop: moderateScale(15),
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: bodyMedium,
    fontFamily: fonts.MontserratMedium,
  },
  link: {
    color: colors.black,
    fontSize: bodySmall,
    fontFamily: fonts.MontserratSemiBold,
  },
  Headingtext: {
    fontFamily: fonts.MontserratBold,
    fontSize: headingMedium,
    marginBottom: moderateScale(10),
    color: colors.black,
  },
});

export default ForgotPasswordScreen;
