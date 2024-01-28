import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { useAuthContext } from "../contexts/AuthContext";
import Onboarding from "../screens/Onboarding";
import SignIn from '../screens/Authentication/SignIn'
import SignUp from "../screens/Authentication/SignUp";
import ConfirmSignUp from "../screens/Authentication/ConfirmSignUp";
//import '@azure/core-asynciterator-polyfill'
import MealDetail from "../screens/Meals/MealDetail";
import MealScreen from "../screens/Meals/MealScreen";
import HostDetail from "../screens/Host/HostDetail";
import HostList from "../screens/Host/HostList";
import OrderSummary from "../screens/Checkout/OrderSummary";
import CheckOut from "../screens/Checkout/Checkout";
import Complete from "../screens/Checkout/Completed";
import BookingScreen from "../screens/BookingScreen";
import CuisineScreen from "../screens/CuisineScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPassword";
import ForgotPasswordReset from "../screens/Authentication/ForgotPasswordSubmit";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
const { onboardingCompleted, user, isAuthenticated } = useAuthContext();
  const initialRouteName = onboardingCompleted ? "Sign In" : "Onboarding";

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated===false ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false, title: "Onboarding"}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false, title: "Sign In"}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false, title: "Sign Up"}}
            />
            <Stack.Screen
              name="ConfirmSignUp"
              component={ConfirmSignUp}
              options={{ headerShown: false,title: "Confirm Sign Up"}}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{ headerShown: false,title: "Forgot Password"}}
            />
            <Stack.Screen
              name="ForgotPasswordReset"
              component={ForgotPasswordReset}
              options={{ headerShown: false ,title: "reset Password"}}
            />
          </>
        ) :(
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false, title: "Tab Navigator"}}
            />

            <Stack.Screen
              name="MealScreen"
              component={MealScreen}
              options={{ headerShown: false , title: "Meal Screen"}}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetail}
              options={{
                headerShown: false,
                presentation: "modal",
                cardStyle: { backgroundColor: "transparent" },
               title: "Meal Detail"

              }}
            />
            <Stack.Screen
              name="HostDetail"
              component={HostDetail}
              options={{ headerShown: false,title: "Host Detail"}}
            />
            <Stack.Screen
              name="HostList"
              component={HostList}
              options={{ headerShown: false ,title: "Host List"}}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{
                headerShown: false,
                presentation: "modal",
                cardStyle: { backgroundColor: "transparent",title: "Order Summary"},
              }}
            />
            <Stack.Screen
              name="Complete"
              options={{ headerShown: false,title: "Complete"}}
              component={Complete}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckOut}
              options={{ headerShown: false ,title: "Checkout"}}
            />
            <Stack.Screen
              name="BookingScreen"
              component={BookingScreen}
              options={{ headerShown: false ,title: "Booking Screen"}}
            />
            <Stack.Screen
              name="CuisineScreen"
              component={CuisineScreen}
              options={{ headerShown: false ,title: "Cuisine Screen"}}
            />
            <Stack.Screen
              name="FavoritesScreen"
              component={FavoritesScreen}
              options={{ headerShown: false,title: "Favorites Screen"}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
