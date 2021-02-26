import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyPageScreen from './MyPageScreen';
import MessageScreen from './MyPageStack/MessageScreen';
import TeamListScreen from './MyPageStack/TeamList/TeamListScreen';
import AccountScreen from './MyPageStack/Account/AccountScreen';
import SuggestionScreen from './MyPageStack/SuggestionScreen';
import NoticeScreen from './MyPageStack/NoticeScreen';
import SettingScreen from './MyPageStack/SettingScreen';
import AddTeamScreen from './MyPageStack/AddTeam/AddTeamScreen';
import InvitationScreen from './MyPageStack/TeamList/InvitationScreen';
import ReceivedInvitationListScreen from './MyPageStack/ReceivedInvitationList/ReceivedInvitationListScreen';
import SentInvitationListScreen from './MyPageStack/SentInvitationList/SentInvitationListScreen';
import ReceivedMatchingLIstScreen from './MyPageStack/ReceivedMatchingList/ReceivedMatchingListScreen';
import SentMatchingListScreen from './MyPageStack/SentMatchingList/SentMatchingListScreen';
import ProfileScreen from './MyPageStack/ProfileScreen';

import AsyncStorage from '@react-native-community/async-storage';
import useSWR from 'swr';
import axios from 'axios';
import {Config} from '../../Config';

const MypageNavigator = ({navigation}) => {
  const MyPageStack = createStackNavigator();

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
    {
      onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
        if (error.response.status === 500) {
          //탈퇴한 사용자의 토큰을 들고있을 경우
          AsyncStorage.removeItem('authorization');
          AsyncStorage.removeItem('userPassword');
        }
      },
    },
  );

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
        {(props) => (
          <MyPageScreen
            {...props}
            navigation={navigation}
            myInfoData={userData}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="프로필">
        {(props) => (
          <ProfileScreen
            {...props}
            navigation={navigation}
            myInfoData={userData}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="계정">
        {(props) => (
          <AccountScreen
            {...props}
            navigation={navigation}
            myInfoData={userData}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="쪽지함" component={MessageScreen} />
      <MyPageStack.Screen name="팀생성">
        {(props) => <AddTeamScreen {...props} navigation={navigation} />}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="팀초대" component={InvitationScreen} />
      <MyPageStack.Screen name="팀목록">
        {(props) => (
          <TeamListScreen
            {...props}
            navigation={navigation}
            teamId={userData.teamId}
            userId={userData.id}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="받은초대목록">
        {(props) => (
          <ReceivedInvitationListScreen {...props} navigation={navigation} />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="보낸초대목록">
        {(props) => (
          <SentInvitationListScreen
            {...props}
            navigation={navigation}
            teamId={userData.teamId}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="받은매칭요청">
        {(props) => (
          <ReceivedMatchingLIstScreen
            {...props}
            navigation={navigation}
            teamId={userData.teamId}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="보낸매칭요청">
        {(props) => (
          <SentMatchingListScreen
            {...props}
            navigation={navigation}
            teamId={userData.teamId}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="공지사항" component={NoticeScreen} />
      <MyPageStack.Screen name="건의사항" component={SuggestionScreen} />
      <MyPageStack.Screen name="설정" component={SettingScreen} />
    </MyPageStack.Navigator>
  );
};

export default MypageNavigator;
