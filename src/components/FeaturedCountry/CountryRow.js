import { View, Text, StyleSheet , ActivityIndicator} from "react-native";
import React from "react";
import { Colors } from "../../UI/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Category } from "../../models";
import { useState } from "react";
import { useEffect } from "react";
import '@azure/core-asynciterator-polyfill'
import { DataStore } from "aws-amplify";

import CountryCard from "../CountryCard/CountryCard";
import { useAuthContext } from "../../contexts/AuthContext";

const CountryRow = ({ description , title}) => {

  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {isAuthenticated}=useAuthContext();
  //fetch featuredCountries from Category table
if(isAuthenticated===true){
  useEffect(() => {
    setIsLoading(true);
    const fetchFeaturedCountries = async () => {
      const featuredCountries = await DataStore.query(Category, (c) => c.featuredCountry.eq(true));
      setFeaturedCountries(featuredCountries);
      setIsLoading(false);
    };
    fetchFeaturedCountries();
  }, []);
}
  



  return (
    <View style={styles.Container}>
      {
        isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryBrand} />
        ) : (
          <>
            <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
        {/*<AntDesign name="arrowright" style={{marginRight:20}}size={24} color={Colors.primaryBlue} />*/}
      </View>
      <Text style={styles.description}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        style={styles.featuredScroll}
      >
        {/*Meal SLidr / diner slider  */}
          {featuredCountries.map((featuredCountry) => (
            <CountryCard key={featuredCountry.id} type="home" category={featuredCountry}/>
          ))}


  
      </ScrollView>
          </>)
      }
    
    </View>
  );
};

export default CountryRow;

const styles = StyleSheet.create({
  Container: {
    marginBottom: 5,
  },
  featuredScroll: {
    marginLeft: 20,
    height: 100
  },
  cards:{
  },
  rowContainer: {
    flexDirection: "row",
    //marginTop: 5,

  },
  title: {
    fontFamily: 'Now-Medium',
    fontWeight: '400',
    fontSize: 20,
    color: Colors.primaryBlue,
    marginLeft:20,
  },
  description: {
    color: Colors.menuGray,
    marginLeft:20,
    marginBottom: 5,
    marginTop: 2,
  },
});
