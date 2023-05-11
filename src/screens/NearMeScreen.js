import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { DataStore } from "aws-amplify";
import { Meal, Host } from "../models";

import CustomMarker from "../components/CustomMarker/marker";
import { Colors } from "../UI/colors";
import { useNavigation } from "@react-navigation/native";
//import GetLocation from 'react-native-get-location';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

const NearMeScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [meals, setMeals] = useState([]);
  const [hosts, setHosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(userLat, 'USERLAT')
  /*
  const requestLocationPermission = async () => {
    try {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (granted === 'granted') {
        console.log('You can use the location');
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            console.log(location);
            setUserLat(location.latitude);
            setUserLong(location.longitude);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      } else {
        console.log('location permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  */
  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await DataStore.query(Meal);
      setMeals(meals);
    };
    fetchMeals();
  }, []);

  const handleMarkerPress = (host) => {
    console.log("HOST CLICKED");
    navigation.navigate("HostDetail", { hostObj: host });
  };

  //for every meal get the host and store in the host array
  useEffect(() => {
    const fetchHosts = async () => {
      const hosts = await Promise.all(
        meals.map(async (meal) => {
          const host = await DataStore.query(Host, meal.hostID);
          return host;
        })
      );
      const uniqueHosts = Array.from(new Set(hosts.map((host) => host.id))).map(
        (id) => hosts.find((host) => host.id === id)
      );
      setHosts(uniqueHosts);
    };

    fetchHosts();
  }, [meals]);

  return (
    <View style={styles.homeContainer}>
      {/* {userLat && userLong && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: userLat,
            longitude: userLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {hosts.map(host => (
            <CustomMarker
              key={host.id}
              coordinate={{
                latitude: host.lat,
                longitude: host.lng,
              }}
              onPress={() => handleMarkerPress(host)}
            />
          ))}
        </MapView>
      )}
            */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
        latitude: userLat,
        longitude: userLong,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default NearMeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
