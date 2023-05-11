import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const BasketMealItem = ({basketMeal}) => {
  return (
    <View style={styles.row}>
        <View styles={styles.quantityContainer}>
            <Text>{basketMeal.quantity}</Text>
        </View>
        <Text></Text>
        <Text></Text>
    </View>
  )
}

export default BasketMealItem;

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    }
})