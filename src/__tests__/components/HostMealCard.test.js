import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HostMealCard from "../../components/HostMealCard/HostMealCard";


// here we test that the meal name, meal image and host image are rendered correctly
     //i have mocked the Amplify datastore and mocked the user, meal and host data
     
jest.mock('aws-amplify', () => ({
    DataStore: {
      query: jest.fn((_, id) => {
        if (id === mockMeal.id) {
          return Promise.resolve(mockMeal);
        } else if (id === mockHost.id) {
          return Promise.resolve(mockHost);
        }
      }),
    },
  }));

  jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
      }),
    };
  });

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
  describe("HostMealCard", () => {
    it("renders meal Name , meal image and host image correctly", async() => {
      const {getByTestId} = render(<HostMealCard mealObj={mockMeal} />);
      await waitFor(() => {
        expect(getByTestId('mealName')).toBeTruthy();
      });
      await waitFor(() => {
        expect(getByTestId('mealImage')).toBeTruthy();
      });
      await waitFor(() => {
        expect(getByTestId('hostImage')).toBeTruthy();
      }
      );
    });
  });

