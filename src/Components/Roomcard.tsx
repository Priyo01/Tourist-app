import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../assets/fonts/fonts';
import { colors } from '../Utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { body, small, heading, subheading } from '../Utils/fontSizes';

const RoomCard = ({
  image,
  name,
  details,
  price,
  onCheckAvailability,
}: {
  image: any;
  name: string;
  details?: string;
  price?: string;
  onCheckAvailability?: () => void;
}) => {
  if (name === 'View All') {
    return (
      <TouchableOpacity
        style={styles.viewAllCard}
        onPress={onCheckAvailability}
      >
        <View style={styles.viewAllContainer}>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.roomCard}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.roomImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'transparent']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.roomTitle}>{name}</Text>
        </View>
      </View>

      <View style={styles.roomInfo}>
        {details && <Text style={styles.roomDetails}>{details}</Text>}
      </View>

      <View style={styles.priceAndButtonRow}>
        {price && (
          <View style={styles.priceSection}>
            <Text style={styles.priceText}>{price}</Text>
            <Text style={styles.priceLabel}>/ night</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.checkAvailabilityBtn}
          onPress={onCheckAvailability}
        >
          <Text style={styles.checkAvailabilityText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 10,
    backgroundColor: 'black',
    marginRight: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    paddingBottom: moderateScale(16),
  },

  imageContainer: {
    width: '100%',
    height: '55%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },

  roomImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },

  roomTitle: {
    color: '#fff',
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  roomInfo: {
    padding: moderateScale(10),
    paddingBottom: 0,
    justifyContent: 'space-between',
    flex: 1,
  },

  roomDetails: {
    fontSize: small,
    fontFamily: fonts.MontserratMedium,
    color: colors.white,
  },

  bookNowBtn: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookNowTouchable: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 2,
  },

  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  priceText: {
    fontSize: heading,
    fontFamily: fonts.MontserratBold,
    color: colors.white,
  },

  priceLabel: {
    fontSize: small,
    fontFamily: fonts.MontserratMedium,
    color: colors.white,
    marginLeft: moderateScale(4),
  },

  checkAvailabilityBtn: {
    width: moderateScale(80),
    height: moderateScale(40),
    backgroundColor: colors.buttonBlue,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkAvailabilityText: {
    color: '#fff',
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
  },

  priceAndButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
  },
  viewAllContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.black,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: subheading,
  },
  viewAllCard: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: 10,
    backgroundColor: colors.white,
    marginRight: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    paddingBottom: moderateScale(16),
    borderWidth: 1,
  },
});
