import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacityBase,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FavoriteMeal } from "../../models";
import { Colors } from "../../UI/colors";
import { Host } from "../../models";
import { useNavigation } from "@react-navigation/native";
import { Meal } from "../../models";
import "@azure/core-asynciterator-polyfill";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBasketContext } from "../../contexts/BasketContext";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import moment from "moment";
import { useFavoritesContext } from "../../contexts/FavoritesContext";

const deviceWidth = Dimensions.get("window").width;

/*
   MEAL SCREEN: 

   1. PURPOSE: Display the meal 


*/


const MealScreen = ({ route }) => {
  const [host, setHost] = useState({});
  const [meal, setMeal] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [mealLimit, setMealLimit] = useState(0);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const [mealPlates, setMealPlates] = useState(0);
  const [favoriteMeal, setFavoriteMeal] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const {  favoriteMeals, setFavoriteMeals, mealIsFavorite, setMealIsFavorite, toggleMealFavorites} = useFavoritesContext();
  
  const {
    basket,
    basketMeals,
    addMealToBasket,
    mealContext,
    setMealContext,
    setHostContext,
    hostContext,
    updateBasketMealQuantity,
  } = useBasketContext();
  const { mealObj } = route.params;
  //query the datastore using the meal id\
  //convert the date and time into UTC format
  
  useEffect(() => {
    // Clear the basket meal so we clear it once we move to a different meal
    async function fetchMeal() {
      const meal = await DataStore.query(Meal, mealObj.id);
      setMeal(meal);
      setMealContext(meal);
      setMealPlates(meal.plates);
    }
    // Check if basketMeals has any elements before accessing the first element
    if (basketMeals.length > 0 && basketMeals[0].mealID === mealObj.id) {
      setBasketQuantity(basketMeals[0].quantity);
      setShowBasket(true);
    } else {
      setShowBasket(false); // Reset showBasket if there is no matching basket meal
    }
    fetchMeal();
  }, [mealObj, basketMeals]);

  useEffect(() => {
    async function fetchHost() {
      const host = await DataStore.query(Host, mealObj.hostID);
      setHost(host);
      setHostContext(host);
    }
    fetchHost();
  }, [mealObj]);

  useEffect(() => {
    const handleDate = () => {
      if (mealObj.date) {
        const splitDate = mealObj.date.split("-");
        const year = splitDate[0];
        const month = splitDate[1];
        const day = splitDate[2];
        const date = new Date(year, month, day);
        const newDate = date.toDateString();
        setNewDate(newDate);
      } else {
        setNewDate("No Date Set");
      }
    };
    handleDate();
  }, [mealObj]);

  useEffect(() => {
    const handleTime = () => {
      if (mealObj.time) {
        const [hours, minutes] = mealObj.time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        const ampm = date.getHours() >= 12 ? "PM" : "AM";
        const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
        const formattedTime = `${date.getHours()}:${formattedMinutes} ${ampm}`;
        setNewTime(formattedTime);
      } else {
        setNewTime("No Time Set");
      }
    };
    handleTime();
  }, [mealObj]);
  
  useEffect(() => {
    // Check if the meal is in the user's favorite meals list
    const isFavorite = favoriteMeals.some(favoriteMeal => favoriteMeal.mealID === mealObj.id);
    setMealIsFavorite(isFavorite);
  }, [mealObj, favoriteMeals]);
  //useEffect to fetch the basketMeals quantity

  //fetch the associated host and meal from the datastore using the mealObj
  const handleProfilePress = () => {
    navigation.navigate("HostDetail", { hostObj: host });
  };
  const onMinus = () => {
    setQuantity(Math.max(1, quantity - 1));
  };
  const onPlus = () => {
    try {
      if (quantity < mealPlates || basketMeals[0].quantity < mealPlates) {
        setQuantity(quantity + 1);
      }
    } catch (error) {
      alert("You have reached the maximum number of plates for this meal");
    }
  };
  const toggleViewOrder = () => {
    if (basket && basketMeals.length > 0) {
      setShowBasket(true);
    } else {
      return;
    }
  };
  const handleOrderSum = () => {
    navigation.navigate("OrderSummary", { mealObj: meal });

    //pass the BasketItems to the OrderSummary Screen
  };

  const onAddToBasket = async () => {
    try {
      if (quantity + basketQuantity > mealPlates) {
        alert(
          "You have reached the maximum number of plates for this meal, please choose a lower quantity"
        );
        return;
      }
  
      // Check if there is an existing basket meal for the current meal
      const existingBasketMeal = basketMeals.find(
        (basketMeal) => basketMeal.mealID === mealObj.id
      );
  
      if (existingBasketMeal) {
        // Update the existing basket meal quantity
        const newQuantity = existingBasketMeal.quantity + quantity;
        await updateBasketMealQuantity(
          mealObj.id,
          newQuantity,
          existingBasketMeal.id
        );
      } else {
        // Add the meal to the basket
        await addMealToBasket(mealObj, quantity);
      }
  
      toggleViewOrder();
    } catch (error) {
      console.log("Error occurred while adding to basket:", error);
      // Handle the error, display an error message, or take appropriate actions
    }
  };
  return (
    <>
      {
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Image
              source={{ uri: mealObj.imageURI }}
              style={styles.headingImage}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 60,
                left: 10,
                backgroundColor: "white",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color={"black"}
                onPress={() => navigation.goBack()}
              />
            </Pressable>
            <Pressable
              style={{
                position: "absolute",
                top: 180,
                right: 20,
                backgroundColor: Colors.primaryBrand,
                padding: 5,
                borderRadius: 20,
              }}
            >
              <MaterialCommunityIcons
                name={mealIsFavorite ? "cards-heart" : "cards-heart-outline"}
                size={30}
                color={"white"}
                onPress={() => toggleMealFavorites()}
              />
            </Pressable>
            <Avatar
              source={{ uri: host.imageURI }}
              rounded
              size={80}
              containerStyle={styles.avatarContainer}
              onPress={handleProfilePress}
            />
          </View>

          <ScrollView style={{ marginTop: 210 }} decelerationRate={0}>
            <View style={styles.detailContainer}>
              <View style={styles.headingContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.mealName}>{mealObj.name}</Text>
                </View>
               
                   <View style={styles.price}>
                  <Text
                    style={{
                      fontFamily: "Inter-Regular",
                      fontSize: 20,
                      color: "black",
                    }}
                  >
                    {mealObj.price}
                    {"\u20AC"}
                  </Text>
                
                </View>
               
        
               
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.subText}>Details</Text>
              </View>
              <View style={styles.detailContentStyle}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={25}
                  color={Colors.primaryBrand}
                />
                <Text style={styles.detailHeadText}>Date:</Text>
                <View style={styles.detailContentTextContainer}>
                  <Text>{newDate}</Text>
                </View>
              </View>
              <View style={styles.detailContentStyle}>
                <MaterialCommunityIcons
                  name="clock"
                  size={25}
                  color={Colors.primaryBrand}
                />
                <Text style={styles.detailHeadText}>Time:</Text>
                <View style={styles.detailContentTextContainer}>
                  <Text>{newTime}</Text>
                </View>
              </View>
              <View style={styles.detailContentStyle}>
                <Entypo
                  name="location-pin"
                  size={25}
                  color={Colors.primaryBrand}
                />
                <Text style={styles.detailHeadText}>Location:</Text>
                <View style={styles.detailContentTextContainer}>
                  <Text>{host.address}</Text>
                </View>
              </View>
              <View style={styles.detailContentStyle}>
                <Entypo name="bowl" size={25} color={Colors.primaryBrand} />
                <Text style={styles.detailHeadText}>Plates Left:</Text>
                <View style={styles.detailContentTextContainer}>
                  <Text>{mealObj.plates}</Text>
                </View>
              </View>
<TouchableOpacity style={styles.priceInfo}   onPress={() =>
                      navigation.navigate("MealDetail", { mealObj: meal })
                    }>
   
                    <MaterialCommunityIcons
                      name="information"
                      size={30}
                      color={"black"}
                    />
               
                  <Text style={styles.infoText}>More Information</Text>
</TouchableOpacity>
             
              <View style={styles.row}>
                <AntDesign
                  name="minuscircleo"
                  size={30}
                  color={"black"}
                  onPress={onMinus}
                />
                <Text style={styles.quantity}>{quantity}</Text>

                <AntDesign
                  name="pluscircleo"
                  size={30}
                  color={"black"}
                  onPress={onPlus}
                />
              </View>
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={onAddToBasket}
              >
                <Text style={styles.detailsBtnText}>Add to Order</Text>
              </TouchableOpacity>
              <View>
                <View style={styles.row}></View>
              </View>
            </View>
          </ScrollView>

          {basketMeals.length > 0 && basket && (
            <Pressable onPress={handleOrderSum} style={styles.reserveButton}>
              <View style={styles.itemSum}>
                {basketMeals.length > 0 && (
                  // Make sure basketMeals is not empty
                  <View style={styles.basketStyles}>
                    <Text style={styles.itemSumText}>{basketQuantity}</Text>
                  </View>
                )}
                <Text style={styles.orderButtonText}>View Order</Text>
              </View>
            </Pressable>
          )}
        </View>
      }
    </>
  );
};

