import HomeScreen from "../../screens/HomeScreen";
import { render, fireEvent } from "@testing-library/react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Auth, DataStore } from "aws-amplify";
import Categories from "../../components/Categories/Categories";
import CountryRow from "../../components/FeaturedCountry/CountryRow";
import FeaturedRow from "../../components/Featured/FeaturedRow";
import FeaturedHostCards from "../../components/Featured/FeaturedHostCards";
import { NavigationContainer } from "@react-navigation/native";
import { getByText } from "@testing-library/react-native"; // Correct import
import { screen } from "@testing-library/react-native";
import { Category } from "../../models";
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

const mockCategory1 = {
  id: "caf687eb-519e-487f-92e7-95985b9332d8",
  name: "Spain",
  imageURI: "https://i.imgur.com/5ktcSzF.jpg",
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
  featured: true,
  featuredCountry: true,
  isCountry: true,
  isDiet: false,
  isStyle: false,
};
const mockCategory2 = {
  id: "caf687eb-519e-487f-92e7-95984329332d8",
  name: "Italy",
  imageURI: "https://i.imgur.com/5ktcSzF.jpg",
  createdAt: "2021-04-20T12:00:00.000Z",
  updatedAt: "2021-04-20T12:00:00.000Z",
  featured: true,
  featuredCountry: true,
  isCountry: true,
  isDiet: false,
  isStyle: false,
};

const featuredCategories = [mockCategory1, mockCategory2];


jest.mock("aws-amplify", () => ({
  DataStore: {
    query: jest.fn((model, options) => {
      if (options?.where?.featured === true) {
        return Promise.resolve([mockCategory1, mockCategory2]);
      }
      return Promise.resolve([]);
    }),
  },
}));

jest.mock("../../contexts/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));


jest.mock("../../components/FeaturedCountry/CountryRow", () => {
  return jest.fn();
});

jest.mock("../../components/Featured/FeaturedRow", () => {
  return jest.fn();
});

jest.mock("../../components/Featured/FeaturedHostCards", () => {
  return jest.fn();
});


describe("Testing Home Screen", () => {
  test("page renders dine with me text , View More and Try These ", async () => {
    // Mock the isAuthenticated value
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
    });

    // Mock any other dependencies here if needed

    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    render(component);
    const dineWithMeText = screen.getByText("Dine with a local friend");
    const viewMoreText = screen.getByText("View More");
    const tryThese = screen.getByText("Try These");
    expect(dineWithMeText).toBeTruthy();
    expect(viewMoreText).toBeTruthy();
    expect(tryThese).toBeTruthy();
  });

  test("page renders Categories", async () => {
    useAuthContext.mockReturnValue({
        isAuthenticated: true,
      });
  
      // Mock any other dependencies here if needed
  
      const component = (
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      );
      render(component);
    const categories = screen.getByTestId("categories");

    expect(categories).toBeTruthy();
  });
});
