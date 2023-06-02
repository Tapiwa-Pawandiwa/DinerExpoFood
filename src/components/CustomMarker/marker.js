import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Colors } from '../../UI/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomMarker = (props) => {
    //will recieve co ordinates of locations 
    const {coordinate,onPress}=props;
  return (
    <Marker coordinate={coordinate} onPress={onPress} >
    <View style={styles.marker}>
      <Text style={styles.markerText}>

        {<MaterialIcons name="food-bank" size={20} color='white' />}
      </Text>
    </View>
    </Marker>
  )
}

export default CustomMarker;

const styles=StyleSheet.create({
    marker:{
        backgroundColor:Colors.primaryBrand,
        padding: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
      },
      markerText:{
        color: 'black',
        fontFamily: 'Inter-Regular',
      }
})
