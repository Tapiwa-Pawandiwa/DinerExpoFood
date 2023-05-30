import React,{useEffect,useState} from "react";
import { View, Text, StyleSheet, Image, StatusBar ,Platform,ScrollView} from "react-native";
import { illustrations } from "../UI/images";
import { Colors } from "../UI/colors";
import CuisineRow from "../components/MainCategory/CuisineRow";
import DietRow from "../components/MainCategory/DietRow";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryRow from "../components/FeaturedCountry/CountryRow";
import FullCountryRow from "../components/MainCategory/FullCountryRow";
import PopularFood from "../components/MainCategory/PopularFood";
import { DataStore } from "aws-amplify";
import '@azure/core-asynciterator-polyfill'
import { Category } from "../models";
import SearchBar from "../components/Search/SearchBar";
import FeaturedHostCards from "../components/Featured/FeaturedHostCards";

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await DataStore.query(Category);
    setCategories(categories);
  };

  const searchCategories = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const categories = await DataStore.query(Category, (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(categories);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSearchResults(false);
  };


  return (      
  <View style={{backgroundColor: 'white', flex: 1,}}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Categories</Text>
        <Image source={illustrations.bowl.url} style={styles.headingImage} />
      </View>
    <ScrollView style={styles.homeContainer}>
      <View style={styles.body}>
        <View style={styles.cuisineStyle}>
          <Text style={styles.subHeadingText}>Cuisine</Text>
       <CuisineRow /> 
        </View>
        <View style={styles.cuisineStyle}>
          <Text style={styles.subHeadingText}>Diet</Text>
           <DietRow />
        </View>
        <View style={styles.cuisineStyle}>
          <Text style={styles.subHeadingText}>Country</Text>
          <FullCountryRow/>
        </View>
        <View style={styles.cuisineStyle}>
          <Text style={styles.subHeadingText}>Popular Foods</Text>
         <PopularFood/>
        </View>
        <View style={styles.cuisineStyle}>
          <Text style={styles.subHeadingText}>Hosts</Text>
          <FeaturedHostCards type='all'/>
        </View>
      </View>
    </ScrollView>
  </View>
 
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  homeContainer: {
 
    backgroundColor: '#ffffff'
  },
  subHeadingText: {
    fontFamily: "Now-Medium",
    fontWeight: '400',
    fontSize: 20,
    marginTop: 5,
    paddingBottom: 5,
    color: Colors.blue,
  },
  body: {
    marginLeft: 15,
    marginTop: 10,
  },
  headingImage: {
    width: 140,
    height: 140,
    marginTop: 15,
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
  headingContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor:Colors.primaryAccent1,
 borderBottomRightRadius: 300,
 borderBottomLeftRadius: 300,
    marginBottom: 10,

  },
  headingText: {
    fontFamily: "Now-Bold",
    fontSize: 40,
    marginTop: 70,
    marginRight: 10,
    color: 'white',
    
  },
  cuisineStyle:{
  padding: 5
  }
});
