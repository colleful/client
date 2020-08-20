import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './ChatScreen/ChatScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import MyPageScreen from './MyPageScreen/MyPageScreen';
import MessageScreen from './MyPageScreen/MessageScreen';

export default function MainNavigator() {
  const MyPageStack = createStackNavigator();

  const MyPageStackScreen = () => {
    return (
      <MyPageStack.Navigator>
        <MyPageStack.Screen name="마이페이지" component={MyPageScreen} />
        <MyPageStack.Screen name="쪽지함" component={MessageScreen} />
      </MyPageStack.Navigator>
    );
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="홈"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: 'gray',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === '홈') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '마이페이지') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === '채팅목록') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="채팅목록"
          component={ChatScreen}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="마이페이지" component={MyPageStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
