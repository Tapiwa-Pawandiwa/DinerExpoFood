import CheckOut from "../../screens/Checkout/Checkout";
import { render, fireEvent } from "@testing-library/react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Auth, DataStore } from "aws-amplify";
import { screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";


//test when payment clicked Order is created and Reservation is created

//user clicks on Complete Payment
// onPress function goes to handlePayment function
//handlePayment function calls on the createOrder function from the createOrder form useOrdercontext

//createOrder does the following
//it needs basket and basketMeals

//if theres a host and basketMeals
// it creates a new order using the user id and the totalCost from basketContext

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
const mockCreateOrder = jest.fn();
jest.mock("aws-amplify", () => ({
  DataStore: {
    save: jest.fn(),
    query: jest.fn(),
  },
}));
jest.mock('../../contexts/OrderContext', () => ({
    useOrderContext: () => ({
      createOrder: mockCreateOrder,
    }),
  }));

jest.mock("../../contexts/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("../../contexts/BasketContext", () => ({
  useBasketContext: () => ({
    mealContext: {
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
    },
    hostContext: {
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
    },
  }),
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

describe("Checkout Screen", () => {

  it("renders the Checkout screen correctly", () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
    });

    const component = (
      <NavigationContainer>
        <CheckOut />
      </NavigationContainer>
    );
    const { getByText, getByTestId } = render(component);

    // Assertions for your screen elements
    const checkOutText = getByText("Checkout");
    const totalText = getByText("Total");
    const paymentText = getByText("Payment");
    const buttonText = getByText("Complete Payment");
    const nameText = getByText("Meal: Bobotie");
    const paymentButton = getByTestId("order-button"); //check if our complete payment button is present
    expect(paymentButton).toBeTruthy();
    expect(checkOutText).toBeTruthy();
    expect(totalText).toBeTruthy();
    expect(paymentText).toBeTruthy();
    expect(buttonText).toBeTruthy();
    expect(nameText).toBeTruthy();

    // Simulate a press event on the button
    fireEvent.press(paymentButton);

    // Expect that createOrder was called once
    expect(mockCreateOrder).toHaveBeenCalledTimes(1); //we are testing that the createOrder function is called when the button
});
});
