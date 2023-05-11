import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ExtraItems = ({meal}) => {
  return (
    <View>
      <Text>ExtraItems</Text>
      <View>
        <Text>Product Info </Text>
        <Text>Price</Text>
        <Text>item</Text>
      </View>
      <View>
        <Text>Description</Text>
        <Text>Description</Text>
        <Text>item</Text>
      </View>
      <View>
         <Text>Quantity</Text>
        {/* <Counter?>*/} 
        <TouchableOpacity>Add To Order</TouchableOpacity>
      </View>
     
    </View>
  )
}

export default ExtraItems