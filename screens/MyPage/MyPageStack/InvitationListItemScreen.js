import React from 'react';
import {View, Text, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import MemberInfo from './MemberInfo';
import { trigger } from 'swr';

const InvitationListItemScreen = ({invitationList}) => {
  return invitationList.map((list, index) => (
    <InvitationListItem invitationList={list} key={index} />
  ));
};

const InvitationListItem = ({invitationList}) => {
  const onAcceptInvitation = async () => {
    try {
      const response = await authAPI.acceptInvitation(invitationList.id, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        Alert.alert(
          '완료',
          `${invitationList.team.teamName}팀 초대를 수락했습니다.`,
          [
            {
              text: '확인',
            },
          ],
        );
      }
      trigger(`${Config.baseUrl}/api/users`);
    } catch (error) {
      Alert.alert(
        '에러발생',
        `${error.response.data.message}`,
        [
          {
            text: '확인',
          },
        ],
      );
      console.log({error})
    }
  };

  const onRefusalInvitation = async () => {
    try {
      const response = await authAPI.refusalInvitation(invitationList.id, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        Alert.alert(
          '완료',
          `${invitationList.team.teamName}팀 초대를 거절했습니다.`,
          [
            {
              text: '확인',
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert(
        '에러발생',
        `${error.response.data.message}`,
        [
          {
            text: '확인',
          },
        ],
      );
      console.log({error})
    }
  };

  return (
    <>
      <Text style={{fontSize: 19, lineHeight: 30}}>
        팀명 : {invitationList.team.teamName} {'\n'}리더 :{' '}
        {
          invitationList.team.members.filter(
            (teams) => teams.id === invitationList.team.leaderId,
          )[0].nickname
        }{' '}
        {'\n'}팀 멤버 :
        {invitationList.team.members.map((member, index) => (
          <MemberInfo memberInfo={member} key={index} />
        ))}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={()=> {
            onAcceptInvitation()
          }}
          style={{
            backgroundColor: '#5e5e5e',
            borderRadius: 5,
            marginRight: 20,
            padding: 18,
            paddingVertical: 10,
            width: 60,
          }}>
          <Text style={{color: '#fff', fontWeight: '500'}}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> {
            onRefusalInvitation()
          }}
          style={{
            backgroundColor: '#5e5e5e',
            borderRadius: 5,
            padding: 18,
            paddingVertical: 10,
            width: 60,
          }}>
          <Text style={{color: '#fff', fontWeight: '500'}}>거절</Text>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, marginVertical: 20}} />
    </>
  );
};

export default InvitationListItemScreen;
