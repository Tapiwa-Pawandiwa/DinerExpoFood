import { View, Text ,ScrollView,StyleSheet,Image,Pressable} from 'react-native'
import React from 'react'
import HostMealCard from '../components/HostMealCard/HostMealCard'
import { useFavoritesContext } from '../contexts/FavoritesContext';
import Amplify,{ DataStore } from 'aws-amplify';
import { Meal } from '../models';
import { Host } from '../models';
import '@azure/core-asynciterator-polyfill'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../UI/colors';
import { illustrations } from '../UI/images';



// this screen is responsible for showing favorite hosts and favorite meals 
//we will render host cards 
// and hostMeal cards 
//perhaps i should create a host card component as well to display . 

const FavoritesScreen = () => {
    const {favoriteHosts} = useFavoritesContext();
    const {favoriteMeals} = useFavoritesContext();
    const [meals, setMeals] = useState([]); //meal obj from the favorite meals array
    const navigation = useNavigation();


   
    useEffect(() => {
      async function fetchMeals() {
        const fetchedMeals = [];
        for (const favoriteMeal of favoriteMeals) {
          const meals = await DataStore.query(Meal, (meal) => meal.id.eq(favoriteMeal.mealID));
          fetchedMeals.push(...meals);
        }
        setMeals(fetchedMeals);
        console.log(fetchedMeals, 'favorite meals');
      }
      fetchMeals();
    }, [favoriteMeals]);

  

  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
      <Pressable
            style={{
              position: 'absolute',
              top: 20,
              left: 15,
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
        <Text style={styles.headingText}>Favorites</Text>
        <Image source={illustrations.bowl.url} style={styles.headingImage} />
      </View>
        <ScrollView style={styles.results}>
        {meals.length === 0 ? (
    <View style={{ alignItems: 'center', marginTop: 200 }}>  
      <Text style={{ fontSize: 20, color: Colors.darkGray }}>
        No favorite Meals to Display
      </Text>
    </View>
  ) : (
    meals.map((meal) => {
      return <HostMealCard mealObj={meal}  key={meal.id}/>;
    })
  )}
        </ScrollView>
    </SafeAreaView>
  )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.primaryAccent3,
      },
      results:{
        alignContent:'center',
        marginTop: 20,
        alignSelf:'center',
      },
      headingText: {
        fontSize: 45,
        marginTop: 50,
      
        fontWeight: 'bold',
        color: Colors.darkGray,
      },
      headingImage: {
        width: 100,
        height: 100,
      },
})
