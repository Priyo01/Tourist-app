import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import images from '../../assets/images/images';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../assets/fonts/fonts';
import { colors } from '../Utils/colors';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigations/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { body, small } from '../Utils/fontSizes';

type ProductCardProps = {
  rating?: number;
  name?: string;
  price?: string;
  cardStyle?: any;
};

const ProductCard = ({ rating, name, price, cardStyle }: ProductCardProps) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleRating = (newRating: number) => {
    setCurrentRating(newRating);
    console.log('New rating:', newRating);
  };

  return (
    <Pressable
    onPress={()=>navigation.navigate('ExploreDetailsScreen')}
    style={[styles.cardContainer, cardStyle]}>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.white,
          position: 'absolute',
          top: 10,
          zIndex: 1,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images.Heart}
          resizeMode="contain"
          style={{ width: 25, height: 25, tintColor: colors.black }}
        />
      </TouchableOpacity>
      <Image
        source={images.Product}
        resizeMode="cover"
        style={styles.productImage}
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {name}
        </Text>

        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={moderateScale(18)}
            startingValue={currentRating}
            onFinishRating={handleRating}
            showRating={false}
            style={styles.rating}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.locationText}>Jaipur</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: moderateScale(200),
    width: moderateScale(220),
    marginRight: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    elevation: 5,
    marginBottom: moderateScale(10),
  },
  productImage: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
  },
  productTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    color: colors.black,
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginVertical: moderateScale(5),
  },
  rating: {
    alignSelf: 'flex-start',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: fonts.MontserratRegular,
    fontSize: small,
    color: colors.textMuted,
  },
  priceText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    color: colors.black,
  },
});
