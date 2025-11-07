import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../Utils/colors';
import images from '../../assets/images/images';
import { fonts } from '../../assets/fonts/fonts';
import InputBox from './InputBox';
import { moderateScale } from 'react-native-size-matters';
import { heading } from '../Utils/fontSizes';

type backheaderProps = {
  backheadertitle?: string;
  isSearch?: boolean;
  backIconpress?: () => void;
  setRightIconClick?: (value: boolean) => void;
  rightIconClick?: boolean;
  backgroundColor?: string;
};

const Backheader = ({
  backheadertitle,
  isSearch,
  backIconpress,
  setRightIconClick,
  rightIconClick,
  backgroundColor,
}: backheaderProps) => {
  const handleRightIconPress = () => {
    if (setRightIconClick) {
      setRightIconClick(!rightIconClick);
    }
  };

  return (
    <View style={[styles.container, backgroundColor && { backgroundColor }]}>
      <TouchableOpacity
        onPress={() => backIconpress && backIconpress()}
        style={{
          width: '12%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images.Arwback}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <View style={{ width: '85%', height: 50, justifyContent: 'center' }}>
        {isSearch ? (
          <InputBox
            placeholder="Where are you going ? ..."
            icon={images.SearchBlack}
            rightIcon={images.Filter}
            handleRightIconPress={() => handleRightIconPress()}
          />
        ) : (
          <Text style={styles.headertitle}>{backheadertitle}</Text>
        )}
      </View>
    </View>
  );
};

export default Backheader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: heading,
    color: colors.black,
  },
});
