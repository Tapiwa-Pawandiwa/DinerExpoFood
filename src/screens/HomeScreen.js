import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Touchable,
} from 'react-native';
import HeaderTabs from '../components/HeaderTabs';
import Categories from '../components/Categories/Categories';
import {Colors} from '../UI/colors';
import FeaturedRow from '../components/Featured/FeaturedRow';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryRow from '../components/FeaturedCountry/CountryRow';
import {DataStore} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {logoImages} from '../UI/images';
import {Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import HostCard from '../components/HostCard.js/HostCard';
import FeaturedHostCards from '../components/Featured/FeaturedHostCards';

/* 
    HOME SCREEN 
    1. Purpose : Home Screen is the first screen a user sees when they open the app after logging in 
    2. It contains the featured hosts , featured meals and style categories. 
*/


const {height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);

useEffect(() => {
  if (isFocused) {
    setRefresh(!refresh);
  }
}, [isFocused]);

  return (
    <View style={styles.homeContainer}>
      <Image source={logoImages.primaryLogo.url} style={styles.logoImage} />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Dine with a local friend</Text>
        <Image
          style={styles.headingImage}
          source={require('../UI/Illustrations/eating_together_2.png')}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.tryText}>Try These</Text>
          <TouchableOpacity
            style={styles.seeMoreBtn}
            onPress={() => navigation.navigate('Categories')}> {/* takes you to main category screen */}
            <Text style={styles.seeMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderContianer}>
          {/*Categories - featured rows */}
          <Categories />
        </View>
        {/* Featured Meals */}
        <View style={styles.featuredContainer}>
          <FeaturedRow title={'Featured Meals'}/>
        </View>
        {/* Featured Countries */}
        <View style={styles.featuredContainer}>
          <CountryRow title={'Featured Countries'} />
        </View>

        <FeaturedHostCards type='featured'/>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  headingText: {
    fontFamily: 'Now-Bold',
    fontSize: 32,
    width: '55%',
    marginTop: 16,
  },
  featuredContainer: {
    marginRight: 10,
    marginTop: 5,
  },
  sliderContianer: {
    marginBottom: 2,
  },
  headingContainer: {
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-around',
  },
  headingImage: {
    width: 100,
    height: 90,
    resizeMode: 'cover',
  },
  imageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  seeMoreText: {
    color: Colors.primaryBlue,
    alignSelf: 'center',
    padding: 5,
  },
  tryText: {
    color: Colors.primaryBlue,
    fontFamily: 'Now-Medium',
    fontWeight: '400',
    marginTop: 8,
    fontSize: 20,
    marginLeft: 10,
  },
  seeMoreBtn: {
    borderColor: 'black',
    backgroundColor: Colors.primaryAccent3,
    borderRadius: 20,
    padding: 5,
    marginRight: 20,
    width: 100,
  
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  subHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },

  logoImage: {
    width: 150,
    height: 100,
    marginTop: 40,
    paddingBottom: 0,
    borderColor: 'black',

    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
