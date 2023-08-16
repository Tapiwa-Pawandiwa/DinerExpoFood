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
  const [activeTab, setActiveTab] = useState("Meals");
  return (
    <View>
      <View style={styles.switchContainer}>
        <HeaderButton
          text="Meals"
          btnColor={Colors.primaryBlue}
          textColor="#FFFFFF"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <HeaderButton
          text="Hosts"
          icon1={
            <FontAwesome name={"user"} size={20} color={Colors.menuGray}/>
          }
          icon2={<AntDesign name="user" size={20} color={"white"} />}
          btnColor="#FFFFFF"
          textColor="black"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
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
              props.activeTab === props.text ? Colors.primaryBrand : "white",
          },
        ]}
        onPress={() => props.setActiveTab(props.text)}
      >
        <Text
          style={{
            color:
              props.activeTab === props.text ? "white" : Colors.primaryBlue,
              fontFamily : 'Inter-Bold',
              fontSize : 16
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
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  locationContainer: {
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
    textAlign: 'center'
  },
 
  
});
