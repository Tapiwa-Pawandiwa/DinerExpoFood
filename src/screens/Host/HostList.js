import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HostImages } from "../../UI/images";
import { useNavigation } from "@react-navigation/native";
import { illustrations } from "../../UI/images";
import { Colors } from "../../UI/colors";
import Calender from "../Calender";
import { Meal } from "../../models";
import { Host } from "../../models";
import "@azure/core-asynciterator-polyfill";
import Amplify, { DataStore } from "aws-amplify";
import HostMealCard from "../../components/HostMealCard/HostMealCard";
import { ScrollView } from "react-native-gesture-handler";

const HostList = ({ route }) => {
  const navigation = useNavigation();
  const [host, setHost] = useState({});
  const [meals, setMeals] = useState([]);

  const { hostObj } = route.params;

  //query the host table using the host id
  useEffect(() => {
    try {
      async function fetchHost() {
        const host = await DataStore.query(Host, hostObj.id);
        setHost(host);
      }
      fetchHost();
    } catch (e) {
      console.log(e);
    }
  }, [hostObj]);

  //render meals where the host id matches the host id of the incoming hostObj
  useEffect(() => {
    try {
      async function fetchMeals() {
        const meals = await DataStore.query(Meal, (m) =>
          m.hostID.eq(hostObj.id)
        );
        setMeals(meals);
      }
      fetchMeals();
    } catch (e) {
      console.log(e);
    }
  }, [hostObj]);

  //screen responsible for showing all meals associated with
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={{
            position: "absolute",
            top: 30,
            left: 15,
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
        <View style={styles.hostContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.hostNameContainer}>
              <Text style={styles.hostnameText}>
                {host.first_name} {host.last_name}
              </Text>
            </View>
            <View style={styles.hostSummaries}>
              <Text style={styles.country}>{host.country}</Text>
              <MaterialCommunityIcons name="map-marker" size={20} />
              <Text style={styles.hostLocationText}>{host.address}</Text>
            </View>
          </View>

          <View style={styles.hostImageContainer}>
            <Image source={{ uri: host.imageURI }} style={styles.host} />
          </View>
        </View>
      </View>
      <View style={styles.mealTextContainer}>
        <Text style={styles.myMealsTxt}>My Meals</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.mealsContainer}
        contentInset={{ top: 5 }}
      >
        {meals && meals.length > 0 && (
          <>
            {meals.map((meal, index) => (
              <HostMealCard key={index} mealObj={meal} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  illustration: {
    width: 200,
    height: 200,

    marginTop: 20,
  },
  hostSummaries: {
    flexDirection: "row",
  },
  hostNameContainer: {
    width: "60%",
    flexWrap: "wrap",
  },
  hostContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 20,
  },
  mealsContainer: {
    marginTop: 20,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  mealTextContainer: {
    backgroundColor: Colors.primaryAccent3,
    marginTop: 20,
    width: 200,
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
    borderRadius: 20,
    alignSelf: "center",
  },
  horizontal: {
    width: 500,
    height: 20,
    backgroundColor: Colors.primaryBrand,
  },
  host: {
    width: 100,
    padding: 10,
    height: 100,
    borderColor: Colors.primaryBrand,
    borderWidth: 2,
    borderRadius: 40,
  },
  hostImageContainer: {
    marginLeft: 70,
  },
  country: {
    fontSize: 20,
    fontFamily: "Now-Regular",
    marginRight: 10,
  },
  hostLocationText: {
    fontSize: 20,
    fontFamily: "Now-Regular",
  },
  myMealsTxt: {
    fontSize: 30,
    fontFamily: "Now-Bold",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },
  hostnameText: {
    fontSize: 30,
    marginTop: 15,
    fontFamily: "Now-Bold",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.primaryAccent2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

    height: 200,
    top: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    left: 0,
    right: 0,
  },
});
