import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Amplify, { DataStore } from "aws-amplify";
import { Host, Meal, Order, OrderMeal, Reservation } from "../../models";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "@azure/core-asynciterator-polyfill";
import { Colors } from "../../UI/colors";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { ConsoleLogger } from "@aws-amplify/core";
import CustomMarker from "../../components/CustomMarker/marker";
import { useOrderContext } from "../../contexts/OrderContext";
import { useBasketContext } from "../../contexts/BasketContext";
import { useAuthContext } from "../../contexts/AuthContext";
const CheckOut = () => {
  const navigation = useNavigation();
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const {
    mealContext,
    totalCost,
    setHostContext,
    hostContext,
    baskeMeals,
    basket,
  } = useBasketContext();
  const { createOrder } = useOrderContext();
const { isAuthenticated } = useAuthContext();
  const handleCompletePayment = () => {
    navigation.navigate("Complete");
    createOrder();
    console.log("order creation");
  };

  useEffect(() => {
    const handleTime = () => {
      if (mealContext.time) {
        const [hours, minutes] = mealContext.time.split(":");
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
  }, [mealContext]);

  useEffect(() => {
    const handleDate = () => {
      if (mealContext.date) {
        const splitDate = mealContext.date.split("-");
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
  }, [mealContext]);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="dark-content" />

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Checkout</Text>
      </View>

      <View style={styles.mapContainer}>
        {hostContext && hostContext.lat && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: hostContext.lat,
              longitude: hostContext.lng,
              latitudeDelta: 0.2,
              longitudeDelta: 0.02,
            }}
          >
            <CustomMarker
              coordinate={{
                latitude: hostContext.lat,
                longitude: hostContext.lng,
              }}
            />
          </MapView>
        )}
      </View>

      <View>
        <View style={styles.detailsHeadContainer}>
          <Text style={styles.detailHeadText}>
            Reservation and Order Details{" "}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Meal: {mealContext.name}</Text>
          <Text>Host: {hostContext.first_name}</Text>
          <Text>Address: {hostContext.address}</Text>
          <Text>Time: {newTime}</Text>
          <Text>Date: {newDate}</Text>
        </View>
      </View>

      <Pressable
        style={{
          position: "absolute",
          top: 50,
          left: 15,
          backgroundColor: "#F1F2F3",
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
      <View style={styles.body}>
        <Text>Precise location will be provided by host upon approval</Text>
        <View style={styles.subHead}>
          <Text style={styles.payText}>Payment</Text>
        </View>
        <View style={styles.payDetailContainer}>
          <Text>VISA ****** 4356</Text>
          <Text>VISA</Text>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.totalCost}>
          <Text style={styles.totalCostText}>Total</Text>

          <Text style={styles.costText}>
            {totalCost}
            {"\u20AC"}
          </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Pressable
            onPress={handleCompletePayment}
            style={styles.reserveButton}
            testID="order-button"
            >
            <Text style={styles.orderButtonText}>Complete Payment</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  payDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  priceContainer: {},
  totalCost: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.primaryAccent2,
    marginTop: 10,
    borderRadius: 10,
  },
  reserveButton: {
    backgroundColor: Colors.primaryBrand,
    width: 300,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  orderButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    alignContent: "center",
    padding: 10,
  },
  mapContainer: {
    overflow: "hidden",
    padding: 10,
  },
  totalCostText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Inter-Regular",
    fontWeight: "500",
  },
  headingText: {
    fontSize: 30,
    marginTop: 10,
    color: "black",
    fontFamily: "Now-Bold",
  },
  costText: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
  },
  headingContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 270,
    borderRadius: 10,
  },
  subHead: {
    marginTop: 10,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
  },
  payText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    padding: 10,
  },
  body: {
    marginTop: 10,
    padding: 10,
  },
  detailsHeadContainer: {
    backgroundColor: Colors.primaryAccent1,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  detailHeadText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    alignSelf: "center",
  },
  detailsContainer: {
    backgroundColor: Colors.primaryAccent2,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Inter-Regular",
    marginBottom: 5,
  },
});
