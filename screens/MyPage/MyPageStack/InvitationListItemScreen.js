import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import {trigger} from 'swr';
import {Config} from '../../../Config';
import {css} from '@emotion/native';

const InvitationListItemScreen = ({receivedInvitationList}) => {
  return receivedInvitationList.map((list, index) => (
    <InvitationListItem receivedInvitationList={list} key={index} />
  ));
};

const InvitationListItem = ({receivedInvitationList}) => {
  
  useEffect(() => {
    console.log("receivedInvitationList", receivedInvitationList.id);
  }, [receivedInvitationList])

  const onAcceptInvitation = async () => {
    try {
      const response = await authAPI.acceptInvitation(
        receivedInvitationList.id,
        {},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      if (response.status === 200) {
        Alert.alert(
          '완료',
          `${receivedInvitationList.team.teamName}팀 초대를 수락했습니다.`,
          [
            {
              text: '확인',
            },
          ],
        );
      }
      trigger(`${Config.baseUrl}/api/users`);
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const onRefusalInvitation = async () => {
    try {
      const response = await authAPI.refuseInvitation(
        receivedInvitationList.id,
        {},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      if (response.status === 200) {
        Alert.alert(
          '완료',
          `${receivedInvitationList.team.teamName}팀 초대를 거절했습니다.`,
          [
            {
              text: '확인',
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  return (
    <>
      <Text style={css`font-size: 19px; line-height: 30px`}>
        팀명 : {receivedInvitationList.team.teamName} {'\n'}리더 :{' '}
        {/* {
          receivedInvitationList.team.members.filter(
            (teams) => teams.id === receivedInvitationList.team.leaderId,
          )[0].nickname
        }{' '}
        {'\n'}팀 멤버 :
        {receivedInvitationList.team.members.map((member, index) => (
          <MemberInfo memberInfo={member} key={index} />
        ))} */}
      </Text>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={onAcceptInvitation}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            margin-right: 20px;
            padding: 10px 18px;
            width: 61px;
          `}>
          <Text style={css`color: #fff; font-weight: 500`}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRefusalInvitation}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 18px;
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
