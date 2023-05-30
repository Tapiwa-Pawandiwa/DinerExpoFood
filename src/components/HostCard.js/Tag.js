import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../UI/colors";

const Tag = ({ name }) => {
  return (
    <View style={styles.tagsCard}>
      <Text style={styles.tagsTxt}>{name}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
    tagsTxt:{
        color: Colors.primaryBlue,
        fontSize: 12,
      },
      tagsCard:{
        backgroundColor: Colors.menuGray2,
        borderRadius: 10,
        padding: 5,
        marginRight: 5, 
        marginTop: 5,
        width: 100,
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignSelf: 'center',
      },
});


