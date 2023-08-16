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
  const [hostContext, setHostContext] = useState(null);
  const [mealIsFavorite, setMealIsFavorite] = useState(false);
  const [hostIsFavorite, setHostIsFavorite] = useState(false);
  const { user } = useAuthContext();
  const { mealContext } = useBasketContext();


  useEffect(() => {
    const checkIfMealFavorite = async () => {
      try {
        if (mealContext && user) {
          const favorites = await DataStore.query(
            FavoriteMeal,
            (c) => c.mealID.eq(mealContext.id) && c.customerID.eq(user[0].id)
          );
          if (favorites.length > 0) {
            setFavoriteMeals(favorites);
            setMealIsFavorite(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkIfMealFavorite();
  }, [mealContext, user]);


 const toggleMealFavorites = async () => {
  try {
    const isMealFavorite = favoriteMeals.some(
      (meal) => meal.mealID === mealContext.id
    );
    if (isMealFavorite) {
      // Meal is already a favorite, so unlike the meal and delete from favorites
      const favoriteMeal = favoriteMeals.find(
        (meal) => meal.mealID === mealContext.id
      );
      await DataStore.delete(FavoriteMeal, favoriteMeal.id);
      setFavoriteMeals(
        favoriteMeals.filter((meal) => meal.id !== favoriteMeal.id)
      );
      setMealIsFavorite(false);
      console.log("Meal deleted from favorites");
    } else {
      // Meal is not a favorite, so like the meal and add to favorites
      const newFavoriteMeal = await DataStore.save(
        new FavoriteMeal({
          customerID: user[0].id,
          mealID: mealContext.id,
        })
      );
      setFavoriteMeals([...favoriteMeals, newFavoriteMeal]);
      setMealIsFavorite(true);
      console.log("Meal added to favorites");
    }
  } catch (e) {
    console.log("ERROR toggling meal favorite", e);
  }
};
  
  const toggleHostFavorites = async () => {
    try {
      if (hostIsFavorite && hostContext) {
        // Unlike the host and delete from favorites
        const favoriteHost = favoriteHosts.find(
          (host) => host.hostID === hostContext.id
        );
        await DataStore.delete(FavoriteHost, favoriteHost.id);
        setFavoriteHosts(favoriteHosts.filter((host) => host.id !== favoriteHost.id));
        setHostIsFavorite(false);
        console.log("Host deleted from favorites");
      } else {
        // Like the host and add to favorites
        const favoriteHost = await DataStore.save(
          new FavoriteHost({
            customerID: user[0].id,
            hostID: hostContext.id,
          })
        );
        setFavoriteHosts([...favoriteHosts, favoriteHost]);
        setHostIsFavorite(true);
        console.log("Host added to favorites");
      }
    } catch (e) {
      console.log("ERROR TOGGLING HOST FAVORITE", e);
    }
  };

  useEffect(() => {
    const checkIfHostFavorite = async () => {
      try {
        if (hostContext && user) {
          const favorites = await DataStore.query(
            FavoriteHost,
            (c) => c.hostID.eq(hostContext.id) && c.customerID.eq(user[0].id)
          );
          if (favorites.length > 0) {
            setFavoriteHosts(favorites);
            setHostIsFavorite(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    checkIfHostFavorite();
  }, [hostContext, user]);
  

  

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
        toggleHostFavorites,
        hostContext,
        setHostContext,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;

export const useFavoritesContext = () => useContext(FavoritesContext);
