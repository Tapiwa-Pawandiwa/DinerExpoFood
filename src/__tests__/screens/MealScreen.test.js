import MealScreen from "../../screens/Meals/MealScreen";
import { render, fireEvent, waitFor} from "@testing-library/react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Auth, DataStore } from "aws-amplify";
import { screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import BasketContextProvider, { useBasketContext } from "../../contexts/BasketContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";

const basketMeal = {
  id: "2kkc03a5e-c432-36fd-ad1a-40e8ede4789b",
  quantity: 1,
  basketID: "1jkc03a5e-c442-46fd-ad1a-50e8ede4789b",
  mealID: "02c03a5e-c442-46fd-ad1a-50e8ededfb7b",
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
};

const basket = {
  id: "1jkc03a5e-c442-46fd-ad1a-50e8ede4789b",
  customerID: "8ch03a5e-c442-46fd-ad1a-50e8edrrab7b",
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
};

const mockMeal = {
  id: "02c03a5e-c442-46fd-ad1a-50e8ededfb7b",
  hostID: "02c03a5e-c442-46fd-ad1a-50e8ededab7b",
  name: "Bobotie",
  description: "A South African classic",
  imageURI: "https://i.imgur.com/5ktcSzF.jpg",
  price: 10,
  plates: 10,
  time: "12:00",
  date: "2021-04-20",
  allergens: ["Dairy"],
  ingredients: ["Beef", "Eggs", "Bread"],
  tags: ["South African", "Beef"],
  available: true,
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
};
const mockHost = {
  id: "02c03a5e-c442-46fd-ad1a-50e8ededab7b",
  first_name: "Bob",
  last_name: "Bobson",
  email: "bob@gmail.com",
  description: "I love to cook",
  imageURI: "https://i.imgur.com/5ktcSzF.jpg",
  tags: ["South African", "Beef"],
  country: "South Africa",
  address: "123 Bob Street",
  lat: 123,
  lng: 123,
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
};

jest.mock("aws-amplify", () => ({
  DataStore: {
    save: jest.fn(),
    query: jest.fn(),
  },
}));

jest.mock("../../contexts/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("../../contexts/BasketContext", () => ({
  useBasketContext: jest.fn(() => ({
    basket: basket, // Provide your mock basket here
    basketMeals: [], // Provide your mock basketMeals here
    addMealToBasket: jest.fn(),
    updateBasketMealQuantity: jest.fn(),
    setHostContext: jest.fn(),
    setMealPlates: jest.fn(),
    setMealContext: jest.fn(),
    // Add other necessary functions and values here
  })),
}));

const OnAddToBasket = jest.fn();
jest.mock("../../contexts/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(() => ({
    setMealIsFavorite: jest.fn(),
  })),
}));


jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        mealObj: mockMeal, // Use your mockMeal object here
      },
    }),
  };
});



const setMealPlatesMock = jest.fn();
const useStateMock = (initialValue) => [initialValue, setMealPlatesMock];
jest.spyOn(React, "useState").mockImplementation(useStateMock);


describe("Meal Screen", () => {
  it("renders the addButton Meal Screen properly",async () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
    });
 
    const mockedRoute = {
      params: { mealObj: { ...mockMeal, plates: 10 } },
    };
    jest.spyOn(DataStore, "query").mockResolvedValue(mockHost);

    const component = (
      <NavigationContainer>
        <MealScreen route={mockedRoute} />
      </NavigationContainer>
    );
    render(component);
    await waitFor(() => {
      // Your assertions here
      const addButton = screen.getByTestId("addButton");
     expect(addButton).toBeTruthy();
    });
  });

  it("calls the updateBasketMealQuantity when the Add to order button is pressed",async () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
    });

    useBasketContext.mockReturnValue({
      basket: basket, // Provide your mock basket here
      basketMeals: [], // Provide your mock basketMeals here
      addMealToBasket: jest.fn(),
      updateBasketMealQuantity: jest.fn(),
      setHostContext: jest.fn(),
      setMealPlates: jest.fn(),
      setMealContext: jest.fn(),
      // Add other necessary functions and values here
    }); 
 

    const mockedRoute = {
      params: { mealObj: { ...mockMeal, plates: 10 } },
    };
    jest.spyOn(DataStore, "query").mockResolvedValue(mockHost);

    const component = (
      <NavigationContainer>
        <MealScreen route={mockedRoute} />
      </NavigationContainer>
    );
    render(component);
    await waitFor(() => {
      // Your assertions here
      const addButton = screen.getByTestId("addButton");
      fireEvent.press(addButton);
      expect(useBasketContext().addMealToBasket).toHaveBeenCalledTimes(1);
   
    });
  });
 


});


