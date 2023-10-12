import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import '@azure/core-asynciterator-polyfill'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {illustrations} from '../UI/images';
import {Colors} from '../UI/colors';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../contexts/OrderContext';
import BookingListItem from '../components/Booking/BookingListItem';

import {useAuthContext} from '../contexts/AuthContext';
/*
    BOOKING SCREEN
    1. Purpose : Shows the meal bookings that the user has made

*/

const BookingScreen = () => {
  //const [activeTab, setActiveTab] = useState('Past');
  const navigation = useNavigation();
  const {orders} = useOrderContext();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const {setRefreshBooking} = useOrderContext();
  const {isAuthenticated} = useAuthContext();

  useEffect(() => {
    if (isFocused) {
      setRefreshBooking(true);
    }
  }, [isFocused, setRefreshBooking]);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <View testID='booking-list-item' style={styles.container}>
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
    
      <View style={styles.body}>
        {orders && 
          orders.length === 0 ? (
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Image source={illustrations.illustration_cook_THREE.url} style={styles.sorryImage} />
              <Text style={{fontSize: 20, fontFamily: 'Now-Bold'}}>
                No Bookings yet....
              </Text>
            </View>
          ):
          <FlatList
          data={orders}
          style={styles.flatList}
          renderItem={({item}) => <BookingListItem order={item} />}
        />
        }
        
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
