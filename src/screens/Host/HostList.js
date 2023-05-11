import {View, Text, StyleSheet, Image,Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React,{useState,useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HostImages} from '../../UI/images';
import {useNavigation} from '@react-navigation/native';
import {illustrations} from '../../UI/images';
import {Colors} from '../../UI/colors';
import Calender from '../Calender';
import { Meal } from '../../models';
import { Host } from '../../models';
import '@azure/core-asynciterator-polyfill'
import { DataStore } from 'aws-amplify';
import HostMealCard from '../../components/HostMealCard/HostMealCard';
import { ScrollView } from 'react-native-gesture-handler';

const HostList = ({route}) => {
  const navigation = useNavigation();
  const [host, setHost] = useState({});
  const [meals, setMeals] = useState([]);

  const {hostObj} = route.params;


  //query the host table using the host id
  useEffect(() => {
    async function fetchHost() {
      const host = await DataStore.query(Host, hostObj.id);
      setHost(host);
    }
    fetchHost();
  }, [hostObj.id]);

 //render meals where the host id matches the host id of the incoming hostObj
  useEffect(() => {
    async function fetchMeals() {
      const meals = await DataStore.query(Meal, (c)=> c.hostID.eq(hostObj.id).and(c.available.eq(true)));
      setMeals(meals);
      console.log(meals)
    }
    fetchMeals();
  }, [hostObj.id]);
 


  //screen responsible for showing all meals associated with
  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.headerContainer}>
        
      <Pressable
            style={{
              position: 'absolute',
              top: 30,
              left: 15,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20,
            }}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          </Pressable>
        <View style={styles.hostContainer}>
          <View>
                      <Text style={styles.hostnameText}>{host.first_name}{host.last_name}</Text>
            <Text>{host.country}</Text>  
              <Text style={styles.hostLocationText}>{host.address}</Text>
          </View>
            
          <View style={styles.hostImageContainer}>
            <Image source={{uri:host.imageURI}} style={styles.host} />
          </View>  
          
        </View>
        
      </View>
      <View style={styles.mealTextContainer}>
          <Text style={styles.myMealsTxt}>My Meals</Text>
        </View>
      <ScrollView contentContainerStyle={styles.mealsContainer} contentInset={{ top: 5 }} >
   
          {meals && meals.length > 0 && (
    <>
      
      {meals.map((meal, index) => (
        

      
        <HostMealCard key={index} mealObj={meal}/>
      ))}
    </>
  )}
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  illustration: {
    width: 200,
    height: 200,

    marginTop: 20,
  },
  hostContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
  },
  mealsContainer:{
    marginTop: 20,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  mealTextContainer: {
   
    
    backgroundColor: Colors.primaryAccent3,
  
    marginTop: 20,
    width: 400,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 60,

 

  
  },
  horizontal: {
    width: 500,
    height: 20,
    backgroundColor: Colors.primaryBrand,
  },
  host: {
    width: 120,
    padding: 10,
    height: 120,
    borderColor: Colors.primaryBrand,
    borderWidth: 2,
    borderRadius: 40,
  },
  hostImageContainer: {
    marginLeft: 70,

  },
  myMealsTxt: {
    fontSize: 40,
    fontFamily: 'Now-Bold',
    alignContent: 'center',
    alignItems: 'center',


    marginLeft: 0,
  

  },
  hostnameText: {
    fontSize: 30,
    marginTop: 30,
    fontFamily: 'Now-Bold',

  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.primaryAccent2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    left: 0,
    right: 0,
  },
});
