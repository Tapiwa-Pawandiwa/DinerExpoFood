import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Meal, MealCategory } from "../models";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../UI/colors";
import { illustrations } from "../UI/images";
import { useNavigation } from "@react-navigation/native";
import "@azure/core-asynciterator-polyfill";
import { DataStore } from "aws-amplify";
import HostMealCard from "../components/HostMealCard/HostMealCard";

const CuisineScreen = ({ route }) => {
  /*
      CUISINE SCREEN 
      1. Purpose : To show all the meals associated with a particular cuisine 
      Tasks: 

    - fetch all the meals associated with this category
    - fetch the mealCategory where the attribute categoryID in MealCategory is equal to the categoryID in the category object
    - fetch meal categories where the MealCategory.categoryID is equal to the category.id
    - for each meal category, fetch the mealIds
    - for each mealId, fetch the meal from the MEAL table

  */
  const [meals, setMeals] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [mealIds, setMealIds] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();



  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealCategories = await DataStore.query(MealCategory, (c) =>
          c.categoryId.eq(category.id)
        );
        setMealCategories(mealCategories);
        const mealIds = mealCategories.map(
          (mealCategory) => mealCategory.mealId
        );
        setMealIds(mealIds);
        console.log("fetchedMeal Categories", mealIds);

        // Fetch meals only after mealIds have been fetched
        const meals = await Promise.all(
          mealIds.map(async (mealId) => {
            const meal = await DataStore.query(Meal, (m) =>
              m.id.eq(mealId)
            ).then((meal) => (meal[0].available == true ? meal[0] : null));
            return meal;
          })
        );
        setMeals(meals);
        console.log(meals);
      } catch (error) {
        console.log(error, "error fetching meals");
      }
    };
    // Fetch mealIds and meals only once on mount
    if (mealIds.length === 0) {
      fetchMeals();
    }
  }, [category]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.headingContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={illustrations.bowl.url} style={styles.headImage} />
          <Image
            source={illustrations.kitchen.url}
            style={styles.rightHeadImage}
          />
          <Text style={styles.headingText}>{category.name}</Text>
        </View>

        <Pressable
          style={{
            position: "absolute",
            top: 50,
            left: 15,
            backgroundColor: "white",
            padding: 5,
            borderRadius: 20,
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={"black"}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.homeContainer}>
        <View style={styles.body}>

          {meals.length > 0 ? (
             meals.map((meal) => (
              <View key={meal.id} style={styles.mealContainer}>
                <HostMealCard mealObj={meal} />
              </View>
            ))
          ): (
            <View>
              <Image source={illustrations.illustration_cook_THREE.url} style={styles.sorryImage} />
            <View style={styles.textBox}>
              <Text style={styles.noMealsTxt}>
             Sorry about that , there are no meals right now but trust us , someone is cooking something up 
            </Text>
            <Text style={styles.noMealsTxt}>
               Try another category 
            </Text>
              </View>
            
            </View>
          )
           
          }

        </View>
      </ScrollView>
    </View>
  );
};

export default CuisineScreen;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
  },
  textBox:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 200,
    backgroundColor: Colors.primaryAccent2,
    borderRadius: 20,
  },
  headingText: {
    fontFamily: 'Now-Bold',
    fontSize: 40,

    marginTop: 80,
    marginBottom: 10,
    paddingHorizontal: 20, // Added paddingHorizontal to allow wrapping
    flexShrink: 1, // Added flexShrink to allow wrapping
  },
  sorryImage:{
    width: 200,
    height: 200,
    alignContent: 'center',
    alignSelf: 'center',
  },
  headImage: {
    width: 120,
    height: 120,
    marginTop: 75,
    marginLeft: 20,
    resizeMode: "contain",
  },
  noMealsTxt:{
    fontFamily: 'Now-Regular',
    fontSize: 18,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 10,
  },
  rightHeadImage: {
    width: 200,
    height: 200,
    marginLeft: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
    resizeMode: "contain",
    top: 20,
    opacity: 0.5,
  },
  subHeadingText: {
    fontFamily: "Now-Medium",
    fontWeight: "400",
    fontSize: 20,

    marginTop: 5,
    paddingBottom: 5,
    color: Colors.primaryBlue,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  mealContainer: {
    marginBottom: 20,
  },
  body: {
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  headingImage: {
    width: 300,
    height: 200,
    marginTop: 80,
    resizeMode: "contain",
  },
  headingContainer: {
    height: 200,
    backgroundColor: Colors.primaryAccent2,
    borderRadius: 20,
    marginBottom: 10,
  },
  cuisineStyle: {
    padding: 5,
  },
});
