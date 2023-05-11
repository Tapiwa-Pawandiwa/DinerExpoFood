import {View, Text, ScrollView,ActivityIndicator,StyleSheet} from 'react-native';
import React from 'react';
import {countryImages} from '../../UI/images';
import '@azure/core-asynciterator-polyfill'

import { Category } from '../../models';
import { DataStore } from 'aws-amplify';
import CountryCard from '../CountryCard/CountryCard';
import {Colors} from '../../UI/colors';
import {useState, useEffect} from 'react';
const FullCountryRow = () => {
  //query all countries from the database
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 


  useEffect(() => {
    setIsLoading(true);
    const fetchCountries = async () => {
      const countries = await DataStore.query(Category, (c) => c.isCountry.eq(true));
      setCountries(countries);
      setIsLoading(false);
    };
    fetchCountries();
  }, []);

  return (
    <ScrollView>
      {
        isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryBrand} />
        ) : (
          <>
           <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 12}}>
        {countries.map(country => (
          <CountryCard
            key={country.id}
            category={country}
          />
        ))}
      </ScrollView>
          </>
        )
      }
     
    </ScrollView>
  );
};

export default FullCountryRow;


const styles = StyleSheet.create({

});
