import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from '../Screens/SearchScreen';
import { RootStackParamList } from './types';
import ExploperScreen from '../Screens/ExploperScreen';
import ExploreDetailsScreen from '../Screens/ExploperScreen/ExploreDetailsScreen';
import GalleryDetailsScreen from '../Screens/Gallery/GalleryDetailsScreen';
import ExploreRoomsDetail from '../Screens/ExploperScreen/ExploreRoomsDetail';
import CheckAvailabilityScreen from '../Screens/ExploperScreen/CheckAvailabilityScreen';
import Explorebooking from '../Screens/Bookings/Explorebooking';
import PaymentScreen from '../Screens/PaymentScreen.tsx';
import RoomsList from '../Screens/Rooms/RoomsList.tsx';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="AuthStack"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        {/*  Authorized screen  */}
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExploperScreen"
          component={ExploperScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExploreDetailsScreen"
          component={ExploreDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GalleryDetailsScreen"
          component={GalleryDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExploreRoomsDetail"
          component={ExploreRoomsDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckAvailabilityScreen"
          component={CheckAvailabilityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Explorebooking"
          component={Explorebooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomsList"
          component={RoomsList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
