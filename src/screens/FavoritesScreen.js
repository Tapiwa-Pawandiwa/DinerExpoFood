import { View, Text ,ScrollView} from 'react-native'
import React from 'react'

const FavoritesScreen = () => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Categories</Text>
        <Image source={illustrations.bowl.url} style={styles.headingImage} />
      </View>
        <ScrollView>
            {/* this is where our food cuisine meals that are available this week */}
        </ScrollView>
    </View>
  )
}

export default FavoritesScreen