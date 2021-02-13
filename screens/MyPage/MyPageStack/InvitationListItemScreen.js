import React from 'react';
import {View, Text, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import MemberInfo from './MemberInfo';
import { trigger } from 'swr';
import {Config} from '../../../Config';
import {css} from '@emotion/native';

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
          'Authorization': await AsyncStorage.getItem('authorization'),
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
          'Authorization': await AsyncStorage.getItem('authorization'),
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
      <Text style={css`font-size: 19px; line-height: 30px`}>
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
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={()=> {
            onAcceptInvitation()
          }}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            margin-right: 20px;
            padding: 18px;
            padding-vertical: 10px;
            width: 61px;
          `}>
          <Text style={css`color: #fff; font-weight: 500px`}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> {
            onRefusalInvitation()
          }}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 18px;
            padding-vertical: 10px;
            width: 61px;
          `}>
          <Text style={css`color: #fff; font-weight: 500`}>거절</Text>
        </TouchableOpacity>
      </View>
      <View style={css`border-bottom-width: 1px; margin-vertical: 20px`} />
    </>
  );
};

export default InvitationListItemScreen;
