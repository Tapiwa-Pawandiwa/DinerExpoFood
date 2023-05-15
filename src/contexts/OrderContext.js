import { View, Text } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import Amplify,{ DataStore } from "aws-amplify";
import { Order, OrderMeal, Reservation, Meal } from "../models";
import { useAuthContext } from "./AuthContext";
import "@azure/core-asynciterator-polyfill";

import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const [refreshBooking, setRefreshBooking] = useState(false);
  const { user } = useAuthContext();
  const {
    basketMeals,
    totalCost,
    basket,
    hostContext,
    mealContext,
    setBasketMeals,
  } = useBasketContext();


  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [paid, setPaid] = useState(false);
  const [date, setDate] = useState(null);
  const [testVal, setTestVal] = useState('TEST VALUE');
  const [time, setTime] = useState(null);


  
  useEffect(() => {
    DataStore.query(Order).then(setOrders);
  }, [
    refreshBooking,
  ]);
  
  const getOrder = async (id) => {
    return DataStore.query(Order, id);
  };

  //fetch meal details from basketMeal

  const resetBasketMeals = () => {
    setBasketMeals([]);
  };
  const createOrder = async () => {
    console.log("ORDER CREATION IN PROGRESS");
    try {
      if (hostContext && basketMeals) {
        const newOrder = await DataStore.save(
          new Order({
            customerID: user[0].id,
            status: "NEW",
            total: totalCost,
          })
        );

        // create order meals
        const orderMealPromises = basketMeals.map(async (basketMeal) => {
          const meal = await DataStore.query(Meal, basketMeal.mealID);
          if (meal.plates >= basketMeal.quantity) {
            const updatedMeal = await DataStore.save(
              Meal.copyOf(meal, (updated) => {
                updated.plates -= basketMeal.quantity;
                if (updated.plates === 0) {
                  updated.available = false;
                }
              })
            );
            return DataStore.save(
              new OrderMeal({
                quantity: basketMeal.quantity,
                orderID: newOrder.id,
                mealID: updatedMeal.id,
              })
            );
          } else {
            throw new Error(`Not enough plates for meal ${meal.name}`);
          }
        });
        const orderMeals = await Promise.all(orderMealPromises);

        // create reservation
        const newReservation = await DataStore.save(
          new Reservation({
            customerID: user[0].id,
            hostID: hostContext.id,
            Order: newOrder,
          })
        );

        //decrement the plates in the Meal table by the quantity
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        //await DataStore.save(Meal.copyOf(CURRENT_ITEM, item => {
        // Update the values on {item} variable to update DataStore entry
        //}));

        setOrders([...orders, newOrder]);
        setReservations([...reservations, newReservation]);
        console.log("ORDER CREATED", newOrder);
        console.log("ORDER MEALS CREATED", orderMeals);
        console.log("RESERVATION CREATED", newReservation);

        //delete basket
        await DataStore.delete(basket);
        resetBasketMeals();
      }
    } catch (error) {
      console.log(error, "ERROR CREATING ORDER");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        orders,
        reservations,
        setPaid,
        paid,
        testVal,
        setRefreshBooking,
      }}
    >
      {children}
    </OrderContext.Provider>
  );

};

 export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);


