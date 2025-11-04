import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import InputBox from '../../Components/InputBox';
import { colors } from '../../Utils/colors';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Backheader from '../../Components/Backheader';
import Button from '../../Components/Button';

const SignupScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const validateUsername = (text: string) => {
    setFormData(prev => ({ ...prev, username: text }));
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
    } else {
      setErrors(prev => ({ ...prev, username: '' }));
    }
  };

  const validateEmail = (text: string) => {
    setFormData(prev => ({ ...prev, email: text }));
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/\S+@\S+\.\S+/.test(text)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (text: string) => {
    setFormData(prev => ({ ...prev, password: text }));
    let error = '';
    if (!text.trim()) {
      error = 'Password is required';
    } else if (text.length < 8) {
      error = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(text)) {
      error = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(text)) {
      error = 'Password must contain at least one special character';
    }
    setErrors(prev => ({ ...prev, password: error }));
  };

  const validatePhone = (text: string) => {
    setFormData(prev => ({ ...prev, phone: text }));
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
    } else if (!/^\d{10}$/.test(text)) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateConfirmPassword = (text: string) => {
    setFormData(prev => ({ ...prev, confirmPassword: text }));
    if (!text.trim()) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Confirm password is required',
      }));
    } else if (text !== formData.password) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSignup = () => {
    validateUsername(formData.username);
    validateEmail(formData.email);
    validatePhone(formData.phone);
    validatePassword(formData.password);
    validateConfirmPassword(formData.confirmPassword);

    if (
      formData.username &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword &&
      !errors.username &&
      !errors.email &&
      !errors.phone &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      Alert.alert('Signup', 'Signup successful!');
    }
  };

  const handleSocialLogin = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Backheader backIconpress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.Headingtext}>
              Hello! Register to get started
            </Text>

            <InputBox
              placeholder="Username"
              icon={images.user}
              value={formData.username}
              onChangeText={validateUsername}
              error={errors.username}
              label="Username"
            />
            <InputBox
              placeholder="Email"
              icon={images.email}
              value={formData.email}
              onChangeText={validateEmail}
              error={errors.email}
              label="Email"
            />

            <InputBox
              placeholder="Phone Number"
              icon={images.phone}
              value={formData.phone}
              onChangeText={validatePhone}
              error={errors.phone}
              label="Phone Number"
              keyboardType="numeric"
              maxLength={10}
            />

            <InputBox
              placeholder="Password"
              icon={images.password}
              secureTextEntry
              value={formData.password}
              onChangeText={validatePassword}
              error={errors.password}
              label="Password"
            />

            <InputBox
              placeholder="Confirm password"
              icon={images.password}
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={validateConfirmPassword}
              error={errors.confirmPassword}
              label="Confirm password"
            />

            <View style={styles.buttonWrapper}>
              <Button btntxt="Signup" BtnFunction={handleSignup} />
            </View>

            <View style={styles.socialContainer}>
              <Button
                btntxt="Continue with Facebook"
                BtnFunction={handleSocialLogin}
                customButtonStyle={styles.Socialoutline}
                custombtnText={styles.Socialoutlinetext}
                isIcon={true}
                icon={images.Facebook}
              />
              <Button
                btntxt="Continue with Google"
                BtnFunction={handleSocialLogin}
                customButtonStyle={styles.Socialoutline}
                custombtnText={styles.Socialoutlinetext}
                isIcon={true}
                icon={images.Google}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.mediumSpacing,
    paddingBottom: spacing.mediumSpacing,
  },
  Headingtext: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(25),
    marginRight: spacing.extraLargeSpacing,
    color: colors.black,
  },
  forgotContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: spacing.smallSpacing,
  },
  link: {
    color: colors.buttonBlue,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
  },
  buttonWrapper: {
    marginVertical: spacing.largeSpacing,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    borderWidth: moderateScale(0.7),
    borderColor: colors.border,
    width: '27%',
  },
  orText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
    width: '35%',
    textAlign: 'center',
  },
  socialContainer: {
    gap: spacing.extraLargeSpacing,
  },
  Socialoutline: {
    borderWidth: moderateScale(1),
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  Socialoutlinetext: {
    color: colors.black,
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratSemiBold,
  },
  footerText: {
    color: colors.black,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratMedium,
  },
});
