import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({url, title}) => {
  return (
    <View>
      <Image source={title}/>
      <TouchableOpacity>{title}</TouchableOpacity>
    </View>
  )
}

export default Button;
