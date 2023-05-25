import { View, Text } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import Amplify, { DataStore } from "aws-amplify";
import { FavoriteHost, FavoriteMeal } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
import "@azure/core-asynciterator-polyfill";

const FavoritesContext = createContext({});

//what we want to do is
// add a meal to the favorites table
// i need to create a toggleProvider function that will add a meal to the favorites table
// and remove it if it already exists
// i need to check if the meal is already a favorite for the current user

const FavoritesContextProvider = ({ children }) => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [favoriteHosts, setFavoriteHosts] = useState([]);
  const [mealIsFavorite, setMealIsFavorite] = useState(false);
  const [hostIsFavorite, setHostIsFavorite] = useState(false);
  const { user } = useAuthContext();
  const { mealContext } = useBasketContext();



  const toggleMealFavorites = async () => {
    try {
      if (mealIsFavorite) {
        // Unlike the meal and delete from favorites
        const favoriteMeal = favoriteMeals.find(
          (meal) => meal.mealID === mealContext.id
        );
        await DataStore.delete(FavoriteMeal, favoriteMeal.id);
        setFavoriteMeals(favoriteMeals.filter((meal) => meal.id !== favoriteMeal.id));
        setMealIsFavorite(false);
        console.log("Meal deleted from favorites");
      } else {
        // Like the meal and add to favorites
        const favoriteMeal = await DataStore.save(
          new FavoriteMeal({
            customerID: user[0].id,
            mealID: mealContext.id,
          })
        );
        setFavoriteMeals([...favoriteMeals, favoriteMeal]);
        setMealIsFavorite(true);
        console.log("Meal added to favorites");
      }
    } catch (e) {
      console.log("ERROR TOGGLING FAVORITE", e);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorites = await DataStore.query(
          FavoriteMeal,
          (c) => c.mealID.eq(mealContext.id) && c.customerID.eq(user[0].id)
        );
        if (favorites.length > 0) {
          setFavoriteMeals(favorites);
          setMealIsFavorite(true);
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkIfFavorite();
  }, [mealContext]);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteMeals,
        favoriteHosts,
        setFavoriteMeals,
        setFavoriteHosts,
        mealIsFavorite,
        setMealIsFavorite,
        hostIsFavorite,
        setHostIsFavorite,
        toggleMealFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;

export const useFavoritesContext = () => useContext(FavoritesContext);
