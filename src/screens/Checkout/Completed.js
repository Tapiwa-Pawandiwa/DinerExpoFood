import { View, Text, Image, StyleSheet, Platform, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../UI/colors";
import { useNavigation } from "@react-navigation/native";
import "@azure/core-asynciterator-polyfill";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { illustrations, logoImages } from "../../UI/images";
import { Reservation, Meal, Host } from "../../models";
import Amplify, { DataStore } from "aws-amplify";
import * as Calendar from "expo-calendar";
import moment from "moment";
import { useBasketContext } from "../../contexts/BasketContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Complete = (cal) => {
  const navigation = useNavigation();
  const { mealContext } = useBasketContext();
  const [status, setStatus] = useState("");

  const date = mealContext.date;
  const time = mealContext.time;

  // create AN EVENT OBJECT

  //combining the date and time into a single moment.js object
  const mealDateTime = moment
    .utc(`${date} ${time}`)
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  
  const handleAddToCalendar = async () => {
    // Request permission to access the user's calendar
    const { status } = await Calendar.getCalendarPermissionsAsync();
    if (status !== "granted") {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        // The user has not granted permission
        return;
      }
    }
    // Combine the date and time into a single moment.js object
   // const mealDateTime = moment.utc(`${date} ${time}`).toDate();
    console.log(mealDateTime);
    // Create an event objectw
    const event = {
      title: "Diner dinner: " + mealContext.name,
      startDate: mealDateTime,
      endDate: moment(mealDateTime).add(1, "hour").toDate(),
      notes: "Precise location directions will be provided via email",
    };

    try {
      // Create the event in the user's default calendar
      const calendarId = await getDefaultCalendarId();
      const eventId = await Calendar.createEventAsync(calendarId, event);
      console.log(`Event created with ID: ${eventId}`);
      alert("Your reservation has been added to your calendar");
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
      //alert("Could not add reservation to calendar");
    }
  };

  const getDefaultCalendarId = async () => {
    const calendars = await Calendar.getCalendarsAsync(
      Platform.OS === "ios" ? Calendar.EntityTypes.EVENT : undefined
    );
    const defaultCalendar = calendars.find(
      (cal) => cal.title === "Calendar" || cal.source.name === "Calendar"
    );
    return defaultCalendar.id;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>Thank you for the booking !</Text>
        <Text style={styles.headText}>See you soon !</Text>
      </View>
      <Image source={logoImages.primaryLogo.url} style={styles.logo} />
      <Image
        source={illustrations.illustration_cook_one.url}
        style={styles.illustration}
      />
      <Text style={styles.downloadStyle}>
        Add the reservation to your calendar
      </Text>
      <View style={styles.calenderContainer}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={handleAddToCalendar}
        >
          <Image source={logoImages.calendarAdd.url} style={styles.calendar} />
          <Text style={{ fontSize: 15, paddingTop: 10 }}>Add to calendar</Text>
        </TouchableOpacity>
      </View>
      <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text style={{ fontSize: 20, paddingTop: 10 , fontFamily: 'Inter-Regular' , color: Colors.primaryBrand}}>Go back to Home</Text>
        </Pressable>
    </SafeAreaView>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  homeButton:{
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  illustration: {
    width: 250,
    height: 250,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  calendarButton: {
    backgroundColor: Colors.primaryAccent2,
    padding: 10,
    width: 150,
    borderRadius: 10,
    height: 100,
    alignContent: "center",
    alignItems: "center",
  },
  headText: {
    fontSize: 20,
    fontFamily: "Now-Bold",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  calenderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    alignContent: "center",
    alignItems: "center",
  },
  downloadStyle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    alignSelf: "center",
    justifyContent: "center",
  },
  headContainer: {
    marginTop: 100,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  logo: {
    width: 200,
    height: 150,
    alignSelf: "center",
  },
  calendar: {
    width: 50,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
