import React from 'react';
import {Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './Chat/ChatScreen';
import HomeScreen from './Home/HomeScreen/index';
import MypageNavigator from './MyPage/MypageNavigator';

import AsyncStorage from '@react-native-community/async-storage';
import useSWR from 'swr';
import axios from 'axios';
import {Config} from '../Config';

const MainNavigator = () => {
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    console.log('내 정보 /api/users', response.data);
    return response.data;
  };

  const {data: userData = [], error} = useSWR(
    `${Config.baseUrl}/api/users`,
    fetcher,
  );

  if (error?.response.status === 500) {
    AsyncStorage.removeItem('authorization');
    AsyncStorage.removeItem('userPassword');
    return;
  }

  if (error) {
    Alert.alert('에러', `${error.response.data.message}`, [
      {
        text: '확인',
      },
    ]);
  }

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (
      routeName === '프로필' ||
      routeName === '쪽지함' ||
      routeName === '팀생성' ||
      routeName === '팀초대' ||
      routeName === '팀목록' ||
      routeName === '받은초대목록' ||
      routeName === '보낸초대목록' ||
      routeName === '받은매칭요청' ||
      routeName === '보낸매칭요청' ||
      routeName === '계정' ||
      routeName === '건의사항' ||
      routeName === '공지사항' ||
      routeName === '설정'
    ) {
      return false;
    }
    return true;
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        tabStyle: {
          paddingVertical: 7, //style에 쓰면 탭바가 숨을때 padding이 숨지못하고 나와있음
        },
        style: {
          position: 'absolute', //키패드 위에 탭바가 남아있는 현상을 고치기 위한 솔루션
          height: 60,
        },
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
        },
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
      <Tab.Screen name="채팅목록">
        {(props) => <ChatScreen {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen
        name="마이페이지"
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}>
        {(props) => <MypageNavigator {...props} userData={userData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainNavigator;
