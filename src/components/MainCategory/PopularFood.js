import { View, Text ,ScrollView, ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react';
import { DataStore } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import CategoryCard from '../Categories/CategoryCard';
import { images } from '../../UI/images';
import { Category } from '../../models';

const PopularFood = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchPopularFoods = async () => {
       const popularFoods = await DataStore.query(Category, (c) => c.isPopular.eq(true));
        setPopularFoods(popularFoods);
    };
    fetchPopularFoods();
  }, []);

  return (
   
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 10 }}
  >
    {popularFoods.map((popularFood)=>(
      <CategoryCard key={popularFood.id} category={popularFood} />
    ))}
  </ScrollView>
  )
}

export default PopularFood