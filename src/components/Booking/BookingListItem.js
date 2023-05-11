import {View, Text, StyleSheet, Image} from 'react-native';
import {useState, useEffect} from 'react';
import {useOrderContext} from '../../contexts/OrderContext';
import {DataStore} from 'aws-amplify';
import {Order, OrderMeal, Meal, Host, Reservation} from '../../models';
import {foodImages} from '../../UI/images';
import {Colors} from '../../UI/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BookingListItem = ({order}) => {
  //get the mealID from the orderMeal table using the order.id

  const [meal, setMeal] = useState([]);
  const [host, setHost] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    const fetchOrderMeal = async () => {
      const orderMeal = await DataStore.query(OrderMeal, o =>
        o.orderID.eq(order.id),
      );
      const meal = await DataStore.query(Meal, orderMeal[0].mealID);
      const host = await DataStore.query(Host, h => h.id.eq(meal.hostID));
      console.log(meal, 'MEAL');
      setHost(host[0]);
      setMeal(meal);
    };
    fetchOrderMeal();
  }, [order.id]);

  useEffect(() => {
    const handleDate = () => {
      if (meal.date) {
        const splitDate = meal.date.split('-');
        const year = splitDate[0];
        const month = splitDate[1]-1;
        const day = splitDate[2];
        const date = new Date(year, month, day);
        const newDate = date.toDateString();
        setNewDate(newDate);
      } else {
        setNewDate('No Date Set');
      }
    };
    handleDate();
  }, [meal]);

  useEffect(() => {
    const handleTime = () => {
      if (meal.time) {
        const [hours, minutes] = meal.time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedMinutes = minutes.length === 1 ? `0${minutes}`: minutes;
        const formattedTime = `${date.getHours()}:${formattedMinutes} ${ampm}`;
        setNewTime(formattedTime);
      } else {
        setNewTime('No Time Set');
      }
    };
    handleTime();
  }, [meal]);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.foodImage} source={{uri: meal.imageURI}} />
      </View>

      <View style={styles.bookingHeaderContainer}>
        <Text style={styles.labelText}>Host: </Text>
        <Text style={styles.nameText}>
          {host.first_name} {host.last_name}
        </Text>
        <Text style={styles.mealNameText}>Date: {newTime}</Text>
        <Text style={styles.mealNameText}>Time: {newDate}</Text>
        <Text style={styles.mealNameText}>
          Cost: {order.total} {'\u20AC'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookingListItem;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 150,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.primaryBrand,
    borderWidth: 2,
    padding: 5,
    backgroundColor: Colors.primaryAccent2,
    marginBottom: 15,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 10,
    color: Colors.primaryBlue,
  },
  nameText: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: 'Inter-Regular',
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.primaryBrand,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageContainer: {
    width: 160,
    height: 130,
    alignSelf: 'center',
    marginLeft: 5,
  },
  bookingHeaderContainer: {
    width: 150,
    height: 100,
    margin: 5,
  },
  mealNameText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 10,
    marginTop: 5,
  },
});
