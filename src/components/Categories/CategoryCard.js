import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../UI/colors';
import {useNavigation} from '@react-navigation/native';


const CategoryCard = ({type, category}) => {
  const navigation = useNavigation();

  const renderStyle = type => {
    switch (type) {
      case 'home':
        return styles.homeCard;
      case 'category':
        return styles.categoryCard;
      default:
        return styles.homeCard;
    }
  }; //conditional rendering of style because i will use this card style many times

  const handlePress = () => {
    navigation.navigate('CuisineScreen',{category: category});
  };
  return (
    <TouchableOpacity style={renderStyle(type)} onPress={handlePress}>
      <Image
        style={[type == 'home' ? styles.homeImage : styles.categoryImage]}
        source={{uri: category.image}}
      />
      <Text style={styles.textStyle}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  //categoryImage: {
  //  width: "100%",
  //    height: "100%",
  //  },
  categoryCard: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.primaryAccent2,
    borderColor: 'black',
    height: 100,
    margin: 5,
    borderRadius: 10,
    width: 100,
    elevation: 2,
  },
  homeCard: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.primaryAccent2,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: 100,
    height: 80,
  },
  categoryImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 5,
  },
  homeImage: {
    flex: 1,
    width: 40,
    height: 30,
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 5,
    marginTop: 5,
  },
  textStyle: {
    marginTop: 5,
    color: Colors.primaryBlue,
    padding: 5,
    fontFamily: 'Inter-Regular',
  },
});
