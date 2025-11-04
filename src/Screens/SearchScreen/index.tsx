import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Backheader from '../../Components/Backheader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../Utils/colors';
import { useNavigation } from '@react-navigation/native';
import images from '../../../assets/images/images';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../../assets/fonts/fonts';
import { spacing } from '../../Utils/spacing';
import ProductCard from '../../Components/ProductCard';
import Modal from 'react-native-modal';
import SearchFilter from '../../Components/SearchFilter';
import Geolocation from '@react-native-community/geolocation';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../Utils/PermissionManager';
const recentSearches = ['Sihanouk ville, Cambodia', 'Sihanouk ville, Cambodia'];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState('Bandung');
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const handleRcntSrhRemove = (index: number) => {
    console.log('Remove recent search at index:', index);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log('✅ LOCATION SUCCESS:', pos.coords);
        // For simplicity, we'll set to Bandung since user is in Bandung
        // In a real app, you'd reverse geocode to get city name
        setCurrentLocationName('Bandung');
      },
      err => {
        console.log('❌ LOCATION ERROR:', err);
        setCurrentLocationName('Bandung'); // Default to Bandung
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const requestPermission = async () => {
    const granted = await requestLocationPermission();
    setHasLocationPermission(granted);
    if (granted) {
      getCurrentLocation();
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await checkLocationPermission();
      setHasLocationPermission(hasPermission);
      if (hasPermission) {
        getCurrentLocation();
      } else {
        // Default to Jaipur if no permission
        setCurrentLocationName('Jaipur');
      }
    };
    checkPermission();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Backheader
          isSearch={true}
          backIconpress={() => navigation.goBack()}
          setRightIconClick={setIsModalVisible}
          rightIconClick={isModalVisible}
        />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <Image
            source={images.Location}
            resizeMode="contain"
            style={styles.locationIcon}
          />
        </View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle}>Search place nearby</Text>
          <Text style={styles.locationSubtitle}>
            Current location - {currentLocationName}
          </Text>
        </View>
      </View>

      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentSearchTitle}>Recently Search</Text>
        {recentSearches.map((search, index) => (
          <View key={index} style={styles.recentSearchItem}>
            <View style={styles.recentSearchContent}>
              <Image source={images.WaitingClock} style={styles.clockIcon} />
              <Text style={styles.searchText}>{search}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRcntSrhRemove(index)}>
              <Image style={styles.crossIcon} source={images.Cross} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.recentSearchContainer}>
        <Text
          style={[
            styles.recentSearchTitle,
            { marginBottom: spacing.smallSpacing },
          ]}
        >
          Recommendation
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ProductCard
            rating={4.5}
            name="The Gaia Hotel Bandung"
            price="$ 80/night"
          />
          <ProductCard
            rating={4.5}
            name="The Gaia Hotel Bandung"
            price="$ 80/night"
          />
          <ProductCard
            rating={4.5}
            name="The Gaia Hotel Bandung"
            price="$ 80/night"
          />
          <ProductCard
            rating={4.5}
            name="The Gaia Hotel Bandung"
            price="$ 80/night"
          />
        </ScrollView>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.rightModal}
      >
        <View style={styles.modalContent}>
          <SearchFilter
            closeModal={closeModal}
            applyFilters={filters =>
              console.log('Selected categories:', filters)
            }
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    height: 90,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: spacing.smallSpacing,
  },
  locationIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  locationTextContainer: {
    width: '70%',
  },
  locationTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(17),
  },
  locationSubtitle: {
    fontSize: moderateScale(12),
  },
  recentSearchContainer: {
    marginTop: spacing.extraLargeSpacing,
    marginHorizontal: spacing.largeSpacing,
  },
  recentSearchTitle: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fonts.MontserratSemiBold,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.largeSpacing,
  },
  recentSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: spacing.mediumSpacing,
  },
  searchText: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(15),
  },
  crossIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  rightModal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    backgroundColor: colors.white,
    padding: spacing.mediumSpacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SearchScreen;
