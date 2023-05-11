import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import {useAuthContext} from '../contexts/AuthContext';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ConfirmSignUp from '../screens/ConfirmSignUp';
//import '@azure/core-asynciterator-polyfill'
import MealDetail from '../screens/Meals/MealDetail';
import MealScreen from '../screens/Meals/MealScreen';
import HostDetail from '../screens/Host/HostDetail';
import HostList from '../screens/Host/HostList';
import OrderSummary from '../screens/Checkout/OrderSummary';
import CheckOut from '../screens/Checkout/Checkout';
import Complete from '../screens/Checkout/Completed';
import BookingScreen from '../screens/BookingScreen';
import CuisineScreen from '../screens/CuisineScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ForgotPasswordReset from '../screens/ForgotPasswordSubmit';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {onboardingCompleted, user, isAuthenticated} = useAuthContext();
  const initialRouteName = onboardingCompleted ? 'Sign In' : 'Onboarding';
 
  return (
  <NavigationContainer>
       <Stack.Navigator>
       {!isAuthenticated ? (
          <>
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
              options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ConfirmSignUp"
                component={ConfirmSignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
               options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPasswordReset"
                component={ForgotPasswordReset}
                options={{headerShown: false}}
              />
        
          </>
        ) : (
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MealScreen"
              component={MealScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetail}
              options={{
                headerShown: false,
                presentation: 'modal',
                cardStyle: {backgroundColor: 'transparent'},
              }}
            />
            <Stack.Screen
              name="HostDetail"
              component={HostDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HostList"
              component={HostList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{
                headerShown: false,
                presentation: 'modal',
                cardStyle: {backgroundColor: 'transparent'},
              }}
            />
            <Stack.Screen
              name="Complete"
              options={{headerShown: false}}
              component={Complete}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckOut}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookingScreen"
              component={BookingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CuisineScreen"
              component={CuisineScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
