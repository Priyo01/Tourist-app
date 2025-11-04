import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/colors';

const Places = () => {
  return (
     <View style={styles.container}>
 
      <Text>Places</Text>
    </View>
  )
}

export default Places

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
})