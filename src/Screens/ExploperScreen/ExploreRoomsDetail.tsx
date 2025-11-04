import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import { spacing } from '../../Utils/spacing';
import { colors } from '../../Utils/colors';
import images from '../../../assets/images/images';
import { fonts } from '../../../assets/fonts/fonts';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/types';

const { width } = Dimensions.get('window');

const ExploreRoomsDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const roomImages = [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    },
    {
      url: 'https://thearchitectsdiary.com/wp-content/uploads/2024/08/Bedroom-Living-Room.jpg',
    },
    {
      url: 'https://altairkolkata.com/wp-content/uploads/2023/03/Deluxe-city-view-1.webp',
    },
    {
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    },
  ];

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
      <Carousel
        width={width}
        height={280}
        data={roomImages}
        autoPlay
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              setActiveIndex(index);
            }}
          >
            <Image source={{ uri: item.url }} style={styles.carouselImage} />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          marginTop: spacing.mediumSpacing,
          marginHorizontal: spacing.smallSpacing,
        }}
      >
        <FlatList
          data={roomImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setActiveIndex(index);
              }}
              style={styles.thumbnailWrapper}
            >
              <Image source={{ uri: item.url }} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Deluxe Sea View Room</Text>
        <Text style={styles.price}>₹4,999 / night</Text>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilityBox}>
          <View style={styles.facilityItem}>
            <Image source={images.Ac} style={styles.facilityIcon} />
            <Text style={styles.facilityText}>King Bed</Text>
          </View>
          <View style={styles.facilityItem}>
            <Image source={images.Swimming} style={styles.facilityIcon} />
            <Text style={styles.facilityText}>Sea View</Text>
          </View>
          <View style={styles.facilityItem}>
            <Image source={images.Wifi} style={styles.facilityIcon} />
            <Text style={styles.facilityText}>Free Wi-Fi</Text>
          </View>
          <View style={styles.facilityItem}>
            <Image source={images.Food} style={styles.facilityIcon} />
            <Text style={styles.facilityText}>Breakfast Included</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About this room</Text>
        <Text style={styles.description}>
          Enjoy stunning sea views from this luxurious deluxe room featuring a
          king-sized bed, elegant decor, and modern amenities to make your stay
          memorable.
        </Text>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('CheckAvailabilityScreen')}
        >
          <Text style={styles.bookButtonText}>Check Availability</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <ImageViewer
          imageUrls={roomImages}
          index={activeIndex}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default ExploreRoomsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: spacing.mediumSpacing,
  },
  carouselImage: {
    width: '100%',
    height: moderateScale(280),
    borderRadius: moderateScale(15),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: moderateScale(18),
    marginTop: spacing.mediumSpacing,
    color: colors.textPrimary,
    fontFamily: fonts.MontserratSemiBold,
  },
  price: {
    fontSize: moderateScale(16),
    color: colors.primary,
    marginVertical: spacing.smallSpacing,
    fontFamily: fonts.MontserratMedium,
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    marginTop: spacing.largeSpacing,
    color: colors.textPrimary,
    fontFamily: fonts.MontserratSemiBold,
  },
  facilityBox: {
    backgroundColor: colors.white,
    height:'auto',
    marginTop:spacing.smallSpacing,
    padding: spacing.mediumSpacing,
    borderRadius: moderateScale(10),
    gap: spacing.smallSpacing,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.smallSpacing,
  },
  facilityIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: colors.primary,
  },
  facilityText: {
    fontSize: moderateScale(12),
    color: colors.textSecondary,
    fontFamily: fonts.MontserratMedium,
  },
  thumbnailWrapper: {
    marginRight: spacing.smallSpacing,
  },
  thumbnail: {
    width: moderateScale(100),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  description: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    color: colors.textSecondary,

    marginBottom: spacing.largeSpacing,
    fontFamily: fonts.MontserratMedium,
    textAlign: 'justify',
  },
  bookButton: {
    backgroundColor: colors.buttonBlue,
    paddingVertical: spacing.mediumSpacing,
    paddingHorizontal: spacing.largeSpacing,
    borderRadius: moderateScale(25),
    alignItems: 'center',
    marginTop: spacing.largeSpacing,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratSemiBold,
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
});
