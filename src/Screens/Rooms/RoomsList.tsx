import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../Utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backheader from '../../Components/Backheader';
import { useNavigation } from '@react-navigation/native';

const RoomsList = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Backheader isSearch 
      backIconpress={()=>navigation.goBack()}
      />
      <ScrollView>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomsList;

const styles = StyleSheet.create({});
