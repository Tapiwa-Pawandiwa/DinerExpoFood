import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataStore } from "aws-amplify";
import "@azure/core-asynciterator-polyfill";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../UI/colors";
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";
import * as Calendar from "expo-calendar";

const OrderSummary = ({ route }) => {
  const [quantity, setQuantity] = useState(0);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [newDate, setNewDate] = useState(null);
  const [basketMealID, setBasketMealID] = useState();
  const [newTime, setNewTime] = useState(null);
  const [total, setTotal] = useState();
  const [value, onChangeText] = useState("Requests:");
  const {
    mealContext,
    setMealContext,
    totalCost,
    updateBasketMealQuantity,
    setTotalCost,
    basket,
    basketMeals,
    hostContext,
  } = useBasketContext();

  const { mealObj } = route.params;
  const navigation = useNavigation();
  //based on this mealObj set the mealContext
  useEffect(() => {
    
    if (basket && basketMeals.length > 0 && mealContext) {
      setMealContext(mealObj);
      setQuantity(basketMeals[0].quantity);
      setTotalCost(mealObj.price * [basketMeals[0].quantity]);
      setBasketMealID(basketMeals[0].id);
    }
  }, [mealObj, basketMeals]);

  useEffect(() => {
    if (basketMeals.length > 0 && basketMeals[0].mealID === mealObj.id) {
      setBasketQuantity(basketMeals[0].quantity);
    } else {
      setBasketQuantity(0);
    }
  }, [basketMeals]);

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

  function onMinus() {
    if (basket !== null && basketMeals.length > 0) {
    const newQuantity = quantity - 1;
    if (newQuantity == 0) {
      alert("You cannot have less than 1 item");
    } else {
      updateBasketMealQuantity(mealObj.id, newQuantity, basketMeals[0].id);
      setQuantity(newQuantity);
      setTotalCost(mealObj.price * newQuantity);
    }
  } else {
    return;
  }
  }
  function onPlus() {
    if (basket !==null && basketMeals.length > 0){
        const newQuantity = quantity + 1;
    if (newQuantity > mealObj.plates) {
      alert("You have selected too many plates");
    } else {
      updateBasketMealQuantity(mealObj.id, newQuantity, basketMeals[0].id);
      setQuantity(newQuantity);
      setTotalCost(mealObj.price * newQuantity);
    }
    }else {
      return;
    }
  
  }

  const handleCheckout = () => {
    navigation.navigate("Checkout");
    //pass in requests
  };



  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{
          position: "absolute",
          top: 30,
          left: 10,
          backgroundColor: "#F1F2F3",
          padding: 5,
          borderRadius: 20,
        }}
      >
        <MaterialCommunityIcons
          name="chevron-down"
          size={35}
          color={"black"}
          onPress={() => navigation.goBack()}
        />
      </Pressable>
      <View style={styles.headContainer}>
        <Text style={styles.checkText}>Order Items</Text>
      </View>
      <View style={styles.itemListContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.mealName}>
            <Text style={styles.nameText}>{mealObj.name}</Text>
            <View style>
              <Text style={styles.dateText}>{newDate}</Text>
              <Text style={styles.timeText}>{newTime}</Text>
            </View>
          </View>
          <View style={styles.mealPrice}>
            <Text style={styles.priceText}>
              {mealObj.price} {"\u20AC"}
            </Text>
          </View>
        </View>
        <View style={styles.mealQuantity}>
          <AntDesign
            name="minuscircleo"
            size={20}
            color="black"
            onPress={onMinus}
          />
          { basketMeals && basketQuantity ? (
              <Text style={styles.quantity}>{quantity}</Text>
          ): (
            <Text style={styles.quantity}>0</Text>
          )
        
}
          <AntDesign
            name="pluscircleo"
            size={20}
            color="black"
            onPress={onPlus}
          />
        </View>
      </View>
      <View>
      {/*
      <Text style={styles.headingText}>Special Requests</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter your special requests here"
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
*/}  
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginTop: 20,
        }}
      />
      <View style={styles.costContainer}>
        <Text style={styles.costText}>Total</Text>
        <Text style={styles.costText}>
          {totalCost}
          {"\u20AC"}
        </Text>
      </View>
      <Pressable onPress={handleCheckout} style={styles.reserveButton}>
        <Text style={styles.orderButtonText}>Go to Checkout</Text>
      </Pressable>
     
    </SafeAreaView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  headContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  mealName: {
    width: "70%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    flexWrap: "wrap",
    fontSize: 16,
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  timeText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "grey",
  },
  priceText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.primaryBlue,
  },
  dateText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "grey",
  },
  mealPrice: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    height: 40,
  },
  checkText: {
    fontSize: 26,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Now-Bold",
  },
  orderButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    alignContent: "center",
  },
  reserveButton: {
    position: "absolute",
    bottom: 50,

    left: 100,
    width: 200,
    height: 50,
    alignItems: "center",

    backgroundColor: Colors.primaryBrand,
    padding: 10,
    borderRadius: 10,
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  costText: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Inter-Regular",
    fontWeight: "500",
    margin: 10,
  },
  itemCostText: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
  costTextContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: Colors.primaryBrand,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemListContainer: {
    backgroundColor: Colors.primaryAccent3,
    padding: 10,
    alignContent: "center",
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  inputContainer: {
    backgroundColor: Colors.primaryAccent3,
    padding: 10,
    borderRadius: 10,
    height: 70,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  mealQuantity: {
    backgroundColor: Colors.primaryAccent2,
    width: 110,
    marginLeft: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Inter-Regular",
    marginBottom: 10,
  },
});
