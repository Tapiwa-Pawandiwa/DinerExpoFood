import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Meal, MealCategory} from '../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../UI/colors';
import {illustrations} from '../UI/images';
import {useNavigation} from '@react-navigation/native';
import '@azure/core-asynciterator-polyfill'
import {DataStore} from 'aws-amplify';
import HostMealCard from '../components/HostMealCard/HostMealCard';

const CuisineScreen = ({route}) => {
  const [meals, setMeals] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [mealIds, setMealIds] = useState([]);
  const {category} = route.params;
console.log(category,'CATEGORY');
  const navigation = useNavigation();
  // fetch all the meals associated with this category
  //fetch the mealCategory where the attribute categoryID in MealCategory is equal to the categoryID in the category object
  // 1 fetch meal categories where the MealCategory.categoryID is equal to the category.id
  // 2 for each meal category, fetch the mealIds
  // 3 for each mealId, fetch the meal from the MEAL table

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealCategories = await DataStore.query(MealCategory, c =>
          c.categoryId.eq(category.id),
        );
        setMealCategories(mealCategories);
        const mealIds = mealCategories.map(mealCategory => mealCategory.mealId);
        setMealIds(mealIds);
        console.log('fetchedMeal Categories', mealIds);
      } catch (error) {
        console.log(error, 'error fetching meal categories');
      }
    };
    fetchMeals();
  }, [category]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const meals = await Promise.all(
          mealIds.map(async mealId => {
            const meal = await DataStore.query(Meal, (m)=> m.id.eq(mealId)
            ).then((meal)=> meal[0].available==true?meal[0]:null);
            return meal;
          }),

        );
        setMeals(meals);
        console.log(meals)
      } catch (error) {
        console.log(error, 'error fetching meals');
      }
    };
    fetchMeals();
  }, [mealIds]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.headingContainer}>
        <Pressable
          style={{
            position: 'absolute',
            top: 50,
            left: 10,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 20,
          }}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
        <Text style={styles.headingText}>{category.name}</Text>
      </View>

      <ScrollView style={styles.homeContainer}>
        <View style={styles.body}>
          {meals.length >0 && meals.map(meal => (
            <View  key={meal.id} style={styles.mealContainer}>
    <HostMealCard mealObj={meal} />
            </View>
        
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CuisineScreen;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#ffffff',
  },
  headingText: {
    fontFamily: 'Now-Bold',
    fontSize: 40,
    marginTop: 90,
    alignSelf: 'center',
    alignContent: 'center',

    marginRight: 10,
    marginLeft: 10,
  },
  subHeadingText: {
    fontFamily: 'Now-Medium',
    fontWeight: '400',
    fontSize: 20,

    marginTop: 5,
    paddingBottom: 5,
    color: Colors.primaryBlue,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  mealContainer:{
    marginBottom: 20,
  },
  body: {
 
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    
  },
  headingImage: {
    width: 300,
    height: 200,
    marginTop: 80,
    resizeMode: 'contain',
  },
  headingContainer: {
    justifyContent: 'flex-start',
    height: 200,
    backgroundColor: Colors.primaryAccent2,
    borderRadius: 20,
    marginBottom: 10,
  },
  cuisineStyle: {
    padding: 5,
  },
});
