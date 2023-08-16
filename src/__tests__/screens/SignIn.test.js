import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignIn from "../../screens/Authentication/SignIn";
import { useAuthContext } from "../../contexts/AuthContext";
import { act } from "react-test-renderer";
import { exp } from "react-native-reanimated";
import { Auth } from "aws-amplify";

jest.mock("../../contexts/AuthContext", () => {
  const setUser = jest.fn();
  const setIsAuthenticated = jest.fn();

  return {
    useAuthContext: jest.fn(() => ({
      setUser,
      setIsAuthenticated,
    })),
  };
});
jest.mock("aws-amplify", () => {
  return {
    Auth: {
      signIn: jest.fn(),
      query: jest.fn(),
    },
  };
});

describe("SignIn", () => {
  beforeEach(() => {
    // Mock the return values of useAuthContext as needed for each test case
    useAuthContext.mockClear();
    Auth.signIn.mockClear();
    useAuthContext.mockReturnValue({
      setIsAuthenticated: jest.fn(),
      setUser: jest.fn(),
    });
  });
  it("renders the SignIn screen correctly", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<SignIn />);
    // Perform assertions or checks on the rendered components
    const username = getByPlaceholderText("Enter Email");
    const password = getByPlaceholderText("Enter Password");
    const loginButton = getByTestId("loginButton");
  });


  it("calls the signIn function when the login button is pressed", () => {
    const { getByTestId } = render(<SignIn />);
    const loginButton = getByTestId("loginButton");
    act(() => {
      fireEvent.press(loginButton);
    });
    // Perform assertions or checks on the expected behavior
  });

  // Add more test cases as needed
});
