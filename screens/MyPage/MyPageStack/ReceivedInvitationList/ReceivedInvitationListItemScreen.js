import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_USER_REQUEST} from '../../../../reducers/user';
import {
  ACCEPT_INVITATION_REQUEST,
  REFUSE_INVITATION_REQUEST,
} from '../../../../reducers/invite';

const ReceivedInvitationListItemScreen = ({receivedInvitationList}) => {
  const dispatch = useDispatch();
  const {inviterInfo, loadUserError} = useSelector(({user}) => user);
  const {
    acceptInvitationDone,
    acceptInvitationError,
    refuseInvitationDone,
    refuseInvitationError,
  } = useSelector(({invite}) => invite);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedInvitationList.team.leaderId,
    });
  }, []);

  useEffect(() => {
    if (loadUserError) {
      Alert.alert('에러', `${loadUserError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({loadUserError});
    }
    if (acceptInvitationError) {
      Alert.alert('에러', `${acceptInvitationError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({acceptInvitationError});
    }
    if (refuseInvitationError) {
      Alert.alert('에러', `${refuseInvitationError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({refuseInvitationError});
    }

    if (acceptInvitationDone) {
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
    }
    if (refuseInvitationDone) {
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
  }, [
    loadUserError,
    acceptInvitationError,
    refuseInvitationError,
    acceptInvitationDone,
    refuseInvitationDone,
  ]);

  const onAcceptInvitation = useCallback(() => {
    dispatch({
      type: ACCEPT_INVITATION_REQUEST,
      data: receivedInvitationList.id,
    });
  }, [dispatch]);

  const onRefuseInvitation = useCallback(() => {
    dispatch({
      type: REFUSE_INVITATION_REQUEST,
      data: receivedInvitationList.id,
    });
  },[dispatch]);

  return (
    <>
      {inviterInfo && (
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
      )}
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
    </>
  );
};

export default React.memo(ReceivedInvitationListItemScreen);
