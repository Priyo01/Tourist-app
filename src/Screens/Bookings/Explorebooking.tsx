import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backheader from '../../Components/Backheader';
import { colors } from '../../Utils/colors';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import { moderateScale } from 'react-native-size-matters';
import BottomButton from '../../Components/BottomButton';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/types';

const Explorebooking = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <Backheader backheadertitle="Confirm & Pay" 
      backIconpress={()=>navigation.navigate('ExploreDetailsScreen')}
      />
      <ScrollView>
        <View style={styles.hotelCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
              }}
              style={styles.hotelImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.hotelName}>The Gaia Hotel Bandung</Text>
            <Text style={styles.roomType}>Deluxe King</Text>
            <Text style={styles.amenities}>
              {' '}
              1 king bed ∙ 1 couch ∙{'\n'}2 suite bathroom
            </Text>
            <Text style={styles.freeServices}>
              1 Free Wifi {'\n'} 2 Free Breakfast
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <View style={{ width: '60%' }}>
              <Text style={styles.detailLabel}>Dates</Text>
              <Text style={styles.detailValue}>11 December - 16 December</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Dates</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRowMargin}>
            <View style={{ width: '60%' }}>
              <Text style={styles.detailLabel}>Guests</Text>
              <Text style={styles.detailValue}>2 Adults</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Guests</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.detailRow}>
            <View style={{ width: '60%' }}>
              <Text style={styles.detailLabel}>Deluxe King x 5 nights</Text>
              <Text style={styles.detailValue}>11 December - 16 December</Text>
            </View>
            <View style={styles.priceValue}>
              <Text style={styles.priceValueText}>$400</Text>
            </View>
          </View>
          <View style={styles.priceRow}>
            <View style={{ width: '60%' }}>
              <Text style={styles.detailLabel}>Service fee</Text>
            </View>
            <View style={styles.priceValue}>
              <Text style={styles.priceValueText}>$5</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <View style={{ width: '60%' }}>
              <Text style={styles.detailLabel}>Total</Text>
            </View>
            <View style={styles.priceValue}>
              <Text style={styles.priceValueText}>$405</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <BottomButton price="Total- $405" buttonText={'Book Now'} />
      </View>
    </SafeAreaView>
  );
}; 

export default Explorebooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  hotelCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.smallSpacing,
    height: moderateScale(170),
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: '40%',
  },
  hotelImage: {
    width: '100%',
    height: moderateScale(130),
    borderRadius: moderateScale(10),
  },
  detailsContainer: {
    width: '60%',
    paddingHorizontal: spacing.mediumSpacing,
  },
  hotelName: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(15),
  },
  roomType: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
    color: colors.black,
  },
  amenities: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
    color: colors.placeholder,
  },
  freeServices: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
    color: colors.buttonBlue,
  },
  section: {
    marginHorizontal: spacing.mediumSpacing,
    borderBlockColor: colors.border,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(17),
    marginTop: spacing.mediumSpacing,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(50),
  },
  detailLabel: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(15),
  },
  detailValue: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(12),
    color: 'grey',
  },
  editButton: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 0.5,
    height: moderateScale(40),
    borderRadius: moderateScale(5),
  },
  editButtonText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(13),
  },
  detailRowMargin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(50),
    marginVertical: spacing.smallSpacing,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.smallSpacing,
  },
  priceValue: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(40),
    borderRadius: moderateScale(5),
  },
  priceValueText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(13),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.mediumSpacing,
  },
  paymentSection: {
    marginBottom: spacing.mediumSpacing,
  },
  paymentTitleContainer: {
    width: '100%',
    marginVertical: spacing.largeSpacing,
    marginHorizontal: spacing.mediumSpacing,
  },
  paymentTitle: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(15),
  },
  addPaymentButton: {
    width: '60%',
    height: moderateScale(45),
    paddingHorizontal: spacing.mediumSpacing,
    borderWidth: moderateScale(0.5),
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(8),
  },
  addPaymentText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  bottomContainer: {
    height: moderateScale(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },

});
