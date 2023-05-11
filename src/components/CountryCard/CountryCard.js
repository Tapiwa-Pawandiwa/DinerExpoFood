import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
//import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../UI/colors";

const CountryCard = ({category}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('CuisineScreen', {category: category});
  };

  
 
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{uri:category.image}} style={styles.countryStyle} />
        <Text style={styles.titleStyle}>{category.name}</Text>
        {/* I need to add the view more button */}
      </View>
    </TouchableOpacity>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  countryStyle: {
    width: "100%",
    height: "100%",
    marginBottom: 4,
    resizeMode:'contain'
  },
  titleStyle: {
    fontFamily:  'Inter-Regular',
    textAlign: "center",
    fontSize: 11,
    color: Colors.blue,
    marginBottom: 5,
    paddingBottom: 8
  },
  imageContainer: {
    width: 100,
    height: 40,
  },
  cardContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: Colors.primaryAccent2,
    borderRadius: 5,
    width: 90,
    padding: 5,
    height: 75
  },
});
