import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './Chat/ChatScreen';
import HomeScreen from './Home/HomeScreen';

import MypageNavigator from './MyPage/MypageNavigator';

export default MainNavigator = () => {
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
      routeName === '친구목록' ||
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
        style: {
          position: 'absolute', //input 창에 글쓸때 keypad 위에 tabbar가 남아있는 현상 고치기 위한 솔루션
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
      <Tab.Screen
        name="채팅목록"
        component={ChatScreen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen
        name="마이페이지"
        component={MypageNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};
