import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { spacing } from '../Utils/spacing';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import images from '../../assets/images/images'; // For right arrow icon if you have it


const PopularDestinations = ({ data }: { data: { title: string; image: string }[] }) => {

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Popular Destinations</Text>
          <Text style={styles.subHeading}>Top places travelers love</Text>
        </View>
        {images?.Arwright && (
          <Image
            source={images.Arwright}
            resizeMode="contain"
            style={styles.arrowIcon}
          />
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.mediumSpacing,
    paddingVertical: spacing.mediumSpacing,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.mediumSpacing,
  },
  heading: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    color: colors.black,
  },
  subHeading: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
    color: colors.black,
    opacity: 0.7,
  },
  arrowIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  card: {
    marginRight: spacing.mediumSpacing,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: colors.white,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: moderateScale(160),
    height: moderateScale(150),
    marginBottom: moderateScale(10),
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
    color: colors.black,
    textAlign: 'center',
    paddingVertical: spacing.smallSpacing,
  },
});

export default PopularDestinations;
