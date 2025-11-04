import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputBox from '../../Components/InputBox';
import { colors } from '../../Utils/colors';
import { spacing, fontSizes } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backheader from '../../Components/Backheader';
import { moderateScale } from 'react-native-size-matters';
import Button from '../../Components/Button';

const ResetPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleVeify = () => {
    navigation.navigate('MainTabs');
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
        <Text style={styles.Headingtext}>Create new Password</Text>
        <Text style={styles.subtitle}>
          It should be 8-12 characters long, include at least one uppercase
          letter, one number, and one special symbol.
        </Text>
      </View>
      <InputBox
        placeholder="New Password"
        icon={images.password}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={passwordError}
        label="New Password"
      />
      <InputBox
        placeholder="Confirm New Password"
        icon={images.password}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={confirmPasswordError}
        label="Confirm Password"
      />
      <View style={{ marginVertical: moderateScale(25) }}>
        <Button btntxt="Verify" BtnFunction={() => handleVeify()} />
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
  title: {
    fontSize: fontSizes.headingMedium,
    fontFamily: fonts.MontserratBold,
    color: colors.primary,
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
  Headingtext: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(25),
    marginBottom: moderateScale(10),
    color: colors.black,
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginBottom: moderateScale(10),
  },
});

export default ResetPasswordScreen;