export default MealScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  extrasContainer: {
    flexDirection: "row",
  },
  innerExtras: {
    flex: 1,
    padding: 10,
  },
  extraImageContainer: {
    borderRadius: 30,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extraTextdescription: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "300",
  },
  extraText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
  },
  basketStyles: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    width: 35,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 10,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
  },
  extraTextprice: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    color: Colors.primaryBrand,
  },
  extraImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    resizeMode: "cover",
  },
  infoText:{
    fontFamily: "Inter-Regular",
    fontSize: 16,
    marginLeft: 10,
  },
  price: {
    backgroundColor: Colors.primaryAccent3,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  itemSum: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  itemSumText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "black",

    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  detailHeadText: {
    fontSize: 16,
    marginTop: 2,
    marginLeft: 5,
    fontFamily: "Inter-Regular",
  },
  orderButtonText: {
    color: "white",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
  buttonContainer: {
    backgroundColor: Colors.primaryBlue,

    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
  },
  detailContentTextContainer: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primaryAccent3,
    borderRadius: 10,
  },
  reserveButton: {
    backgroundColor: Colors.primaryBrand,
    padding: 10,
    margin: 10,
    //FIXED POSITION
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,

    borderRadius: 20,
  },
  priceInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: 190,
    flexDirection: "row",
   
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  subText: {
    fontFamily: "Now-Bold",
    fontSize: 20,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "500",
    marginBottom: 10,
  },
  defaultHeadText: {
    fontFamily: "Now-Bold",
    fontSize: 16,
    fontWeight: "400",
  },

  headingContainer: {
    padding: 10,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    alignContent: "center",
    alignItems: "center",
  },
  detailHeadingStyle: {
    padding: 5,
    flexDirection: "row",
  },
  detailContentStyle: {
    flexDirection: "row",
    marginBottom: 8,
    marginLeft: 10,
  },
  detailContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,

    marginTop: 10,
    backgroundColor: Colors.primaryAccent2,
    borderRadius: 20,
  },
  detailsBtnText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: Colors.primaryAccent3,
    marginTop: 30,
    marginLeft: 10,
    position: "absolute",
    right: 10,
    top: 10,
  },
  mealName: {
    fontFamily: "Now-Bold",
    fontSize: 25,
    marginRight: 5,
  },
  mealNameText: {},
  headingImage: {
    width: deviceWidth,
    height: 230,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: "75%",
    resizeMode: "cover",
  },
  DetailsContainer: {
    marginBottom: 10,
  },
  SubHeading: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "grey",
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 10,
  },
  detailsBtn: {
    backgroundColor: Colors.primaryAccent1,
    borderRadius: 10,
    marginLeft: 10,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    padding: 5,
    fontFamily: "Inter-Regular",
  },
  defaultText: {
    fontFamily: "Inter-Regular",
    color: "black",
    fontSize: 14,
    paddingRight: 40,
    paddingTop: 10,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
});
