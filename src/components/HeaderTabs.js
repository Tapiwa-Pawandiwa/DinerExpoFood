import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import  AntDesign  from "react-native-vector-icons/AntDesign";
import { Colors } from "../UI/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//import {UserIcon,ChevronDownIcon,SearchIcon,AdjustmentsIcon} from 'react-native-heroicons';
import  Entypo  from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState } from "react";



const HeaderTabs = () => {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <View>
      <View style={styles.locationContainer}>
       
        <View style={styles.location}>
        <MaterialIcons name="location-on" size={30} color={Colors.primaryBrand}/>
          {/* MAKE THIS CLICKABLE BY WRAPPING IN TOUCHABLE OPACITY OR PRESSABLE  */}
          <Text style={styles.currentLocation}>
            Current Location{" "}
            <Entypo
              name="chevron-thin-down"
              size={16}
              color={Colors.primaryBrand}
            />
          </Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <HeaderButton
          text="Today"
          btnColor={Colors.primaryBlue}
          textColor="#FFFFFF"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <HeaderButton
          text="Select"
          icon1={
            <FontAwesome name={"calendar"} size={16} color={Colors.menuGray}/>
          }
          icon2={<AntDesign name="calendar" size={16} color={"white"} />}
          btnColor="#FFFFFF"
          textColor="black"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/*HeaderButton */}
        {/*HeaderButton */}
      </View>
    </View>
  );
};

export default HeaderTabs;

const HeaderButton = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor:
              props.activeTab === props.text ? Colors.primaryBlue : "white",
          },
        ]}
        onPress={() => props.setActiveTab(props.text)}
      >
        <Text
          style={{
            color:
              props.activeTab === props.text ? "white" : Colors.primaryBlue,
          }}
        >
          {props.text}{" "}
          {props.activeTab === props.text ? props.icon2 : props.icon1}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 30,
  },
  buttonStyle: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  locationContainer: {
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
    textAlign: 'center'
  },
  location: {
    alignSelf: "center",
    alignItems: "center",
    textAlign :'Center'
  },
  currentLocation: {
    fontSize: 18,
    fontFamily: "Arial",
    color: Colors.primaryBlue,
  },
});
