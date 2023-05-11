import { View, Text ,Image,StyleSheet} from 'react-native'
import React ,{useEffect,useState} from 'react'
import { Colors } from '../../UI/colors'
import { useNavigation } from '@react-navigation/native'
import '@azure/core-asynciterator-polyfill'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { illustrations, logoImages } from '../../UI/images'
import { Reservation, Meal, Host } from '../../models'
import { DataStore } from 'aws-amplify'
import moment from 'moment'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { useBasketContext } from '../../contexts/BasketContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCalenderEvent from 'react-native-add-calendar-event';

const Complete = (cal) => {
  const {mealContext} = useBasketContext();

  const date = mealContext.date;
  const time = mealContext.time;

  console.log(date, 'date')
  console.log(time, 'time')
  //combining the date and time into a single moment.js object
  const mealDateTime = moment.utc(`${date} ${time}`).format('YYYY-MM-DDTHH:mm:ss.SSSZ');


  const handleAddToCalendar = () => {
    const eventConfig = {
      title: 'Diner dinner : ' + mealContext.name,
      startDate: mealDateTime,
      endDate: moment.utc(mealDateTime).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };
  
    AddCalendarEvent.presentEventCreatingDialog({
      ...eventConfig,
      startDate: mealDateTime,
      endDate: moment.utc(mealDateTime).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    })
    .then(eventInfo => {
      // handle success (receives event info) or dismissing the modal (receives false)
      console.log(eventInfo);
      alert('Your reservation has been added to your calendar');
    })
    .catch(error => {
      // handle error such as when user rejected permissions
      console.log(error);
    });

    navigation.navigate('TabNavigator');

    };
  
  const navigation = useNavigation();
  //after download take user back to homes screen and update the bookings screen with the users booking 


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
           <Text style={styles.headText}>Thank you for the booking !</Text>
           <Text style={styles.headText}>See you soon !</Text>
      </View>
      <Image source={logoImages.primaryLogo.url} style={styles.logo}/>
        <Image source={illustrations.illustration_cook_one.url} style={styles.illustration}/>
       
     
      <Text style={styles.downloadStyle}>Add the reservation to your calendar</Text>
      <View style={styles.calenderContainer}>
        <TouchableOpacity style={styles.calendarButton} onPress={handleAddToCalendar}>
          <Image source={logoImages.calendarAdd.url} style={styles.calendar}/>
            <Text style={{fontSize: 15,paddingTop: 10}}>
              Add to calendar
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'white',
  },
  illustration: {
    width: 250,
    height: 250,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  calendarButton:{
    backgroundColor: Colors.primaryAccent2,
    padding: 10,
    width: 150,
    borderRadius: 10,
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
  },
  headText:{
    fontSize: 20,
    fontFamily: 'Now-Bold',
    alignSelf: 'center',  
    justifyContent: 'center',
    alignContent: 'center',

  },
  calenderContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:20,
    alignContent: 'center',
    alignItems: 'center',
  },
  downloadStyle:{
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    alignSelf: 'center',
    justifyContent: 'center',

  },
  headContainer:{
   marginTop: 100,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo:{
    width: 200,
    height: 150,
    alignSelf: 'center',
  
  },
  calendar:{
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
});
