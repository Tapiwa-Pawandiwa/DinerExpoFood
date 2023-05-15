import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../UI/colors';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import {Host, Meal, Extras} from '../../models';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';


const MealDetail = ({route}) => {
  const navigation = useNavigation();
  const [meal, setMeal] = useState({});
  const [extra, setExtra] = useState({});
  const [mealPlates, setMealPlates] = useState(0);
  const [quantity, setQuantity] = useState(0);


  //get device width

  const {mealObj} = route.params;
  
  useEffect(() => {
    setMeal(mealObj);
  }, [mealObj]);
  //query the datastore using the meal id if the mealObj.type is meal otherwise if the mealobj.type is extras then query the extras table


  //Fetch the meal using the mealID from the datastore

  //fetch the hosting using the hostID from the meal but query the host table

  //close modal and return to mealScreen
  const handleClose = () => {
    navigation.goBack();
  };

  const onPlus = () => {
    if (mealObj.type === 'meal' && quantity < mealPlates) {
      setQuantity(quantity + 1);
    } else if (mealObj.type === 'extras') {
      setQuantity(quantity + 1);
    }
  };

  const onMinus = () => {
    if (mealObj.type === 'meal') {
      setQuantity(Math.max(1, quantity - 1));
    } else if (mealObj.type === 'extras') {
      setQuantity(Math.max(0, quantity - 1));
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.close} onPress={handleClose}>
        <MaterialCommunityIcons name="close" size={30} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.headingMain}>
        <Text style={styles.headingText}>Details</Text>
      </View>
      <View style={styles.subSummary}>
        <Text style={styles.summaryHead}>Product Info</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHead}>Meal Description</Text>
        <Text style={styles.descriptionText}>{meal.description}</Text>
        <Text style={styles.summaryHead}>Allergens</Text>
        <Text style={styles.descriptionText}>
          {meal.allergens && meal.allergens.length > 0 && (
            <>
              {meal.allergens.map((allergen, index) => (
                <Text style={styles.descriptionText} key={index}>
                  {allergen}
                </Text>
              ))}
            </>
          )}
        </Text>
      </View>
     
      <Text style={styles.summaryHead}>Ingredients</Text>
      <ScrollView style={styles.ingredientStyle}>
        {meal.ingredients && meal.ingredients.length > 0 && (
          <>
            {meal.ingredients.map((ingredient, index) => (
              <Text key={index}>{ingredient}</Text>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,

    top: 40,
    bottom: 0,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  addToCart: {
    backgroundColor: Colors.primaryBrand,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 200,
  },
  quantity:{
    fontSize: 20,
    margin : 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 20,
  },

  buttonContainer: {
    position: 'absolute',
    top: 550,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    padding: 10,
    backgroundColor: Colors.primaryBrand,
  },
  ingredientStyle: {
    backgroundColor: Colors.menuGray2,
    borderRadius: 10,
    paddingBottom: 30,
    paddingTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  summaryContainer: {
    backgroundColor: Colors.primaryAccent3,
    padding: 10,
    borderRadius: 10,
  },
  close: {
    //position on the right hand side
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: Colors.menuGray2,
    borderRadius: 50,
    padding: 5,
  },
  headingMain: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headingText: {
    fontFamily: 'Now-Bold',
    fontSize: 30,
  },
  subSummary: {},
  summaryHead: {
    fontFamily: 'Now-Bold',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
});
