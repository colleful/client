import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import {
  ACCEPT_INVITATION_REQUEST,
  REFUSE_INVITATION_REQUEST,
} from '../../../../../reducers/invite';
import {LOAD_USER_REQUEST, INITAILIZE_STATE} from '../../../../../reducers/user';

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

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedInvitationList.team.leaderId,
    });
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [receivedInvitationList]);

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
  }, [dispatch, receivedInvitationList]);

  const onRefuseInvitation = useCallback(() => {
    dispatch({
      type: REFUSE_INVITATION_REQUEST,
      data: receivedInvitationList.id,
    });
  }, [dispatch, receivedInvitationList]);

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
