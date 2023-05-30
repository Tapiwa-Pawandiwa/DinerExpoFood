import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../../UI/colors";
import Amplify, { DataStore } from "aws-amplify";
import { Category, FeaturedHost } from "../../models";
import { Host } from "../../models";
import HostCard from "../HostCard.js/HostCard";
import { countryImages } from "../../UI/images";

const FeaturedHostCards = ({ type }) => {
  const [featuredHosts, setFeaturedHosts] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [country, setCountry] = useState(null);
  const [allHosts, setAllHosts] = useState([]);
  useEffect(() => {
    async function fetchFeaturedHosts() {
      const fetchedFeaturedHosts = await DataStore.query(FeaturedHost);
      setFeaturedHosts(fetchedFeaturedHosts);
    }
    fetchFeaturedHosts();
  }, []);

  useEffect(() => {
    async function fetchHosts() {
      const fetchedHosts = await Promise.all(
        featuredHosts.map(async (featuredHost) => {
          const host = await DataStore.query(
            Host,
            featuredHost.featuredHostHostId
          );
          return host;
        })
      );
      setHosts(fetchedHosts);
      console.log(hosts, "FETCHED HOSTS");
    }
    fetchHosts();
  }, [featuredHosts]);

  useEffect(() => {
    async function fetchAllHosts() {
      const fetchedHosts = await DataStore.query(Host);
      setAllHosts(fetchedHosts);
    }
    fetchAllHosts();
  }, []);

  return (
    <View style={styles.rowBox}>
        {type ==="featured" && 
         <View style={styles.rowContainer}>
        <Text style={styles.title}>Featured Hosts</Text>
      </View>
        }
     
      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
      >
        {type === "featured" &&
          hosts
            .filter((host) => host)
            .map((host) => <HostCard key={host.id} hostObj={host} />)}

        {type === "all" &&
          allHosts
            .filter((host) => host)
            .map((host) => <HostCard key={host.id} hostObj={host} />)}
      </ScrollView>
    </View>
  );
};

export default FeaturedHostCards;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 5,
  },

  title: {
    fontFamily: "Now-Medium",
    fontWeight: "400",
    fontSize: 20,
    color: Colors.primaryBlue,
  },
  rowBox: {
    marginBottom: 10,
  },
});
