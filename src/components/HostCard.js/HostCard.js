import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../UI/colors";
import { Avatar } from "react-native-elements";
import {
  illustrations,
  images,
  HostImages,
  countryImages,
} from "../../UI/images";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Amplify, { DataStore } from "aws-amplify";
import { Category, FeaturedHost } from "../../models";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Host } from "../../models";
import Tag from "./Tag";

const HostCard = ({ hostObj }) => {
  const navigation = useNavigation();
  const [host, setHost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState(null); //country object from the country table

  useEffect(() => {
    async function fetchCountry() {
      try {
        const country = await DataStore.query(Category, (c) =>
          c.name.eq(hostObj.country)
        );
        setCountry(country);
      } catch (error) {
        console.log(error, "error fetching country");
      }
    }
    fetchCountry();
  }, [hostObj]);
  //console.log(hostObj, "HOST OBJECT");

  const handleProfilePress = () => {
    navigation.navigate("HostDetail", { hostObj: hostObj });
  };

  //run through categoroes and get that equal to the host country
  if (!hostObj) {
    return null; // Return null if hostObj, categories, or country is not available
  }

  const firstTwoTags = hostObj.tags.slice(0, 2); //I DONT WANT TO CLUTTER THE HOST CARD WITH TAGS

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleProfilePress}>
      <View style={styles.orangeContainer}>
        <Image
          source={{ uri: hostObj.imageURI }}
          style={styles.hostImg}
          resizeMode="cover"
        />
      </View>
      <View style={styles.whiteContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>
            {hostObj.first_name} {hostObj.last_name}
          </Text>
          {country && country.length > 0 && (
            <Image
              source={{ uri: country[0]?.image }}
              style={styles.countryImg}
            />
          )}
        </View>
     
        <Text style={styles.sumTxt}>Cuisine</Text>
        <View style={styles.tagContainer}>
          {firstTwoTags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HostCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 15,
    marginRight: 10,
  },
  sumTxt: {
    color: Colors.primaryBrand,
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    alignSelf: 'center',


  },
  tagsTxt: {
    color: Colors.primaryBlue,
    fontSize: 12,
  },
  orangeContainer: {
    backgroundColor: "#FFF4F1",
    paddingTop: 10,
    paddingBottom: 40, // Adjust this value as needed
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 120,
    position: "relative", // Add this line
    zIndex: 1, // Add this line
  
  },
  hostImg: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primaryBrand,


  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: Colors.primaryBrand,
    elevation: 5,
  },
  countryImg: {
    width: 20,
    height: 20,
  },
  tagsCard: {
    backgroundColor: Colors.menuGray2,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
    marginTop: 5,
    width: 60,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  whiteContainer: {
    backgroundColor: "white",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "relative", // Add this line
    top: -30, // Adjust this value as needed
    zIndex: 2, // Add this line
  },

  name: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: Colors.primaryBlue,
  },
});
