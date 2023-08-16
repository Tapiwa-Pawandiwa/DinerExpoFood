import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../UI/colors";
import { Host } from "../../models";
import { Meal } from "../../models";
import "@azure/core-asynciterator-polyfill";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
//need to add date , allergens etc
//NEED A RANDOM DATE GENERATOR OR SOMETHING

/*
Host Meal Card : 
- renders the meal and host info on a card 
- renders the meal image and host image side by side 
- puts meal name, host name, date, time, location, plates left on the card
- when pressed, navigates to the meal screen
*/

const HostMealCard = ({ mealObj }) => {
  const [host, setHost] = useState({});
  const [meal, setMeal] = useState({});
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {isAuthenticated}= useAuthContext();
  //query the datastore using the meal id\

  if(isAuthenticated==true){
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      DataStore.query(Meal, mealObj.id),
      DataStore.query(Host, mealObj.hostID),
    ])
      .then(([meal, host]) => {
        setMeal(meal);
        setHost(host);
      })
      .catch((error) => {
        console.log(error, "error fetching meal and host");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [mealObj, meal]);
}
  //Fetch the meal using the mealID from the datastore

  //fetch the hosting using the hostID from the meal but query the host table

  const handlePress = () => {
    navigation.navigate("MealScreen", { mealObj: meal });
  };
if(isAuthenticated==true){
  useEffect(() => {
    setIsLoading(true);
    const handleDate = () => {
      if (meal.date) {
        const splitDate = meal.date.split("-");
        const year = splitDate[0];
        const month = splitDate[1];
        const day = splitDate[2];
        const date = new Date(year, month, day);
        const newDate = date.toDateString();
        setNewDate(newDate);
        setIsLoading(false);
      } else {
        setNewDate("No Date Set");
      }
    };
    handleDate();
  }, [meal.date, meal]);

  useEffect(() => {
    if (meal.time) {
      const [hours, minutes] = meal.time.split(":");
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
  }, [meal.time, meal]);
}
  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primaryBrand} />
        </View>
      ) : (
        host &&
        meal && (
          <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>
              <Image
                testID="mealImage"
                source={{ uri: meal.imageURI }}
                style={styles.mealStyle}
              />
              <Image
                testID="hostImage"
                source={{ uri: host.imageURI }}
                style={styles.hostStyle}
              />
            </View>
            <View style={styles.headingContainer}>
              <View style={styles.subHeadContainer}>
                <Text testID="mealName" style={styles.headingStyle}>
                  {meal.name}
                </Text>
              </View>
              <View style={styles.hostContainerTxt}>
                <Text style={styles.hostText}>Host: {host.first_name}</Text>
                <Text style={styles.detailsText}>
                  <MaterialCommunityIcons
                    name="bowl-mix"
                    size={18}
                    color={Colors.primaryBrand}
                  />{" "}
                  {meal.plates} plates left
                </Text>
              </View>
              <Text style={styles.dateTxt}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={18}
                  color={Colors.primaryBrand}
                />
                {"  "}
                {newDate}
              </Text>
              <Text style={styles.detailsText}>
                <MaterialCommunityIcons
                  name="clock"
                  size={18}
                  color={Colors.primaryBrand}
                />
                {"  "}
                {newTime}
              </Text>
              <View>
                <Text style={styles.detailsText}>
                  <Ionicons
                    name="location-sharp"
                    size={18}
                    color={Colors.primaryBrand}
                  />{" "}
                  {host.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      )}
    </>
  );
};

export default HostMealCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    backgroundColor: "#ffffff",
    width: 250,
    height: 250,
  },
  imageContainer: {
    height: 100,
    width: 250,
    flexDirection: "row",
    borderRadius: 20,
    marginLeft: 0,
  },
  mealStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginLeft: 10,
    borderTopLeftRadius: 10,
  },
  hostStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 10,
  },
  hostText: {
    color: Colors.primaryBlue,
    marginTop: 5,
    fontSize: 16,
  },
  detailsText: {
    color: Colors.menuGray,
    marginRight: 10,
    marginTop: 4,
  },
  dateTxt: {
    color: Colors.menuGray,
    marginRight: 10,
    marginTop: 4,
  },
  headingContainer: {
    paddingBottom: 16,
    paddingRight: 12,
    paddingLeft: 12,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 1,
    padding: 5,
    paddingRight: 10,
  },
  headingStyle: {
    marginTop: 2,
    fontFamily: "Inter-Medium",
    //text wrap

    paddingTop: 2,
    fontSize: 16,
  },
  detailsContainer: {
    flexDirection: "row",

    marginTop: 10,
  },
  subHeadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
  },
  hostContainerTxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
  },
});
