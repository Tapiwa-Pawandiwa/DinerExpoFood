import {View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { Auth, DataStore } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import { logoImages } from '../UI/images';
import { useAuthContext } from '../contexts/AuthContext';


const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {completeOnboarding}= useAuthContext();
  const {isAuthenticated, authUser, setIsAuthenticated,setUser, setOnboardingComplete,dbUser,} = useAuthContext();
//Since the TabNavigator is not yet loaded and registered as a navigator, you cannot navigate to it directly.
//Replace allows you to remove the current screen from the stack and replace it with a new screen, which in this case is the TabNavigator screen.

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      console.log('Sign in successful');
      setIsAuthenticated(true);
      fetchCustomer();
      navigation.navigate('TabNavigator', {
        screen: 'Home',
     
      });
      
      //clear the input fields
        setUsername('');
        setPassword('');
    } catch (error) {
      console.log('Error signing in...', error);
    }
  }
  //fetch customer from the database and setUser

  const fetchCustomer = async ()=>{
    try{
      DataStore.query(Customer, c => c.email.eq(username)).then((customer)=>{
        setUser(customer)
      }
      )
    }catch (error){
      console.log(error,'error fetching customer')
    }
  }



  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={logoImages.primaryLogo.url} style={styles.logo} />
        <Text style={styles.title}>Sign In To your Account</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Login" onPress={()=> signIn()} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordButtonText}>
              Forgot Password? 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
  logo:{
    width: 200,
    height: 200,
  }
});
