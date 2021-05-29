import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import {
  ACCEPT_INVITATION_REQUEST,
  REFUSE_INVITATION_REQUEST,
} from '../../../../../reducers/invite';
import {
  LOAD_USER_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/user';

import {
  InvitationList_buttonWrapper,
  InvitationList_button,
  InvitationList_buttonText,
  InvitationList_content,
} from './style';

import {InvitationList_boundary} from '../ReceivedInvitationScreen/style';

const ReceivedInvitationListItemScreen = ({receivedInvitationList}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(({user}) => user);
  const {
    acceptInvitationDone,
    refuseInvitationDone,
    acceptInvitationError,
    refuseInvitationError,
    loadUserError,
  } = useSelector(({invite}) => invite);
  const currentError =
    loadUserError || acceptInvitationError || refuseInvitationError;
  const currentDone = acceptInvitationDone || refuseInvitationDone;

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedInvitationList.team.leaderId,
    });
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [receivedInvitationList.team.leaderId]);

  useEffect(() => {
    if (currentDone) {
      Alert.alert(
        '완료',
        `${receivedInvitationList.team.teamName}팀 초대를 ${
          acceptInvitationDone ? '수락' : '거절'
        }했습니다.`,
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
    if (currentError) {
      Alert.alert('에러', `${currentError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({currentError});
    }
  }, [currentError, currentDone]);

  const onAcceptInvitation = useCallback(() => {
    dispatch({
      type: ACCEPT_INVITATION_REQUEST,
      data: receivedInvitationList.id,
    });
  }, [dispatch, receivedInvitationList.id]);

  const onRefuseInvitation = useCallback(() => {
    dispatch({
      type: REFUSE_INVITATION_REQUEST,
      data: receivedInvitationList.id,
    });
  }, [dispatch, receivedInvitationList.id]);

  return (
    <>
      {userInfo && (
        <InvitationList_content>
          팀명 : {receivedInvitationList.team.teamName} {'\n'}리더 :{' '}
          {userInfo.nickname} {'( '}
          {userInfo.age}
          {', '}
          {userInfo.department}
          {' )'}
        </InvitationList_content>
      )}
      <InvitationList_buttonWrapper>
        <InvitationList_button onPress={onAcceptInvitation}>
          <InvitationList_buttonText>수락</InvitationList_buttonText>
        </InvitationList_button>
        <InvitationList_button onPress={onRefuseInvitation}>
          <InvitationList_buttonText>거절</InvitationList_buttonText>
        </InvitationList_button>
      </InvitationList_buttonWrapper>
      <InvitationList_boundary />
    </>
  );
};

export default ReceivedInvitationListItemScreen;
