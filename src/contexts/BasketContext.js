import { View, Text } from "react-native";
import React from "react";
import { Alert } from "react-native";
import { createContext, useState, useEffect, useCallback } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketMeal, Customer, Host } from "../models";
import { useAuthContext } from "./AuthContext";
import "@azure/core-asynciterator-polyfill";
import { useContext } from "react";

/*
    Basket Context handles all the logic for the basket

    -- i have errors in the basket context
    ---it could be drastically improved performance wise 
    ---- if someone adds to the basket and then says view order and updates the quanity - it glitches by updating and then reverting back - so its a display and synchronization issue with the backend 
*/

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [basket, setBasket] = useState(null);

  const [isMounted, setIsMounted] = useState(true);

  //add up meal and extras quantity
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [mealQuantity, setMealQuantity] = useState(0);
  const [mealContext, setMealContext] = useState(null);
  const [hostContext, setHostContext] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  const [basketMeals, setBasketMeals] = useState([]);

  const updateBasketMealQuantity = async (
    mealId,
    newQuantity,
    basketMealID
  ) => {
    try {
      // Update the local state immediately
      setBasketMeals((prevBasketMeals) => {
        const updatedBasketMeals = prevBasketMeals.map((basketMeal) => {
          if (basketMeal.id === basketMealID) {
            return { ...basketMeal, quantity: newQuantity };
          }
          return basketMeal;
        });

        return updatedBasketMeals;
      });

      // Update the database value
      const updatedBasketMeal = await DataStore.save(
        BasketMeal.copyOf(
          basketMeals.find((bm) => bm.id === basketMealID),
          (updated) => {
            updated.quantity = newQuantity;
          }
        )
      );

      // Update the local state with the saved object
      setBasketMeals((prevBasketMeals) => {
        const updatedBasketMeals = prevBasketMeals.map((basketMeal) => {
          if (basketMeal.id === updatedBasketMeal.id) {
            return updatedBasketMeal;
          }
          return basketMeal;
        });

        return updatedBasketMeals;
      });
    } catch (error) {
      console.log(error, "error updating basket meal quantity");
    }
  };

  //FETCH HOST

  //i need a function to
  useEffect(() => {
    if (user) {
      const fetchBasketMeals = async () => {
        try {
          const basketMeals = await DataStore.query(BasketMeal, (bm) =>
            bm.basketID.eq(basket.id)
          );
          if (isMounted) {
            setBasketMeals(basketMeals);
          }
        } catch (e) {
          console.log(e, "error fetching basket meals");
        }
      };
      if (basket) {
        fetchBasketMeals();
      }
    }
  }, [basket, user]);

  const createNewBasket = async () => {
    try {
      const newBasket = await DataStore.save(
        new Basket({ customerID: user[0].id })
      );
      setBasket(newBasket);
      return newBasket;
    } catch (e) {
      console.log(e, "error creating new basket");
    }
  };

  const checkBasket = useCallback(async () => {
    try {
      // console.log(user[0].id, 'user id')
      const baskets = await DataStore.query(Basket, (b) =>
        b.customerID.eq(user[0].id)
      );
      if (baskets.length > 0) {
        const basketMeal = await DataStore.query(BasketMeal, (bm) =>
          bm.mealID.eq(mealContext.id)
        );
        console.log(basketMeal, "basket meal");
        if (basketMeal.length > 0) {
          const fetchBasketID = basketMeal[0].basketID;
          console.log(fetchBasketID, "fetch basket id");
          const existingBasket = await DataStore.query(Basket, (b) =>
            b.id.eq(fetchBasketID)
          );
          setBasket(existingBasket[0]);

          const mealsInBasket = await DataStore.query(BasketMeal, (bm) =>
            bm.basketID.eq(existingBasket[0].id)
          );
          console.log(mealsInBasket, "meals in basket");

          setBasketMeals(mealsInBasket);
        } else {
          console.log("NO BASKET MEAL FOUND");
        }
      } else {
        console.log("NO EXISTING BASKET");
      }
    } catch (e) {
      console.log(e, "error checking basket");
    }
  }, [mealContext]);

  useEffect(() => {
    if (user) {
      checkBasket();
    }
  }, [checkBasket]);

  useEffect(() => {
    if (basket && user) {
      DataStore.query(BasketMeal, (bm) => bm.basketID.eq(basket.id)).then(
        setBasketMeals
      );
    }
  }, [basket,user]);

  const addMealToBasket = async (meal, quantity) => {
    let theBasket = null;
    // Check if there is an existing basket for the current meal
    const existingBasket = basketMeals.find(
      (basketMeal) => basketMeal.mealID === meal.id
    );
    //dont add to basket if the quantity + existing basketMeal quantity is greater than the meal plates

    if (existingBasket) {
      const updatedBasketMeal = await DataStore.save(
        BasketMeal.copyOf(existingBasket, (updated) => {
          updated.quantity += quantity;
        })
      );
      setBasketMeals((prevBasketMeals) => [
        ...prevBasketMeals.filter(
          (basketMeal) => basketMeal.id !== updatedBasketMeal.id
        ),
        updatedBasketMeal,
      ]);
    } else {
      // If there is no existing basket, create a new one
      theBasket = await createNewBasket();

      const newBasketMeal = await DataStore.save(
        new BasketMeal({
          quantity: quantity,
          mealID: meal.id,
          basketID: theBasket.id,
        })
      );
      setBasketMeals([...basketMeals, newBasketMeal]);
    }
    // add an alert after meal is added to basket
  };
  return (
    <BasketContext.Provider
      value={{
        addMealToBasket,
        basket,
        maxQuantity,
        basketMeals,
        setMealContext,
        setHostContext,
        hostContext,
        mealContext,
        updateBasketMealQuantity,
        totalCost,
        setTotalCost,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
