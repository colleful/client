import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMyInfo, getUserInfo} from '../modules/user';
import MyPageScreen from '../screens/MyPage/MyPageScreen';

import {createStackNavigator} from '@react-navigation/stack';

import MessageScreen from '../screens/MyPage/MyPageStack/MessageScreen';
import TeamListScreen from '../screens/MyPage/MyPageStack/TeamListScreen';
import FriendsListScreen from '../screens/MyPage/MyPageStack/FriendsListScreen';
import AccountScreen from '../screens/MyPage/MyPageStack/AccountScreen';
import SuggestionScreen from '../screens/MyPage/MyPageStack/SuggestionScreen';
import NoticeScreen from '../screens/MyPage/MyPageStack/NoticeScreen';
import SettingScreen from '../screens/MyPage/MyPageStack/SettingScreen';

const UserContainer = ({navigation}) => {
  // const dispatch = useDispatch();
  // const {myInfo, myInfoError} = useSelector(({user}) => ({
  //   // form: user.myInfo,
  //   myInfo: user.myInfo,
  //   myInfoError: user.myInfoError
  // }));
  const MyPageStack = createStackNavigator();
  return (
    <MyPageStack.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute', //input 창에 글쓸때 keypad 위에 tabbar가 남아있는 현상 고치기 위한 솔루션
        },
      }}>
      <MyPageStack.Screen name="마이페이지">
        {(props) => <MyPageScreen {...props} navigation={navigation} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="계정" component={AccountScreen} />
      <MyPageStack.Screen name="쪽지함" component={MessageScreen} />
      <MyPageStack.Screen name="친구목록" component={FriendsListScreen} />
      <MyPageStack.Screen name="팀목록" component={TeamListScreen} />
      <MyPageStack.Screen name="공지사항" component={NoticeScreen} />
      <MyPageStack.Screen name="건의사항" component={SuggestionScreen} />
      <MyPageStack.Screen name="설정" component={SettingScreen} />
    </MyPageStack.Navigator>
  );
};

export default UserContainer;
