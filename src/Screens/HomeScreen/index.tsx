import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigations/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../Utils/colors';
import images from '../../../assets/images/images';
import { moderateScale } from 'react-native-size-matters';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import ProductCard from '../../Components/ProductCard';
import PopularDestinations from '../../Components/PopularDestinations';
import TrendingExperiences from '../../Components/TrendingExperiences';
import RecommendedStays from '../../Components/RecommendedStays';
import TopTravelOffers from '../../Components/TopTravelOffers';
import { homeScreenData } from '../../Utils/homeScreenData';
import { getCurrentLocation, requestLocationPermission, checkLocationServicesEnabled } from '../../Utils/PermissionManager';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const HomeScreen = ({}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const [homeData, setHomeData] = useState<any>(homeScreenData);

  useEffect(() => {
    const captureLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const servicesEnabled = await checkLocationServicesEnabled();
        if (servicesEnabled) {
          try {
            const location = await getCurrentLocation();
            console.log('Current location:', location);
          } catch (error) {
            console.warn('Failed to get location:', error instanceof Error ? error.message : String(error));
          }
        } else {
          console.warn('Location services are disabled. Please enable location services in your device settings.');
        }
      } else {
        console.warn('Location permission denied');
      }
    };

    captureLocation();
  }, []);

  const tabs = [
    { image: images.Hotel, text: 'Hotel' },
    { image: images.Flights, text: 'Flights' },
    { image: images.Gallery, text: 'Sports' },
    { image: images.bag, text: 'Car Rental' },
    { image: images.meet, text: 'Activities' },
    { image: images.flag, text: 'Tours' },
    { image: images.card, text: 'Packages' },
  ];

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={{ height: height * 0.45 + insets.top, overflow: 'hidden' }}>
          <ImageBackground
            source={images.Banner}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <View style={{ paddingHorizontal: spacing.mediumSpacing, paddingTop: insets.top }}>
              <Pressable
                style={styles.searchbar}
                onPress={() => handleSearchPress()}
              >
                <Image source={images.SearchBlack} style={styles.Topicon} />
                <Text style={styles.toptext}>Where are you going?</Text>
                <Image source={images.Filter} style={styles.Topicon} />
              </Pressable>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.TopContainer}
              >
                {tabs.map((tab, index) => (
                  <TouchableOpacity key={index} style={styles.Toptab}>
                    <Image
                      source={tab.image}
                      resizeMode="contain"
                      style={styles.tabImage}
                    />
                    <Text style={[styles.toptext, { color: colors.white }]}>
                      {tab.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.centerOverlay}>
                <Text style={styles.centerText}>No idea where to go?</Text>
                <TouchableOpacity style={styles.centerButton}>
                  <Text style={styles.buttonText}>Explore Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.dataContainerWrapper}>
          <View style={styles.dataContainer}>
            <View style={styles.Headingrow}>
              <View>
                <Text style={styles.HeadingHead}>Explore Hotels</Text>
                <Text style={styles.secodaryhead}>
                  Nearest staycation you can live
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExploperScreen')}
              >
                <Image
                  source={images.Arwright}
                  resizeMode="contain"
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                {
                  rating: 4.5,
                  name: 'The Gaia Hotel Bandung',
                  price: '$ 80/night',
                },
                {
                  rating: 3.8,
                  name: 'Grand Palace Hotel',
                  price: '$ 120/night',
                },
                {
                  rating: 5.0,
                  name: 'Luxury Resort Jaipur',
                  price: '$ 200/night',
                },
                {
                  rating: 4.2,
                  name: 'Mountain View Resort',
                  price: '$ 150/night',
                },
                { rating: 4.7, name: 'City Center Inn', price: '$ 90/night' },
                { rating: 3.5, name: 'Budget Stay Hotel', price: '$ 60/night' },
                {
                  rating: 4.9,
                  name: 'Oceanfront Paradise',
                  price: '$ 250/night',
                },
                {
                  rating: 4.0,
                  name: 'Historic Downtown Hotel',
                  price: '$ 110/night',
                },
              ].map((item, index) => (
                <ProductCard
                  key={index}
                  rating={item.rating}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <PopularDestinations data={homeData.popularDestinations} />
        <TopTravelOffers data={homeData.topTravelOffers} />
        <TrendingExperiences data={homeData.trendingExperiences} />
        <RecommendedStays data={homeData.recommendedStays} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    flex: 1,
    width: '100%',
  },
  searchbar: {
    height: moderateScale(50),
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: spacing.largeSpacing,
  },
  Topicon: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  toptext: {
    color: colors.black,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(15),
  },
  Toptab: {
    paddingHorizontal: spacing.mediumSpacing,
    height: moderateScale(45),
    backgroundColor: colors.black,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: spacing.mediumSpacing,
    marginRight: spacing.mediumSpacing,
  },
  TopContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.largeSpacing,
  },
  tabImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: spacing.smallSpacing,
  },
  centerOverlay: {
    width: '100%',
    marginTop: spacing.mediumSpacing,
  },
  centerText: {
    color: colors.white,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginBottom: spacing.mediumSpacing,
  },
  centerButton: {
    width: '45%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(45),
    borderRadius: spacing.mediumSpacing,
  },
  buttonText: {
    color: colors.black,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },

  dataContainerWrapper: {
    marginTop: -spacing.largeSpacing,
  },
  dataContainer: {
    paddingHorizontal: spacing.mediumSpacing,
    paddingVertical: spacing.mediumSpacing,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    backgroundColor: colors.white,
  },
  Headingrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  HeadingHead: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
  },
  secodaryhead: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
  },
});

export default HomeScreen;
