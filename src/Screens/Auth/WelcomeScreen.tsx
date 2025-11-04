import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { colors } from '../../Utils/colors';
import { spacing, fontSizes } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Button from '../../Components/Button';
import { moderateScale } from 'react-native-size-matters';

const WelcomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ImageBackground
        source={images.welcomebg}
        style={styles.Imagecontainer}
        resizeMode="cover"
      >
        <Text style={styles.title}>START YOUR ADVENTURE WITH US</Text>
        <Text style={styles.subtitle}>
          Stay updated with the latest travel deals and be the first to explore
          new destinations.
        </Text>
        <View
          style={{
            width: '100%',
            gap: spacing.extraLargeSpacing,
            position: 'absolute',
            bottom: 70,
          }}
        >
          <Button btntxt="Login" BtnFunction={() => handleLogin()} />
          <Button
            btntxt="Register"
            customButtonStyle={styles.customBtn}
            BtnFunction={() => handleSignup()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Imagecontainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.paragraphHorizontal,
  },
  title: {
    fontSize: moderateScale(45),
    fontFamily: fonts.MontserratExtraBold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: fonts.MontserratRegular,
    color: colors.white,
    marginBottom: spacing.containerLargeSpacing,
  },
  customBtn: {
    backgroundColor: colors.blur,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 55,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
});

export default WelcomeScreen;
