import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../UI/colors';
import {ScrollView} from 'react-native-gesture-handler';
import HostMealCard from '../HostMealCard/HostMealCard';
import '@azure/core-asynciterator-polyfill'
import {useState} from 'react';
import {DataStore} from 'aws-amplify';
import {Meal, Host} from '../../models';
import {FeaturedMeal} from '../../models';

const FeaturedRow = ({title, description}) => {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [meals, setMeal] = useState([]);
  const [hosts , setHosts] = useState([]);

  //fetch DATA from FeaturedMeal table
  useEffect(() => {
    const fetchFeaturedMeals = async () => {
      const featuredMeals = await DataStore.query(FeaturedMeal, fm => fm.Meal.available.eq(true));
      setFeaturedMeals(featuredMeals);
    };
    fetchFeaturedMeals();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await Promise.all(
        featuredMeals.map(async featuredMeal => {
          const meal = await DataStore.query(
            Meal,
            featuredMeal.featuredMealMealId,
          );
          return meal;
        }),
      );
      setMeal(meals);
    };
    fetchMeals();
  }, [featuredMeals]);

  return (
    <View style={styles.Container}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        style={styles.featuredScroll}>
        {/*Meal SLidr / diner slider  */}

        {meals
          .filter(meal => meal)
          .map((featuredMeal, index) => (
            <HostMealCard key={index} mealObj={featuredMeal} />
          ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({
  Container: {},
  featuredScroll: {},
  cards: {},
  rowContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 20,
  },
  title: {
    fontFamily: 'Now-Medium',
    fontWeight: '400',
    fontSize: 20,
    color: Colors.primaryBlue,
  },
  description: {
    color: Colors.menuGray,
    marginLeft: 20,
    marginBottom: 5,
  },
});
