import React,{useState,useEffect} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { DataStore } from "aws-amplify";
import '@azure/core-asynciterator-polyfill'
import { Category } from "../../models";
import CategoryCard from "../Categories/CategoryCard";
const CuisineRow = () => {
  const [cuisines, setCuisineMeals] = useState([]);
  
  useEffect(() => {
    try {
      const fetchCuisine = async () => {
        const cuisineMeals = await DataStore.query(Category, (c) => c.isRegion.eq(true));
        setCuisineMeals(cuisineMeals);
      };
      fetchCuisine();
    }
    catch (e) {
      console.log(e);
    }

  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
        {/* 
          <CuisineCard imgUrl={cuisine.asian.url} title="Asian" />
      <CuisineCard imgUrl={cuisine.african.url} title="African" />
      <CuisineCard imgUrl={cuisine.middle_eastern.url} title="Middle Eastern" />
      <CuisineCard imgUrl={cuisine.europe.url} title="Europe" />
      <CuisineCard imgUrl={cuisine.american.url} title="American" />
        */}
        {cuisines.map((cuisineMeal)=>(
      <CategoryCard key={cuisineMeal.id} category={cuisineMeal} type='category'/>
     ))}
       
    </ScrollView>
  );
};

export default CuisineRow;
