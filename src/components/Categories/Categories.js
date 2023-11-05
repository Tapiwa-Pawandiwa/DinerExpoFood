import { ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import CategoryCard from './CategoryCard';
import {Category} from '../../models';
import {DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import {Colors} from '../../UI/colors';

const Categories = () => {
  // query the category store and get the categories
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //query categories where the categrory.featured = true
  // QUERY THE FIRST 5 CATEGORIES

  //query all categories
  useEffect(() => {
    setIsLoading(true);
    const fetchFeaturedCategories = async () => {
      const featuredCategories = await DataStore.query(Category, c =>
        c.featured.eq(true),
      );
      setFeaturedCategories(featuredCategories);
      setIsLoading(false);
      //so this becomes an array of category objects
    };
    fetchFeaturedCategories();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 10}}>
      {/* 
      i need to map over the featured category array of objects , and for each object , i need to fetch the name and image property 
      and pass it to the category card component
      featuredCategories.map((category, index) => (
        <CategoryCard key={index} imgUrl={featuredCategories.} />
    */}
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primaryBrand} />
      ) : (
        featuredCategories.map(category => (
          <CategoryCard key={category.id} category={category} type="home" />
        ))
      )}
    </ScrollView>
  );
};

export default Categories;
