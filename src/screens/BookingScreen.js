import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {illustrations} from '../UI/images';
import {Colors} from '../UI/colors';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../contexts/OrderContext';
import HeaderTabs from '../components/HeaderTabs';
import BookingListItem from '../components/Booking/BookingListItem';

const HeaderButton = props => {
  return (
    <View>
      {/*
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor:
              props.activeTab === props.text ? Colors.primaryBrand: 'white',
          },
        ]}
        onPress={() => props.setActiveTab(props.text)}>
        <Text
          style={{
            color:
              props.activeTab === props.text ? 'white' : 'black',
              fontFamily: 'Inter',
              fontSize: 16,
            
          }}>
          {props.text}{' '}
          {props.activeTab === props.text ? props.icon2 : props.icon1}
        </Text>
      </TouchableOpacity>
          */}
    </View>
  );
};

const BookingScreen = () => {
  const [activeTab, setActiveTab] = useState('Past');
  const navigation = useNavigation();
  const {orders} = useOrderContext();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headingRow}>
          <Text style={styles.headText}>Bookings</Text>
          <Image source={illustrations.booking.url} style={styles.imageStyle} />
        </View>
        <Pressable
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 20,
          }}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      </View>
      <View style={styles.switchContainer}>
        <HeaderButton
          text="Past"
          btnColor={Colors.primaryBrand}
          textColor="#FFFFFF"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <HeaderButton
          text="Upcoming"
          btnColor="#FFFFFF"
          textColor="black"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/*HeaderButton */}
        {/*HeaderButton */}
      </View>
      <View style={styles.body}>
        <FlatList
          data={orders}
          style={styles.flatList}
          renderItem={({item}) => <BookingListItem order={item} />}
        />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  /*switchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 30,
  },
  */
  buttonStyle: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  body: {
    backgroundColor: 'white',
    margin: 15,
  },
  flatList: {
    marginBottom: 20,
  },
  headText: {
    fontSize: 45,
    marginRight: 10,
    marginTop: 25,
    fontFamily: 'Now-Bold',
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryAccent2,

    height: 200,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginTop: 15,
  },
});