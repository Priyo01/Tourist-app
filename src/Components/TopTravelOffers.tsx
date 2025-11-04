import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../assets/fonts/fonts';
import { colors } from '../Utils/colors';
import { spacing } from '../Utils/spacing';


const TopTravelOffers = ({ data }: { data: { title: string; image: string; price: string; discount: string }[] }) => {



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Travel Offers</Text>
      <View style={styles.cardContainer}>
        {data.slice(0, 3).map((offer, index) => (
          <ImageBackground
            key={index}
            source={{ uri: offer.image }}
            style={styles.card}
            imageStyle={styles.imageStyle}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.gradient}
            >
              <View style={styles.textContainer}>
                <Text style={styles.discount}>{offer.discount}</Text>
                <Text style={styles.title}>{offer.title}</Text>
                <Text style={styles.price}>{offer.price}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
              </View>
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
    paddingVertical: spacing.mediumSpacing,
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
    height: moderateScale(170),
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
  textContainer: {
    gap: 4,
  },
  discount: {
    fontFamily: fonts.MontserratBold,
    color: colors.white,
    fontSize: moderateScale(12),
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  title: {
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
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  btnText: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.primary,
    fontSize: moderateScale(12),
  },
});

export default TopTravelOffers;
