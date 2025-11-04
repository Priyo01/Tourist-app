import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import InputBox from '../../Components/InputBox';
import { colors } from '../../Utils/colors';
import { spacing, fontSizes } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Backheader from '../../Components/Backheader';
import Button from '../../Components/Button';

const LoginScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

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

  const handleLogin = () => {
    validateEmail(formData.email);
    validatePassword(formData.password);

    if (
      formData.email &&
      formData.password &&
      !errors.email &&
      !errors.password
    ) {
      navigation.navigate('MainTabs');
    }
  };

  const handleSocialLogin = () => {};

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
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
              Welcome back! Glad{'\n'}to see you, Again!
            </Text>
            <View>
              <InputBox
                placeholder="Email"
                icon={images.email}
                value={formData.email}
                onChangeText={validateEmail}
                error={errors.email}
                label="Email"
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

              <TouchableOpacity
                style={styles.forgotContainer}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonWrapper}>
              <Button btntxt="Login" BtnFunction={handleLogin} />
            </View>

            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or continue with</Text>
              <View style={styles.divider} />
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => handleSignUp()}>
                <Text style={[styles.footerText, { color: colors.buttonBlue }]}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    marginTop: moderateScale(10),
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
    fontFamily: fonts.MontserratSemiBold,
  },
  registerlink: {
    color: colors.black,
    fontSize: fontSizes.bodySmall,
    fontFamily: fonts.MontserratSemiBold,
  },
});
