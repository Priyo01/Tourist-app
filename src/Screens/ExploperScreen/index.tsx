import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Backheader from '../../Components/Backheader';
import { colors } from '../../Utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import ProductCard from '../../Components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const ExploperScreen = () => {
  const navigation = useNavigation()

  const exploreData = [
    { rating: 4.5, name: "The Gaia Hotel Bandung", price: "$ 80/night" },
    { rating: 3.8, name: "Grand Palace Hotel", price: "$ 120/night" },
    { rating: 5.0, name: "Luxury Resort Jaipur", price: "$ 200/night" },
    { rating: 4.2, name: "Mountain View Resort", price: "$ 150/night" },
    { rating: 4.7, name: "City Center Inn", price: "$ 90/night" },
    { rating: 3.5, name: "Budget Stay Hotel", price: "$ 60/night" },
    { rating: 4.9, name: "Oceanfront Paradise", price: "$ 250/night" },
    { rating: 4.0, name: "Historic Downtown Hotel", price: "$ 110/night" },
    { rating: 4.3, name: "Riverside Lodge", price: "$ 130/night" },
    { rating: 4.8, name: "Skyline Tower Hotel", price: "$ 180/night" },
    { rating: 3.9, name: "Garden Villa", price: "$ 95/night" },
    { rating: 4.6, name: "Desert Oasis Resort", price: "$ 220/night" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Backheader
        isSearch={false}
        backheadertitle='Explore Hotels'
        backIconpress={()=>navigation.goBack()}
      />

      <FlatList
        data={exploreData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
     
        renderItem={({ item }) => (
          <ProductCard
            rating={item.rating}
            name={item.name}
            price={item.price}
            cardStyle={styles.productCard}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default ExploperScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  scrollContainer: {
    paddingHorizontal: spacing.mediumSpacing,
    paddingVertical: spacing.mediumSpacing,
  },
  sectionTitle: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    color: colors.black,
    marginBottom: spacing.mediumSpacing,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.mediumSpacing,
  },
  productCard: {
    width: '48%',
  },
})
