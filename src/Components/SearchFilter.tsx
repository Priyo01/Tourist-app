import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/colors';
import { fonts } from '../../assets/fonts/fonts';
import { spacing } from '../Utils/spacing';

type FilterOption = {
  id: string;
  title: string;
  image: any;
};

type FilterScreenProps = {
  closeModal: () => void;
  applyFilters: (selected: string[]) => void;
};

const filterData: FilterOption[] = [
  {
    id: '1',
    title: 'Hospitals',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Temples',
    image: 'https://images.unsplash.com/photo-1603899122770-2e5d70bba8b4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Restaurants',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    title: 'Parks & Gardens',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    title: 'Museums',
    image: 'https://images.unsplash.com/photo-1581569197871-49cb4a6e1600?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '6',
    title: 'Shopping Malls',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '7',
    title: 'Cafes',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '8',
    title: 'Beaches',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '9',
    title: 'Hotels & Resorts',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '10',
    title: 'Historic Monuments',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '11',
    title: 'Night Clubs',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '12',
    title: 'Theaters & Cinemas',
    image: 'https://images.unsplash.com/photo-1489599735734-79b4d4c4b5c8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '13',
    title: 'Restricted Areas',
    image: 'https://images.unsplash.com/photo-1603046891749-2a930c7a3b12?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '14',
    title: 'Adventure Spots',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '15',
    title: 'Most Visited Places',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '16',
    title: 'Local Markets',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80',
  },
];

const SearchFilter = ({ closeModal, applyFilters }: FilterScreenProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return filterData;
    return filterData.filter(item => item.title.toLowerCase().includes(q));
  }, [search]);

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text style={styles.titleWhite}>Filter Categories</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeBtnWhite}>
            <Text style={styles.closeTextWhite}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitleWhite}>Tap to select one or more</Text>
        <View style={styles.headerBottomRow}>
          <TouchableOpacity
            onPress={() => {
              setSelected([]);
              setSearch('');
            }}
            style={styles.resetBtnWhite}
            accessibilityLabel="Reset filters"
          >
            <Text style={styles.resetTextWhite}>Reset</Text>
          </TouchableOpacity>
          <Text style={styles.selectedCountWhite}>
            {selected.length} selected
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search categories"
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          accessibilityLabel="Search categories"
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: moderateScale(120) }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <Pressable
              onPress={() => toggleSelection(item.id)}
              android_ripple={{ color: colors.blur }}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.selectedCard,
                pressed && styles.pressedCard,
              ]}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.imageBg}
                imageStyle={styles.imageStyle}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.6)']}
                  style={styles.gradient}
                >
                  <Text style={styles.cardText}>{item.title}</Text>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          );
        }}
      />

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => applyFilters(selected)}
        accessibilityLabel="Apply filters"
      >
        <Text style={styles.applyText}>
          Apply Filters {selected.length > 0 ? `(${selected.length})` : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.mediumSpacing,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.smallSpacing,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: colors.textMuted,
    fontFamily: fonts.MontserratRegular,
    marginTop: 4,
  },
  selectedCount: {
    fontSize: moderateScale(13),
    color: colors.textSecondary,
    marginRight: 8,
    fontFamily: fonts.MontserratMedium,
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: moderateScale(8),
    backgroundColor: colors.input,
    marginRight: 8,
  },
  resetText: {
    fontSize: moderateScale(13),
    color: colors.textPrimary,
    fontFamily: fonts.MontserratMedium,
  },
  searchRow: {
    backgroundColor: colors.input,
    borderRadius: moderateScale(7),
    paddingHorizontal: spacing.smallSpacing,
    marginBottom: spacing.smallSpacing,
    borderWidth: 0.4,
    borderColor: colors.black,
  },
  searchInput: {
    height: moderateScale(50),
    fontFamily: fonts.MontserratRegular,
    color: colors.textPrimary,
  },
  headerContainer: {
    borderRadius: moderateScale(14),
    padding: spacing.mediumSpacing,
    marginBottom: spacing.smallSpacing,
    flexDirection: 'column',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.smallSpacing,
  },
  headerTitleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtnWhite: {
    backgroundColor: colors.white,
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.smallSpacing,
    elevation: 3,
  },
  closeTextWhite: {
    fontSize: moderateScale(16),
    color: colors.primaryDark,
    fontFamily: fonts.MontserratSemiBold,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  titleWhite: {
    fontSize: moderateScale(18),
    fontFamily: fonts.MontserratSemiBold,
    color: colors.white,
  },
  subtitleWhite: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: fonts.MontserratRegular,
  },
  badge: {
    backgroundColor: colors.blur,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    marginRight: spacing.smallSpacing,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.MontserratSemiBold,
  },
  resetBtnWhite: {
    borderRadius: moderateScale(10),
    paddingHorizontal: spacing.smallSpacing,
    paddingVertical: 6,
    backgroundColor: colors.blur,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetTextWhite: {
    color: colors.white,
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(13),
  },
  selectedCountWhite: {
    color: colors.white,
    fontFamily: fonts.MontserratMedium,
    marginLeft: spacing.smallSpacing,
  },
  title: {
    fontSize: moderateScale(22),
    fontFamily: fonts.MontserratSemiBold,
    color: colors.black,
  },
  closeBtn: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  closeText: {
    fontSize: moderateScale(18),
    color: colors.black,
  },
  card: {
    width: '48%',
    height: moderateScale(160),
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    marginBottom: spacing.mediumSpacing,
    elevation: 4,
  },
  pressedCard: {
    transform: [{ scale: 0.995 }],
    opacity: 0.98,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  imageBg: {
    flex: 1,
  },
  imageStyle: {
    borderRadius: moderateScale(14),
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.smallSpacing,
  },
  cardText: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.white,
    fontSize: moderateScale(14),
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: colors.white,
    fontSize: moderateScale(14),
  },
  applyButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: moderateScale(12),
    paddingVertical: spacing.mediumSpacing,
    alignItems: 'center',
    elevation: 6,
  },
  applyText: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.white,
    fontSize: moderateScale(16),
  },
});
