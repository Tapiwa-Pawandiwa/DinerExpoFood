import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import NearMeScreen from '../screens/NearMeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Colors} from '../UI/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import {useAuthContext} from '../contexts/AuthContext';


const TabNavigator = () => {
  const {isAuthenticated} = useAuthContext();
  const route = useRoute();
    if (!isAuthenticated) {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarIcon: {marginTop: 5},
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: Colors.primaryBrand,
        tabBarStyle: {
          borderRadius: 30,
          paddingVertical: 5,
          shadowColor: '#F65726',
          elevation: 4,
          shadowRadius: 3,
          shadowOpacity: 0.5,
          shadowOffset: {width: 0, height: -4},
          backgroundColor: '#ffffff',
          height: 80,
        },
        tabBarLabelStyle: {fontFamily: 'Helvetica', fontSize: 12},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
                    tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'home-variant' : 'home-variant-outline'}
                size={30}
                color={focused ? Colors.primaryBrand : Colors.menuGray}
              />
            );

          },
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
                    tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons
              name={focused ? 'view-grid' : 'view-grid-outline'}
              size={30}
              color={focused ? Colors.primaryBrand : Colors.menuGray}
            />
            //  <Ionicons name= {focused ? "grid" : "grid-outline"} size={focused? 30 : 24} color={focused ? Colors.primaryBrand : Colors.menuGray} />
          ),
          title: 'Categories',
        }}
      />
      <Tab.Screen
        name="Near Me"
        component={NearMeScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialIcons
              name="location-on"
              size={30}
              color={focused ? Colors.primaryBrand : Colors.menuGray}
            />
          ),
          title: 'Near me',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
                    tabBarIcon: ({focused, size, color}) => (
            <MaterialIcons
              name={focused ? 'person' : 'person-outline'}
              size={30}
              color={focused ? Colors.primaryBrand : Colors.menuGray}
                
            />
          ),
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
