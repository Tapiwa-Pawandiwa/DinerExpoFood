import { Alert } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import Amplify, { DataStore } from "aws-amplify";
import { Order, OrderMeal, Reservation, Meal } from "../models";
import { useAuthContext } from "./AuthContext";
import "@azure/core-asynciterator-polyfill";
import * as Notifications from "expo-notifications";

import { useBasketContext } from "./BasketContext";

/*
The 'useOrderContext' function is a custom hook that provides access to the OrderContext, which is a React context that stores information related to orders, reservations, and meals. The main objective of this function is to allow components to consume and update this context, enabling them to manage orders and reservations in the application.

*/

const OrderContext = createContext({});

/**
 * Provides an order context to its children components.
 * Manages the state of orders, reservations, and paid status.
 * Provides functions to create orders and reset the booking process.
 *
 * @param {Object} children - React component(s) to be wrapped by the provider.
 * @returns {Object} - Order context provider component.
 *
 * @example
 * // Usage
 * <OrderContextProvider>
 *   <App />
 * </OrderContextProvider>
 */

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

  useEffect(() => {
    // Request permission for push notifications
    const requestPermissions = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    };

    requestPermissions();
  }, []);

  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [paid, setPaid] = useState(false);
  const [date, setDate] = useState(null);
  const [mealDateTime, setMealDateTime] = useState(null);
  const [testVal, setTestVal] = useState("TEST VALUE");
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (user ) {
     //setOrders to orders where the user.id is equal to the customerID in Order
      const fetchOrders = async () => {
        const orders = await DataStore.query(Order, (o) =>
          o.customerID.eq(user[0].id)
        );
        setOrders(orders);
      }
      fetchOrders();
    }
  }, [refreshBooking]);

  const getOrder = async (id) => {
    return DataStore.query(Order, id);
  };

  //fetch meal details from basketMeal

  const resetBasketMeals = () => {
  
    setBasketMeals([]);
  };
  /*
  useEffect(() => {
    try{
       const mealDateTime = moment.utc(`${mealContext.date} ${mealContext.time}`).toDate();
       mealDateTime.subtract(1, 'hour').toDate();
    setMealDateTime(mealDateTime);
    setDate(mealDateTime);
    setTime(mealDateTime);
    console.log()
    }catch {
      console.log('ERROR SETTING DATE AND TIME');
    }
   
  }, [mealContext]);
*/
  const createOrder = async () => {
    console.log("ORDER CREATION IN PROGRESS");
    try {
      if (hostContext && basketMeals ) {
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
        Alert.alert("Order Created");
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
