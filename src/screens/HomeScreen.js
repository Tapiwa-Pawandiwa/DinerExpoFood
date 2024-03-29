import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import Categories from '../components/Categories/Categories';
import {Colors} from '../UI/colors';
import FeaturedRow from '../components/Featured/FeaturedRow';
import CountryRow from '../components/FeaturedCountry/CountryRow';
import {useNavigation} from '@react-navigation/native';
import {logoImages} from '../UI/images';
import { useIsFocused } from '@react-navigation/native';
import FeaturedHostCards from '../components/Featured/FeaturedHostCards';
import { useAuthContext } from '../contexts/AuthContext';
import { Animated } from "react-native";

const av = new Animated.Value(0);
av.addListener(() => {return});
/* 
    HOME SCREEN 
    1. Purpose : Home Screen is the first screen a user sees when they open the app after logging in 
    2. It contains the featured hosts , featured meals and style categories. 
*/

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);

const {isAuthenticated} = useAuthContext();
const [refreshing, setRefreshing] = useState(false);





  useEffect(() => {
    if (isFocused) {
      setRefresh(!refresh);
    }
  }, [isFocused]);


  const onRefresh = () => {
    // You can put the logic to refresh your data here
    // For example, make an API call or update your state
    setRefreshing(true);
    // Perform your refresh logic here...

    // Once the refresh is complete, setRefreshing to false
    setTimeout(() => {
      // Perform any logic to update or re-fetch your data here
  
      // Set refreshing to false to hide the loading indicator
      setRefreshing(false);
    }, 1000)
  };

  if (!isAuthenticated) {
    return null;
  }
  return (
    
    <View style={styles.homeContainer} testID="homeScreen">

       <Image source={logoImages.primaryLogo.url} style={styles.logoImage} />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Dine with a local friend</Text>
        <Image
          style={styles.headingImage}
          source={require("../UI/Illustrations/eating_together_2.png")}
        />
      </View>
      <ScrollView style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View style={styles.subHeadingContainer}>
          <Text style={styles.tryText}>Try These</Text>
          <TouchableOpacity
            style={styles.seeMoreBtn}
            onPress={() => navigation.navigate("Categories")}>
            <Text style={styles.seeMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderContianer} testID="categories">
          <Categories />
        </View>
        <View testID="meals"style={styles.featuredContainer}>
          <FeaturedRow title={"Featured Meals"}/>
        </View>
        <View testID="countries" style={styles.featuredContainer}>
          <CountryRow title={"Featured Countries"} />
        </View>
        <FeaturedHostCards testID="hosts" type="featured"/>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    marginTop: 10,
  },
  headingText: {
    fontFamily: "Now-Bold",
    fontSize: 32,
    width: "55%",
    marginTop: 16,
  },
  featuredContainer: {
    marginRight: 10,
    marginTop: 5,
  },
  sliderContianer: {
    marginBottom: 2,
  },
  headingContainer: {
    flexDirection: "row",
    marginRight: 10,
    justifyContent: "space-around",
  },
  headingImage: {
    width: 100,
    height: 90,
    resizeMode: "cover",
  },
  imageContainer: {
    alignItems: "flex-end",
    justifyContent:"'flex-end",
  },
  seeMoreText: {
    color: Colors.primaryBlue,
    alignSelf: "center",
    padding: 5,
  },
  tryText: {
    color: Colors.primaryBlue,
    fontFamily: "Now-Medium",
    fontWeight: "400",
    marginTop: 8,
    fontSize: 20,
    marginLeft: 10,
  },
  seeMoreBtn: {
    borderColor: "black",
    backgroundColor: Colors.primaryAccent3,
    borderRadius: 20,
    padding: 5,
    marginRight: 20,
    width: 100,
  
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',

  },
  subHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },

  logoImage: {
    width: 150,
    height: 100,
    marginTop: 60,
    paddingBottom: 0,
    borderColor: 'black',
    resizeMode: "cover",
    alignSelf:"center",
  },
});
