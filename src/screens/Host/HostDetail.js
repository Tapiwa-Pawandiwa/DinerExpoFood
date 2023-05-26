import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import {Host} from '../../models';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HostImages} from '../../UI/images';
import '@azure/core-asynciterator-polyfill'
import {Colors} from '../../UI/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusBar} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import { useFavoritesContext } from '../../contexts/FavoritesContext';


const HostDetail = ({route}) => {
  const navigation = useNavigation();
  const {hostObj} = route.params;
  const [host, setHost] = useState({});
  const {toggleHostFavorites,hostIsFavorite,setHostContext} = useFavoritesContext();
  
 

  //query the host table using the host id
  useEffect(() => {
    async function fetchHost() {
      const host = await DataStore.query(Host, hostObj.id);
      setHost(host);
      setHostContext(host);
    }
    fetchHost();
  }, [hostObj.id]);

  const handleViewPress = () => {
    //navigate to HostList
    navigation.navigate('HostList',{hostObj: host});
    //pass the host object to the HostList screen
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <View style={styles.headingContainer}>
          <Pressable
            style={{
              position: 'absolute',
              top: 20,
              left: 15,
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
          <Pressable
              style={{
                position: "absolute",
                top: 180,
                right: 20,
                backgroundColor: Colors.primaryBrand,
                padding: 5,
                borderRadius: 20,
              }}
            >
              <MaterialCommunityIcons
                name={hostIsFavorite ? "cards-heart":"cards-heart-outline"}
                size={30}
                color={"white"}
                onPress={() => toggleHostFavorites()}
              />
            </Pressable>
          <View style={styles.profileContainer}>
            <Image source={{uri: host.imageURI}} style={styles.hostProfile} />
          </View>
          <View style={styles.hostBioContainer}>
            <Text style={styles.hostNameTxt}>
              {host.first_name} {host.last_name}
            </Text>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 20}}>
              {host.country}
            </Text>
          

            <View style={styles.hostLocationContainer}>
              <Entypo
                name="location-pin"
                size={25}
                color={Colors.primaryBrand}
              />
              <Text style={styles.hostLocationText}>{host.address}</Text>
            </View>
          </View>
          <ScrollView
            style={styles.tags}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {host.tags && host.tags.length > 0 && (
              <>
                {host.tags.map((tag, index) => (
                  <TouchableOpacity style={styles.tagTxtContainer} key={index}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.headContainer}>
            <Text style={styles.subHead}>About Me</Text>
          </View>

          <ScrollView style={styles.sumContainer}>
            <Text style={styles.sumText}>
                  {host.description}
            </Text>
          </ScrollView>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleViewPress}>
              <Text style={styles.btnText}>View my Meals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonView: {
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: Colors.primaryBrand,
    borderRadius: 10,
    width: 150,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Now-Bold',
    
  },
  hostLocationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  tagTxtContainer: {
    backgroundColor: Colors.primaryAccent1,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 30,
  },
  sumContainer: {
    padding: 20,
    marginTop: 10,
    height: 220,
    borderRadius: 10,
    backgroundColor: Colors.primaryAccent2,
  },
  headContainer: {
    backgroundColor: 'white',
  },
  sumText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'black',
    lineHeight: 25,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 10,

    height: 30,
    marginTop: 10,
  },
  tagText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'black',
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
  },
  subHead: {
    fontSize: 25,
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    color: 'black',
    padding: 10,
  },
  bodyContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  hostProfile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: Colors.primaryBrand,
    borderWidth: 5,
  },
  hostLocationText: {
    fontSize: 20,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: '#F0F5F4',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  hostBioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  hostNameTxt: {
    fontSize: 30,
    fontFamily: 'Now-Bold',
    color: 'black',
  },
});
