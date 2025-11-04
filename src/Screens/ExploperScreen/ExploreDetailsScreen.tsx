import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../Utils/colors';
import images from '../../../assets/images/images';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/types';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../Utils/PermissionManager';
import RoomCard from '../../Components/Roomcard';
import BottomButton from '../../Components/BottomButton';

const facilities = [
  { image: images.Ac, title: 'AC' },
  { image: images.Parking, title: 'Parking' },
  { image: images.Wifi, title: 'Wifi' },
  { image: images.Food, title: 'Restaurant' },
  { image: images.Swimming, title: 'Swimming Pool' },
  { image: images.Hours, title: '24 Hour front desk' },
];

const roomData = [
  {
    image: images.Product,
    name: 'Deluxe Room',
    facilities: ['AC', 'Wifi', 'Parking'],
    details: '1 king bed ∙ 1 couch ∙ 2 suite bathroom',
    price: '$120',
  },
  {
    image: images.Product,
    name: 'Suite Room',
    facilities: ['AC', 'Wifi', 'Swimming Pool', 'Restaurant'],
    details: '2 king beds ∙ 1 sofa bed ∙ 3 suite bathrooms',
    price: '$200',
  },
  {
    image: images.Product,
    name: 'Standard Room',
    facilities: ['AC', 'Wifi'],
    details: '1 queen bed ∙ 1 bathroom',
    price: '$80',
  },
  {
    image: images.Product,
    name: 'Family Room',
    facilities: ['AC', 'Wifi', 'Parking', 'Swimming Pool'],
    details: '2 queen beds ∙ 2 single beds ∙ 2 bathrooms',
    price: '$150',
  },
  {
    image: images.Product,
    name: 'View All',
    facilities: ['AC', 'Wifi', 'Parking', 'Swimming Pool'],
    details: '2 queen beds ∙ 2 single beds ∙ 2 bathrooms',
    price: '$150',
  },
];

const imageGallery = [
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
  images.Product,
];

const ExploreDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const firstRowImages = imageGallery.slice(0, 5);
  useEffect(() => {
    const captureLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          console.warn('Location permission denied');
          return;
        }
        const location = await getCurrentLocation();
        console.log('Current locationExplore:', location);
        setCurrentLocation(location);
        setHasLocationPermission(true);
      } catch (error) {
        console.warn('Failed to get location:', error);
      }
    };

    captureLocation();
  }, []);

  console.log(currentLocation, 'locatin in state');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.fixedBackButton}
      >
        <Image
          source={images.Arwback}
          resizeMode="contain"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          source={images.Product}
          style={[styles.imageBackground, { height: moderateScale(300) }]}
        >
          <SafeAreaView style={styles.safeArea}></SafeAreaView>
        </ImageBackground>

        <View style={{ paddingHorizontal: spacing.mediumSpacing }}>
          <View
            style={{
              marginTop: spacing.largeSpacing,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={styles.HeadingTitle}>The Gaia Hotel Bandung</Text>
            <Text style={styles.HeadingSubTitle}>
              Lembang, Indonesia ∙ 2.7km
            </Text>
          </View>

          <View style={styles.DescContainer}>
            <Text style={styles.DescTitle}>Description</Text>
            <Text numberOfLines={4} style={styles.description}>
              There’s a spa, a rooftop garden and an outdoor pool, plus a
              24-hour gym, a music studio and a craft area for kids. Other
              amenities include Asian fusion and Japanese restaurants.
            </Text>

            <TouchableOpacity style={styles.ReadmoreButton}>
              <Text style={styles.DescTitle}>Read More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.DescContainer}>
            <Text style={styles.DescTitle}>Facilities</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {facilities.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 80,
                      height: moderateScale(80),
                      marginRight: moderateScale(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={item?.image}
                      style={{
                        width: moderateScale(30),
                        height: moderateScale(30),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: fonts.MontserratMedium,
                        textAlign: 'center',
                        fontSize: moderateScale(12),
                        marginTop: spacing.smallSpacing,
                      }}
                    >
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View
            style={{
              marginVertical: spacing.mediumSpacing,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={styles.DescTitle}>Photos shared by Guests</Text>
            <View style={styles.gridRow}>
              <Image source={firstRowImages[0]} style={styles.bigImage} />

              <View style={styles.smallGrid}>
                <View style={styles.smallRow}>
                  {firstRowImages.slice(1, 3).map((img, i) => (
                    <Image key={i} source={img} style={styles.smallImage} />
                  ))}
                </View>

                <View style={styles.smallRow}>
                  {firstRowImages.slice(3, 5).map((img, i) => {
                    const isLast = i === 1;
                    return (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={0.8}
                        onPress={() =>
                          isLast && navigation.navigate('GalleryDetailsScreen')
                        }
                      >
                        <Image source={img} style={styles.smallImage} />
                        {isLast && (
                          <View style={styles.overlay}>
                            <Text style={styles.overlayText}>Read More</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: spacing.mediumSpacing,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              height: moderateScale(250),
            }}
          >
            <Text style={styles.DescTitle}>Location</Text>
            {hasLocationPermission && currentLocation ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: (currentLocation.latitude + 26.9124) / 2,
                  longitude: (currentLocation.longitude + 75.7873) / 2,
                  latitudeDelta:
                    Math.abs(currentLocation.latitude - 26.9124) * 1.5,
                  longitudeDelta:
                    Math.abs(currentLocation.longitude - 75.7873) * 1.5,
                }}
                onPress={() => {
                  const destinationLat = 26.8969;
                  const destinationLng = 75.8081;
                  const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
                  Linking.openURL(url);
                }}
                scrollEnabled={true}
                zoomEnabled={true}
              >
                <Marker
                  coordinate={currentLocation}
                  title="Your Location"
                  description="Current location"
                />
                <Marker
                  coordinate={{ latitude: 26.8969, longitude: 75.8081 }}
                  title="City Palace"
                  description="Jaipur, India"
                  pinColor="blue"
                />
              </MapView>
            ) : (
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={async () => {
                  const granted = await requestLocationPermission();
                  if (granted) {
                    try {
                      const location = await getCurrentLocation();
                      setCurrentLocation(location);
                      setHasLocationPermission(true);
                    } catch (error) {
                      Alert.alert(
                        'Error',
                        'Unable to get location. Please try again.',
                      );
                    }
                  } else {
                    Alert.alert(
                      'Permission Denied',
                      'Location permission is required to view the map.',
                    );
                  }
                }}
              >
                <Text style={styles.permissionButtonText}>
                  Enable Location to View Map
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              marginVertical: spacing.mediumSpacing,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={styles.DescTitle}>Rooms</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.roomsScrollView}
            >
              {roomData.map((room, index) => {
                return (
                  <RoomCard
                    key={index}
                    image={room.image}
                    name={room.name}
                    details={room.details}
                    price={room.price}
                    onCheckAvailability={() => {
                      if (index === roomData.length - 1) {
                        navigation.navigate('RoomsList');
                      } else {
                        navigation.navigate('ExploreRoomsDetail');
                      }
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BottomButton
        price="$120 / Night"
        buttonText="Select Rooms"
        onButtonPress={() => {
          navigation.navigate('RoomsList');
        }}
      />
    </View>
  );
};

export default ExploreDetailsScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: width / 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  fixedBackButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 50,
    height: 50,
    borderRadius: width / 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  HeadingTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(18),
  },
  HeadingSubTitle: {
    fontFamily: fonts.MontserratMedium,
    color: colors.placeholder,
    fontSize: moderateScale(13),
    marginBottom: spacing.mediumSpacing,
  },
  DescTitle: {
    color: colors.black,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(15),
  },
  DescContainer: {
    marginTop: spacing.mediumSpacing,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  description: {
    fontFamily: fonts.MontserratMedium,
    color: colors.black,
    fontSize: moderateScale(12),
    textAlign: 'justify',
    lineHeight: 18,
  },
  ReadmoreButton: {
    width: '100%',
    height: moderateScale(50),
    borderWidth: 0.7,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    marginVertical: spacing.largeSpacing,
  },

  gridRow: {
    flexDirection: 'row',
    marginTop: spacing.largeSpacing,
    marginBottom: spacing.largeSpacing,
  },
  bigImage: {
    width: width * 0.53,
    height: moderateScale(165),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(8),
  },
  smallGrid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  smallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallImage: {
    width: (width * 0.39 - spacing.smallSpacing * 2) / 2,
    height: moderateScale(78),
    borderRadius: moderateScale(8),
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  overlayText: {
    color: colors.white,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(10),
  },
  map: {
    height: moderateScale(200),
    marginTop: spacing.mediumSpacing,
    borderRadius: moderateScale(8),
  },
  permissionButton: {
    height: moderateScale(50),
    backgroundColor: colors.primary || '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    marginTop: spacing.mediumSpacing,
  },
  permissionButtonText: {
    color: colors.white,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  roomCard: {
    width: moderateScale(150),
    marginRight: moderateScale(15),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: moderateScale(10),
  },
  roomImage: {
    width: '100%',
    height: moderateScale(100),
    borderRadius: moderateScale(8),
  },
  roomName: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
    color: colors.black,
    marginTop: moderateScale(8),
  },
  roomFacilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(5),
  },
  facilityText: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(10),
    color: colors.placeholder,
    marginRight: moderateScale(5),
    marginBottom: moderateScale(2),
  },
  roomsScrollView: {
    marginVertical: spacing.mediumSpacing,
  },
  AvailabilityButton: {
    width: '60%',
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBlue,
    borderRadius: moderateScale(8),
    marginRight: spacing.largeSpacing,
  },
});
