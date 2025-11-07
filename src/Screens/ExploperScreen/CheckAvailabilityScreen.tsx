import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../Utils/colors';
import { spacing } from '../../Utils/spacing';
import { fonts } from '../../../assets/fonts/fonts';
import { moderateScale } from 'react-native-size-matters';
import { body } from '../../Utils/fontSizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/types';
import images from '../../../assets/images/images';

const { width } = Dimensions.get('window');

interface MonthItem {
  year: number;
  month: number;
  key: string;
}

const CheckAvailabilityScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState<MonthItem[]>(generateMonths());
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();


  function generateMonths() {
    const monthsArr: MonthItem[] = [];
    for (let i = 0; i < 24; i++) {
      const date = new Date(currentYear, currentMonth - 1 + i, 1);
      monthsArr.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        key: `${date.getFullYear()}-${date.getMonth() + 1}`,
      });
    }
    return monthsArr;
  }

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: colors.primary,
        textColor: colors.white,
      };
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const current = new Date(start);


      current.setDate(current.getDate() + 1);
      while (current < end) {
        const dateString = current.toISOString().split('T')[0];
        marked[dateString] = {
          color: colors.primaryLight,
          textColor: colors.textPrimary,
        };
        current.setDate(current.getDate() + 1);
      }

  
      marked[endDate] = {
        endingDay: true,
        color: colors.primary,
        textColor: colors.white,
      };
    }

    return marked;
  };

  const onDayPress = (day: any) => {
    const selectedDate = day.dateString;
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(undefined);
    } else if (startDate && !endDate) {
      if (new Date(selectedDate) > new Date(startDate)) {
        setEndDate(selectedDate);
      } else {
        setStartDate(selectedDate);
      }
    }
  };


  const renderCalendar = ({ item }: { item: MonthItem }) => {
    const dateString = `${item.year}-${String(item.month).padStart(2, '0')}-01`;

    return (
      <View style={styles.calendarContainer}>
        <Calendar
          current={dateString}
          markingType="period"
          markedDates={getMarkedDates()}
          onDayPress={onDayPress}
          hideArrows={true}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: colors.buttonBlue,
            selectedDayTextColor: '#fff',
            todayTextColor: colors.primary,
            dayTextColor: '#fff',
            textDisabledColor: 'rgba(255,255,255,0.3)',
            monthTextColor: '#fff',
            arrowColor: '#fff',
            textDayFontFamily: fonts.MontserratMedium,
            textMonthFontFamily: fonts.MontserratSemiBold,
            textDayHeaderFontFamily: fonts.MontserratMedium,
          }}
        />
      </View>
    );
  };

  const handleEndReached = () => {
    const lastMonth = months[months.length - 1];
    const newMonths: MonthItem[] = [];
    for (let i = 1; i <= 12; i++) {
      const date = new Date(lastMonth.year, lastMonth.month - 1 + i, 1);
      newMonths.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        key: `${date.getFullYear()}-${date.getMonth() + 1}`,
      });
    }
    setMonths([...months, ...newMonths]);
  };

  return (
    <ImageBackground source={images.welcomebg} style={styles.background}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
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

        <FlatList
          data={months}
          renderItem={renderCalendar}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
        />

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {startDate && endDate
                ? `${Math.ceil(
                    (new Date(endDate).getTime() -
                      new Date(startDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )} nights`
                : '$120 / night'}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.AvailabilityButton}
              onPress={() => {
                if (startDate && endDate) {
                  console.log('Selected date range:', startDate, 'to', endDate);
                  navigation.navigate('Explorebooking' as any);
                } else {
                  console.log('Please select a date range');
                }
              }}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CheckAvailabilityScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  calendarContainer: {
    marginBottom: spacing.largeSpacing,
    padding: spacing.mediumSpacing,
    borderRadius: moderateScale(10),
    backgroundColor: 'transparent',
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
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(60),
    paddingHorizontal: spacing.mediumSpacing,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priceText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    color: 'white', // Custom color for price text
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  AvailabilityButton: {
    width: 'auto',
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // Custom background color
    borderRadius: moderateScale(8),
    marginRight: spacing.largeSpacing,
    paddingHorizontal: moderateScale(15),
  },
  buttonText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: body,
    color: colors.white,
  },
});
