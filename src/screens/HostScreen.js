import { View, Text } from 'react-native'
import React from 'react'

const HostsScreen = () => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Categories</Text>
        <Image source={illustrations.bowl.url} style={styles.headingImage} />
      </View>
    
      <Text>Near You </Text>
        {/* Host Near you slider*/}
      <Text>Your Nationality Category </Text>
      {/*slider nationality*/}
      <Text>Popular Diners</Text>
      {/* Popular Diners*/}

      <Text> Diners with Discounts</Text>

      
    </View>
  )
}

export default HostsScreen