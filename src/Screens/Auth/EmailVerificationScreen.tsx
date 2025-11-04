import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputBox from '../../Components/InputBox';
import { colors } from '../../Utils/colors';
import { spacing, fontSizes } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';

const EmailVerificationScreen = ({ navigation }: any) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleVerify = () => {
    if (!code) setCodeError('Verification code is required');
    else setCodeError('');

    if (code) {
      // Simulate verification
      Alert.alert('Verification', 'Email verified successfully!');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>
      <InputBox
        placeholder="Verification Code"
        icon={images.verified}
        value={code}
        onChangeText={setCode}
        error={codeError}
        label="Code"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Back to Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.inputHorizontal,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSizes.headingMedium,
    fontFamily: fonts.MontserratBold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.smallSpacing,
  },
  subtitle: {
    fontSize: fontSizes.bodySmall,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.mediumSpacing,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.smallSpacing,
    borderRadius: 8,
    marginTop: spacing.mediumSpacing,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.bodyMedium,
    fontFamily: fonts.MontserratMedium,
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.smallSpacing,
    fontSize: fontSizes.bodySmall,
    fontFamily: fonts.MontserratRegular,
  },
});

export default EmailVerificationScreen;
