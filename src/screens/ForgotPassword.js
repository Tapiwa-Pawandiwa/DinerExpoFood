import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Auth} from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logoImages} from '../UI/images';
import {useAuthContext} from '../contexts/AuthContext';
import {ForgotPassword} from 'aws-amplify-react-native';
import '@azure/core-asynciterator-polyfill'



/*

    Custom Forgot Password Screen
    1. Purpose : To allow users to reset their password
    after inserting their email and receiving a code they navigate to a screen 
    where they are asked to change their password 

*/

const ForgotPasswordScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
 


  const handleForgot = async () => {
    try{
        await Auth.forgotPassword(username)
        navigation.navigate('ForgotPasswordReset',{username})
    }catch(e){
        Alert.alert('Error',e.message)
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={logoImages.primaryLogo.url} style={styles.logo} />
        <Text style={styles.title}>Forgot your Password ?</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Please enter your Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppButton title="Login" onPress={handleForgot} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButtonText}>
             Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
