import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Auth} from 'aws-amplify';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logoImages} from '../../UI/images';
import {useAuthContext} from '../../contexts/AuthContext';
import {ForgotPassword} from 'aws-amplify-react-native';
import '@azure/core-asynciterator-polyfill'

/* 

    Custom Forgot Password Screen
    1. Purpose : To allow users to reset their password


*/
const ForgotPasswordReset = ({route,navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [userName, setUserName] = useState('');

 const [code, setCode] = useState('');

  const {username} = route.params;
    
  const handleForgot = async () => {
        try{
            await Auth.forgotPasswordSubmit(userName,code,newPassword)
            Alert.alert('Success', 'Password changed successfully! 🎉 You can now sign in.', [
            { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
          ]);

        }catch{
            Alert.alert('Error',e.message)
        }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={logoImages.primaryLogo.url} style={styles.logo} />
        <Text style={styles.title}>Forgot your Password ?</Text>
           <AppTextInput
          name= "username"
          value={userName}
          onChangeText={text => setUserName(text)}
          leftIcon="account"
          placeholder="Please enter your Email"
          autoCapitalize="none"
          rules={{required: true}}
         
        />  
         <AppTextInput
         value={code}
            name="code"
          onChangeText={text => setCode(text)}
          leftIcon="format-list-numbered"
          placeholder="Please enter the code you received"
          autoCapitalize="none"
          rules={{required: true}}
         
        /> 
   

        <AppTextInput
            value={newPassword}
            name="newPassword"
            onChangeText={text => setNewPassword(text)}
            leftIcon="lock"
            placeholder="New Password"
            autoCapitalize="none"
            secureTextEntry
            textContentType="password"
            />

        <AppButton title="Submit Code" onPress={handleForgot} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordReset;

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
