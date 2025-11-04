import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/colors';

const Wishlist = () => {
  return (
       <View style={styles.container}>

      <Text>Wishlist</Text>
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
})