import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../Utils/colors';
import { spacing } from '../../Utils/spacing';
import { heading, subheading, body, small, button } from '../../Utils/fontSizes';
import { fonts } from '../../../assets/fonts/fonts';
import Backheader from '../../Components/Backheader';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigations/types';
const { width } = Dimensions.get('window');

type Room = {
  id: string;
  name: string;
  image: string;
  price: number;
  capacity: number;
  facilities: string[];
  rating?: number;
  taxes?: number;
  bedType?: string;
  description: string;
  reviews: number;
  cancellationPolicy: string;
};

const roomsData: Room[] = [
  {
    id: '1',
    name: 'Deluxe King Room',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    price: 4500,
    capacity: 2,
    bedType: 'King Bed',
    facilities: ['Free WiFi', 'Air Conditioning', 'Breakfast Included'],
    rating: 4.7,
    taxes: 500,
    description: 'Spacious room with modern amenities and city view.',
    reviews: 128,
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
  },
  {
    id: '2',
    name: 'Family Suite',
    image:
      'https://images.unsplash.com/photo-1600585154154-1fe20d49a9a2?auto=format&fit=crop&w=800&q=80',
    price: 7500,
    capacity: 4,
    bedType: '2 Queen Beds',
    facilities: ['Kitchenette', 'Balcony', 'Free Parking'],
    rating: 4.8,
    taxes: 750,
    description: 'Perfect for families with separate living area and kitchen.',
    reviews: 95,
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
  },
  {
    id: '3',
    name: 'Standard Room',
    image:
      'https://images.unsplash.com/photo-1600585154312-6d43f9a4a46d?auto=format&fit=crop&w=800&q=80',
    price: 3200,
    capacity: 2,
    bedType: 'Queen Bed',
    facilities: ['TV', 'WiFi', 'Private Bathroom'],
    rating: 4.5,
    taxes: 400,
    description:
      'Comfortable room with essential amenities for a pleasant stay.',
    reviews: 67,
    cancellationPolicy: 'Free cancellation up to 12 hours before check-in',
  },
];

const RoomListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isDarkMode = useColorScheme() === 'dark';

  const renderRoom = ({ item }: { item: Room }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.roomName}>{item.name}</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {item.rating.toFixed(1)} ({item.reviews})
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.roomCapacity}>
          {item.capacity} {item.capacity > 1 ? 'Guests' : 'Guest'} •{' '}
          {item.bedType}
        </Text>

        <Text style={styles.roomDescription}>{item.description}</Text>

        <View style={styles.facilitiesContainer}>
          {item.facilities.slice(0, 3).map((f, index) => (
            <View key={index} style={styles.facility}>
              <Text style={styles.facilityText}>{f}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.cancellationText}>{item.cancellationPolicy}</Text>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{item.price}</Text>
            <Text style={styles.perNight}>/ night</Text>
          </View>
          {item.taxes && (
            <Text style={styles.taxesText}>+ ₹{item.taxes} taxes</Text>
          )}
        </View>

        <TouchableOpacity
        onPress={()=>
                        navigation.navigate('ExploreRoomsDetail')


        }
        style={styles.bookButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.gradientButton}
          >
            <Text style={styles.bookText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Backheader isSearch backIconpress={() => navigation.goBack()} />
      <FlatList
        data={roomsData}
        keyExtractor={item => item.id}
        renderItem={renderRoom}
        showsVerticalScrollIndicator={false}
   
      />
    </SafeAreaView>
  );
};

export default RoomListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.border,
  },
  card: {
    backgroundColor: colors.white,
    margin: spacing.mediumSpacing,
    borderRadius: spacing.largeSpacing,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: width * 0.45,
  },
  cardContent: {
    padding: spacing.cardVertical,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomName: {
    fontSize: heading,
    fontFamily: fonts.MontserratSemiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  roomCapacity: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginTop: spacing.smallSpacing / 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.smallSpacing / 2,
  },
  ratingText: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginLeft: spacing.smallSpacing / 2,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.smallSpacing,
  },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.mediumSpacing,
    marginVertical: spacing.smallSpacing,
  },
  facilityText: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginLeft: spacing.smallSpacing / 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.mediumSpacing,
  },
  priceText: {
    fontSize: subheading,
    fontFamily: fonts.MontserratBold,
    color: colors.primary,
  },
  perNight: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginLeft: spacing.smallSpacing / 2,
  },
  roomDescription: {
    fontSize: body,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
    marginTop: spacing.smallSpacing,
    lineHeight: body * 1.4,
  },
  cancellationText: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.success,
    marginTop: spacing.smallSpacing,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.mediumSpacing,
  },
  taxesText: {
    fontSize: small,
    fontFamily: fonts.MontserratRegular,
    color: colors.textSecondary,
  },
  bookButton: {
    marginTop: spacing.mediumSpacing,
  },
  gradientButton: {
    borderRadius: spacing.extraLargeSpacing,
    paddingVertical: spacing.mediumSpacing,
    alignItems: 'center',
  },
  bookText: {
    color: colors.white,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: button,
  },
});
