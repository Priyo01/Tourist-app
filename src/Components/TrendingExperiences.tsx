import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import { spacing } from '../Utils/spacing';


const TrendingExperiences = ({ data }: { data: { title: string; image: string }[] }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Experiences</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.mediumSpacing,
    paddingVertical: spacing.largeSpacing,
  },
  heading: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    color: colors.black,
    marginBottom: spacing.mediumSpacing,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    width: moderateScale(150),
    borderRadius: spacing.mediumSpacing,
    overflow: 'hidden',
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginRight: spacing.mediumSpacing,
    marginBottom:spacing.smallSpacing
  },
  image: {
    width: '100%',
    height: moderateScale(120),
    borderTopLeftRadius: spacing.mediumSpacing,
    borderTopRightRadius: spacing.mediumSpacing,
  },
  title: {
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    padding: spacing.smallSpacing,
  
  },
});

export default TrendingExperiences;
