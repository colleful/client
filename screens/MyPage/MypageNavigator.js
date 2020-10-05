import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPageScreen from './MyPageScreen';
import MessageScreen from './MyPageStack/MessageScreen';
import TeamListScreen from './MyPageStack/TeamListScreen';
import FriendsListScreen from './MyPageStack/FriendsListScreen';
import AccountScreen from './MyPageStack/AccountScreen';
import SuggestionScreen from './MyPageStack/SuggestionScreen';
import NoticeScreen from './MyPageStack/NoticeScreen';
import SettingScreen from './MyPageStack/SettingScreen';
import AddTeamScreen from './MyPageStack/AddTeamScreen';
import InvitationScreen from './MyPageStack/InvitationScreen';
import InvitationListScreen from './MyPageStack/InvitationListScreen';
import ProfileScreen from './MyPageStack/ProfileScreen';

import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../lib/api';

const MypageNavigator = ({navigation}) => {
  const MyPageStack = createStackNavigator();
  const [myInfo, setMyInfo] = useState([]);
  const [update, setUpdate] = useState();

  const onGetMyInfo = async () => {
    try {
      const response = await authAPI.getMyInfo({
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      setMyInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdate(false);
    onGetMyInfo();
  }, [update]);

  return (
    <MyPageStack.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
        },
      }}>
      <MyPageStack.Screen name="유저정보">
        {(props) => <MyPageScreen {...props} navigation={navigation} myInfoData={myInfo} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="프로필">
        {(props) => <ProfileScreen {...props} navigation={navigation} myInfoData={myInfo} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="계정">
        {(props) => <AccountScreen {...props} navigation={navigation} myInfoData={myInfo} update={update} setUpdate={setUpdate} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="쪽지함" component={MessageScreen} />
      <MyPageStack.Screen name="팀생성">
        {(props) => <AddTeamScreen {...props} navigation={navigation} update={update} setUpdate={setUpdate} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="팀초대" component={InvitationScreen} />
      <MyPageStack.Screen name="팀목록">
        {(props) => <TeamListScreen {...props} navigation={navigation} myInfoData={myInfo} update={update} setUpdate={setUpdate} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="받은초대목록">
        {(props) => <InvitationListScreen {...props} navigation={navigation} update={update} setUpdate={setUpdate} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="친구목록" component={FriendsListScreen} />
      <MyPageStack.Screen name="공지사항" component={NoticeScreen} />
      <MyPageStack.Screen name="건의사항" component={SuggestionScreen} />
      <MyPageStack.Screen name="설정" component={SettingScreen} />
    </MyPageStack.Navigator>
  );
};

export default MypageNavigator;
