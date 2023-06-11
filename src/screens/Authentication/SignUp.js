import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import "@azure/core-asynciterator-polyfill";
import { Customer } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";

/*
    Custom Sign Up Screen
    1. Purpose : To allow users to sign up for an account
*/



/*
  SIGN UP SCREEN
  1. This screen allows the user to sign up for an account.
  2. This is a custom sign up screen that uses the AWS Amplify Auth.signUp() method 
      to sign up the user.
  3. The user is then navigated to the ConfirmSignUp screen.
      - they should receive a code sent to their email address
  4. The user can also navigate to the SignIn screen if they already have an account.

*/

const SignUp = ({ navigation }) => {


  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [family_name, setFamilyName] = useState("");
  const [password, setPassword] = useState("");


  async function signUp() {
    try {
      
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          name,
          family_name,
        },
      });

      createCustomer();
      // create a customer in the database

      console.log("Sign up successful");


      navigation.navigate("ConfirmSignUp");
    } catch (error) {

      if (error.code === "UsernameExistsException") {
        Alert.alert(
          "Error",
          "An account with this email already exists. Please try again with a different email.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
      console.log("Error signing up...", error);
    }
  }

  const createCustomer = async () => {
    try {
      const customer = await DataStore.save(
        new Customer({
          first_name: name,
          last_name: family_name,
          email: username,
        })
      );
      console.log(customer, "customer created");
    } catch (error) {
      console.log(error, "error creating customer");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <AppTextInput
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon="account-details"
          placeholder="Enter your first name"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="emailAddress"
        />

        <AppTextInput
          value={family_name}
          onChangeText={(text) => setFamilyName(text)}
          leftIcon="asterisk"
          placeholder="Enter Last Name"
          autoCapitalize="none"
          keyboardType="default"
          autoCorrect={false}
        />

        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="at"
          placeholder="Enter Email (Username)"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCorrect={false}
        />

        <AppTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />

        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
});
