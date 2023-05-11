import { View, Text ,StyleSheet,Image, SafeAreaView} from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { useAuthContext } from '../contexts/AuthContext';

import { Colors } from '../UI/colors';
import { useNavigation } from '@react-navigation/native';
//


const buttonLabel = label => {
    return (
      <View style={{padding: 12}}>
        <Text style={{color: 'black', fontFamily: 'Inter-Regular', fontSize: 18}}>{label}</Text>
      </View>
    );
  };
const slides = [
    {
      id: 1,
      title: 'Welcome to Diner',
      description: 'Experience the best authentic food with a local friend',
      image: require('../UI/Illustrations/World-pana.png'),
    },
    {
      id: 2,
      title: 'A variety of cuisines',
      description: 'Select from a wide range of cuisines from around the world ',
      image: require('../UI/Illustrations/Order_food-bro.png'),
    },
    {
      id: 3,
      title: 'Explore nearby hosts and meals',
      description:
        'Choose a meal from a local host and enjoy a unique dining experience',
      image: require('../UI/Illustrations/Address-amico.png'),
    },
    {
      id: 4,
      title: 'Make a booking',
      description:
        'Select a date and time, arrive hungry and let your taste buds do the rest',
      image: require('../UI/Illustrations/Date_picker-cuate.png'),
    },
  ];
  

const Onboarding = ({navigation}) => {
  const {completeOnboarding}= useAuthContext();

  const handleDone = () => {
    completeOnboarding();
    navigation.navigate('SignIn');
  }
  return (
    <AppIntroSlider
    data={slides}
    renderItem={({item}) => {
      return (
        <SafeAreaView
          style={{flex: 1,alignItems: 'center', justifyContent: 'center',backgroundColor:'white'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.sliderImg} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionDescription}>
              {item.description}
            </Text>
          </View>
        </SafeAreaView>
      );
    }}
    activeDotStyle={{backgroundColor: Colors.primaryBrand,width: 30}}
    showSkipButton
    renderNextButton={() => buttonLabel('Next')}
    renderSkipButton={() => buttonLabel('Skip')}
    renderDoneButton={() => buttonLabel('Done')}
    onDone={handleDone}
  />
);
}

export default Onboarding;

const styles= StyleSheet.create({
  sectionDescription: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Now-Light',
    color: 'black',
  },
  highlight: {
    fontWeight: 'bold',
  },
  sliderImg: {
    width: 400,
    height: 450,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Now-Bold',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  descriptionContainer: {
    width: 370,
    height: 100,
    padding: 15,
    backgroundColor: Colors.primaryAccent3,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 0.2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

})