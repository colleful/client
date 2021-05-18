import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../../lib/api';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_USER_REQUEST} from '../../../../reducers/user';
import LoadingScreen from '../../../../components/LoadingScreen';

const ReceivedInvitationListItemScreen = ({receivedInvitationList}) => {
  // const [inviterInfo, setInviterInfo] = useState('');

  const dispatch = useDispatch();
  const {inviterInfo, loadUserLoading} = useSelector(({user}) => user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedInvitationList.team.leaderId,
    });
  }, []);

  // useEffect(() => {
  //   onGetUserInfo();
  // }, []);

  // const onGetUserInfo = async () => {
  //   try {
  //     const response = await authAPI.getUserInfo(receivedInvitationList.team.leaderId,{
  //       headers: {
  //         Authorization: await AsyncStorage.getItem('authorization'),
  //       }
  //     });
  //     setInviterInfo(response.data);
  //   } catch (error) {
  //     Alert.alert('에러', `${error.response.data.message}`, [
  //       {
  //         text: '확인',
  //       },
  //     ]);
  //     console.log({error});
  //   }
  // }

  const onAcceptInvitation = async () => {
    try {
      await authAPI.acceptInvitation(
        receivedInvitationList.id,
        {},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert(
        '완료',
        `${receivedInvitationList.team.teamName}팀 초대를 수락했습니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/invitations/received`);
              trigger(`${Config.baseUrl}/api/users`);
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const onRefuseInvitation = async () => {
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
              onPress: () => {
                trigger(`${Config.baseUrl}/api/invitations/received`);
                trigger(`${Config.baseUrl}/api/users`);
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  return (
    <>
      <Text
        style={css`
          font-size: 19px;
          line-height: 30px;
        `}>
        팀명 : {receivedInvitationList.team.teamName} {'\n'}리더 :{' '}
        {inviterInfo.nickname} {'( '}
        {inviterInfo.age}
        {', '}
        {inviterInfo.department}
        {' )'}
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
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            수락
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRefuseInvitation}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 18px;
            width: 61px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            거절
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={css`
          border-bottom-width: 1px;
          margin-vertical: 20px;
        `}
      />
      {loadUserLoading && <LoadingScreen />}
    </>
  );
};

export default React.memo(ReceivedInvitationListItemScreen);
