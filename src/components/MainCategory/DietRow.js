import { ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import { DataStore } from "aws-amplify";
import '@azure/core-asynciterator-polyfill'
import { Category } from "../../models";
import CategoryCard from "../Categories/CategoryCard";

const DietRow = () => {
  const [dietMeals, setDietMeals] = useState([]);


  useEffect(() => {
    const fetchDiets = async () => {
      const dietMeals = await DataStore.query(Category, (c) => c.isDiet.eq(true));
      setDietMeals(dietMeals);
 
    };
    fetchDiets();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
     {dietMeals.map((dietMeal)=>(
      <CategoryCard key={dietMeal.id} 
      category={dietMeal}
      type='category'/>
     ))}
    </ScrollView>
  );
};

export default DietRow;
