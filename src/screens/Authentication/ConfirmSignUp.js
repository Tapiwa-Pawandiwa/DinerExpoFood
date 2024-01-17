import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import '@azure/core-asynciterator-polyfill'
import { createCustomer } from './createCustomer';
/*
    Custom Confirm Sign Up Screen
    1. Purpose : To allow users to confirm their sign up once they have received a code in their email
*/

export default function ConfirmSignUp({route, navigation }) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');
  const { name, family_name,password, username: signUpUsername } = route.params;

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      await Auth.signIn(username, password);

    
      console.log("Username:", username);
      console.log("Auth Code:", authCode);

      const user = await Auth.currentAuthenticatedUser();
      if(user){
        createCustomer(name,family_name,signUpUsername);
        console.log("Customer created");
      }else {
        console.log("Customer not created");
      }
      await Auth.signOut();
      Alert.alert('Success', 'Code confirmed! 🎉 You can now sign in.', [
        { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
      ]);


    } catch (error) {

      Alert.alert(   
        'Error',
        'Verification code does not match. Please enter a valid verification code.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      console.log(
     error,
      );
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username/email again"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput 
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
    container: {
      flex: 1,
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      color: '#202020',
      fontWeight: '500',
      marginVertical: 15
    }
  });
