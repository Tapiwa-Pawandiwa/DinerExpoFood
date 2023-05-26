import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {logoImages, images} from '../UI/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../UI/colors';
import {Auth} from 'aws-amplify';
import {useAuthContext} from '../contexts/AuthContext';
import {Customer} from '../models';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {isAuthenticated, setIsAuthenticated, setUser, user, authUser} =
    useAuthContext();
  //get user details from authUser

  //using the auth user details, query the user table to get the user details

  //  useEffect(() => {
  //    async function fetchUser() {
  //      const user = await DataStore.query(Customer, authUser.attributes.sub);
  //      setUser(user);
  //    }

  console.log('user info :', user);



  useEffect(() => {
    // redirect the user to the sign-in screen as soon as the authentication state changes to false
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await Auth.signOut();
      console.log('Signed out successfully');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log('Error signing out: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return null;
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.headerStyle}>
        <View style={styles.imageContainer}>
          <Image source={logoImages.primaryLogo.url} style={styles.logoStyle} />
        </View>
        <View style={styles.headingContainer}>
          {user && user[0]?.imageURI ? (
            <Image
              source={{uri: user[0].imageURI}}
              style={styles.profileStyle}
            />
          ) : (
            <Image source={images.user.url} style={styles.profileStyle} />
          )}
{
  user && user[0]?.first_name ? (
    <Text style={styles.nameStyle}>
      {user[0].first_name} {user[0].last_name}
    </Text>
  ) : (
    <Text style={styles.nameStyle}>
      name
    </Text>
  )
    
}
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerBtnStyle}
            onPress={() => navigation.navigate('BookingScreen')}>
            <AntDesign name="calendar" size={35} color="#263238" />
            <Text>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtnStyle} onPress={()=>navigation.navigate('FavoritesScreen')}>
            <Entypo name="star" size={35} color="gold" />
            <Text>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtnStyle}>
            <FontAwesome name="commenting-o" size={35} color="#263238" />
            <Text>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#F6F6F6',
          borderBottomWidth: 15,
          width: 400,
          marginLeft: '10%',
          marginRight: '60%',
        }}></View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.mainBtnStyle}>
          <MaterialIcons
            name="account-circle"
            size={45}
            color="#263238"
            style={{marginLeft: 5}}
          />
          <Text style={styles.settingText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainBtnStyle}>
          <MaterialIcons
            name="payment"
            size={45}
            color="#263238"
            style={{marginLeft: 5}}
          />
          <Text style={styles.settingText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainBtnStyle}>
          <FontAwesome
            name="support"
            size={45}
            color="#263238"
            style={{marginLeft: 5}}
          />
          <Text style={styles.settingText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSignOut()} style={styles.logOut}>
          <MaterialIcons
            name="logout"
            size={45}
            color="red"
            style={{marginLeft: 5}}
          />
          <Text style={styles.settingText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  settingText: {
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#263238',
  },
  logoStyle: {
    width: 200,
    height: 150,
    alignContent: 'center',
    alignSelf: 'center',
  },
  headerStyle: {
    borderRadius: 20,
  },
  mainBtnStyle: {
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: 15,
    padding: 5,
  },
  logOut: {
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: 15,
    padding: 5,
  },
  settingsContainer: {
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 30,
    paddingLeft: 10,
  },
  headerBtnStyle: {
    backgroundColor: '#F0F5F4',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    marginTop: 60,
    marginLeft: 10,
    marginRight: 20,
    fontSize: 25,
    flexWrap: 'wrap',
    flex: 1,
    color: '#ffffff',
    fontFamily: 'Now-Bold',
  },
  headingContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: Colors.primaryBrand,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
  },
  profileStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 160,
    height: 120,
    marginTop: 20,
  },
  logoStyles: {
    width: '100%',
    height: '100%',
  },
});
