import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import { spacing } from '../Utils/spacing';
import { moderateScale } from 'react-native-size-matters';


const RecommendedStays = ({ data }: { data: { name: string; image: string; price: string }[] }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Stays</Text>
      <View style={styles.cardContainer}>
        {data.map((stay, index) => (
          <ImageBackground
            key={index}
            source={{ uri: stay.image }}
            style={styles.card}
            resizeMode='cover'
            imageStyle={styles.imageStyle}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
              style={styles.gradient}
            >
              <Text style={styles.hotelName}>{stay.name}</Text>
              <Text style={styles.price}>{stay.price}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.mediumSpacing,
    paddingVertical: spacing.largeSpacing,
    backgroundColor: colors.white,
  },
  heading: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    color: colors.black,
    marginBottom: spacing.mediumSpacing,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: moderateScale(180),
    borderRadius: spacing.mediumSpacing,
    marginBottom: spacing.mediumSpacing,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: spacing.mediumSpacing,
    width:'100%',height:'100%'
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.mediumSpacing,
  },
  hotelName: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.white,
    fontSize: moderateScale(14),
  },
  price: {
    fontFamily: fonts.MontserratMedium,
    color: colors.white,
    fontSize: moderateScale(13),
  },
  button: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  buttonText: {
    color: colors.primary,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(12),
  },
});

export default RecommendedStays;
