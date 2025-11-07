import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../Utils/colors';
import { fonts } from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Backheader from '../../Components/Backheader';
import { useNavigation } from '@react-navigation/native';
import { heading } from '../../Utils/fontSizes';

const { width } = Dimensions.get('window');

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
  images.Product,
  images.Product,
  images.Product,
];

const groupIntoRows = (data: any[]) => {
  const rows = [];
  for (let i = 0; i < data.length; i += 5) {
    rows.push(data.slice(i, i + 5));
  }
  return rows;
};

const GalleryDetailsScreen: React.FC = () => {
  const rows = groupIntoRows(imageGallery);

  const renderRow = ({ item, index }: { item: any[]; index: number }) => {
    const isEvenRow = index % 2 === 0;
    const bigImage = item[0];
    const smallImages = item.slice(1, 5);

    const bigImageWidth = width * 0.55;
    const bigImageHeight = moderateScale(200);
    const smallImageWidth = (width * 0.42 - moderateScale(4)) / 2;
    const smallImageHeight = bigImageHeight / 2;

    return (
      <View style={styles.row}>
        {isEvenRow ? (
          <>
            <Image
              source={bigImage}
              style={[
                styles.bigImage,
                { width: bigImageWidth, height: bigImageHeight },
              ]}
            />

            <View style={styles.smallGrid}>
              <View style={styles.smallRow}>
                {smallImages.slice(0, 2).map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={{
                      width: smallImageWidth,
                      height: smallImageHeight,
                      borderRadius: moderateScale(10),
                      marginRight: idx === 0 ? moderateScale(4) : 0,
                    }}
                  />
                ))}
              </View>

              <View style={[styles.smallRow, { marginTop: moderateScale(4) }]}>
                {smallImages.slice(2, 4).map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={{
                      width: smallImageWidth,
                      height: smallImageHeight,
                      borderRadius: moderateScale(10),
                      marginRight: idx === 0 ? moderateScale(4) : 0,
                    }}
                  />
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.smallGrid}>
              <View style={styles.smallRow}>
                {smallImages.slice(0, 2).map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={{
                      width: smallImageWidth,
                      height: smallImageHeight,
                      borderRadius: moderateScale(10),
                      marginRight: idx === 0 ? moderateScale(4) : 0,
                    }}
                  />
                ))}
              </View>

              <View style={[styles.smallRow, { marginTop: moderateScale(4) }]}>
                {smallImages.slice(2, 4).map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={{
                      width: smallImageWidth,
                      height: smallImageHeight,
                      borderRadius: moderateScale(10),
                      marginRight: idx === 0 ? moderateScale(4) : 0,
                    }}
                  />
                ))}
              </View>
            </View>

            <View style={styles.bigImageContainer}>
              <Image
                source={bigImage}
                style={[
                  styles.bigImage,
                  { width: bigImageWidth, height: bigImageHeight },
                ]}
              />
            </View>
          </>
        )}
      </View>
    );
  };

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Backheader 
      backIconpress={()=>navigation.goBack()}
      />

      <FlatList
        data={rows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20),
          paddingHorizontal: moderateScale(16),
        }}
      />
    </SafeAreaView>
  );
};

export default GalleryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: heading,
    color: colors.black,
    marginTop: moderateScale(16),
    marginBottom: moderateScale(12),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: moderateScale(8),
    justifyContent: 'center',
  },
  bigImage: {
    borderRadius: moderateScale(10),
  },
  smallGrid: {
    marginLeft: moderateScale(4),
  },
  smallRow: {
    flexDirection: 'row',
  },
  bigImageContainer: {
    marginLeft: moderateScale(4),
  },
});
