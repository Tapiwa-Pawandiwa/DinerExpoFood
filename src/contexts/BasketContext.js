import {View, Text} from 'react-native';
import React from 'react';
import {createContext, useState, useEffect, useCallback} from 'react';
import {DataStore} from 'aws-amplify';
import {Basket, BasketMeal, Customer, Host} from '../models';
import {useAuthContext} from './AuthContext';
import '@azure/core-asynciterator-polyfill'
import {useContext} from 'react';

const BasketContext = createContext({});

const BasketContextProvider = ({children}) => {
  const {user} = useAuthContext();
  const [basket, setBasket] = useState(null);

  const [isMounted, setIsMounted] = useState(true);

  //add up meal and extras quantity
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [mealQuantity, setMealQuantity] = useState(0);
  const [mealContext, setMealContext] = useState(null);
  const [hostContext, setHostContext] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  const [basketMeals, setBasketMeals] = useState([]);

  // check if there is an order for the current user
  // if there is an order, set the order state
  // the Order depends on two fields , the user , and the meal in question
  //im gonna have to filter to get the meal through the basketmeal table since the other way causes circular dependency issue }
  const removeMealFromBasket = async meal => {};

  async function updateBasketMealQuantity(mealId, newQuantity, basketMealID) {
    const updatedBasketMeals = basketMeals.map(basketMeal => {
      console.log(newQuantity, 'NEW QUANTITY');
      if (basketMeal.id === mealId) {
        return {
          ...basketMeal,
          quantity: newQuantity,
        };
      }
      return basketMeal;
    });

    setBasketMeals(updatedBasketMeals);

    // find the basket meal to update
    const basketMealToUpdate = basketMeals.find(bm => bm.id === basketMealID);
    await DataStore.save(
      BasketMeal.copyOf(basketMealToUpdate, updated => {
        updated.quantity = newQuantity;
      }),
    );
  }

  //FETCH HOST
  



  //i need a function to
  useEffect(() => {
    const fetchBasketMeals = async () => {
      try {
        const basketMeals = await DataStore.query(BasketMeal, bm =>
          bm.basketID.eq(basket.id),
        );
        if(isMounted){
          setBasketMeals(basketMeals);
        }
      } catch (e) {
        
        console.log(e, 'error fetching basket meals');
      }
    };
    if (basket) {
      fetchBasketMeals();
    }
  }, [basket]);

  const createNewBasket = async () => {
    try {
      const newBasket = await DataStore.save(
        new Basket({customerID: user[0].id}),
      );
      setBasket(newBasket);
      return newBasket;
    } catch (e) {
      console.log(e, 'error creating new basket');
    }
  };
  const checkBasket = useCallback(async () => {
    try {
      const baskets = await DataStore.query(Basket, b =>
        b.customerID.eq(user[0].id),
      );

      if (baskets.length > 0) {
        const basketMeal = await DataStore.query(BasketMeal, bm =>
          bm.mealID.eq(mealContext.id),
        );

        if (basketMeal.length > 0) {
          const fetchBasketID = basketMeal[0].basketID;

          const existingBasket = await DataStore.query(Basket, bk =>
            bk.id.eq(fetchBasketID),
          );
          setBasket(existingBasket[0]);
          const mealsInBasket = await DataStore.query(BasketMeal, bm =>
            bm.basketID.eq(existingBasket[0].id),
          );
          setBasketMeals(mealsInBasket);
        } else {
          console.log('NO BASKET MEAL FOUND');
        }
      } else {
        console.log('NO EXISTING BASKET');
      }
    } catch (e) {
      console.log(e, 'error checking basket');
    }
  }, [mealContext]);

  useEffect(() => {
    checkBasket();
  }, [checkBasket]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketMeal, bm => bm.basketID.eq(basket.id)).then(
        setBasketMeals,
      );
    }
  }, [basket]);

  const addMealToBasket = async (meal, quantity) => {
    let theBasket = null;
    // Check if there is an existing basket for the current meal
    const existingBasket = basketMeals.find(
      basketMeal => basketMeal.mealID === meal.id,
    );
    //dont add to basket if the quantity + existing basketMeal quantity is greater than the meal plates

    if (existingBasket) {
      const updatedBasketMeal = await DataStore.save(
        BasketMeal.copyOf(existingBasket, updated => {
          updated.quantity += quantity;
        }),
      );
      setBasketMeals(prevBasketMeals => [
        ...prevBasketMeals.filter(
          basketMeal => basketMeal.id !== updatedBasketMeal.id,
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
        }),
      );
      setBasketMeals([...basketMeals, newBasketMeal]);
    }
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
      }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
