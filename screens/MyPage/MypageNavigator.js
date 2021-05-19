import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyPageScreen from './MyPageScreen';
import MessageScreen from './MyPageStack/MessageScreen';
import TeamListScreen from './MyPageStack/TeamList/TeamListScreen';
import AccountScreen from './MyPageStack/Account/index';
import SuggestionScreen from './MyPageStack/SuggestionScreen';
import NoticeScreen from './MyPageStack/NoticeScreen';
import SettingScreen from './MyPageStack/SettingScreen';
import AddTeamScreen from './MyPageStack/AddTeam/AddTeamScreen';
import InvitationScreen from './MyPageStack/TeamList/InvitationScreen';
import ReceivedInvitationScreen from './MyPageStack/ReceivedInvitationList/ReceivedInvitationScreen/index';
import SentInvitationListScreen from './MyPageStack/SentInvitationList/SentInvitationListScreen';
import ReceivedMatchingLIstScreen from './MyPageStack/ReceivedMatchingList/ReceivedMatchingListScreen';
import SentMatchingListScreen from './MyPageStack/SentMatchingList/SentMatchingListScreen';
import ProfileScreen from './MyPageStack/ProfileScreen';

const MypageNavigator = ({navigation, userData}) => {
  const MyPageStack = createStackNavigator();

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
          <ReceivedInvitationScreen {...props} navigation={navigation} />
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
