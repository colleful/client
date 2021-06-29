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
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

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
  }, [dispatch, receivedInvitationList.team.leaderId]);

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
  }, [
    acceptInvitationDone,
    currentError,
    currentDone,
    receivedInvitationList.team.teamName,
  ]);

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
        <L.Content>
          팀명 : {receivedInvitationList.team.teamName} {'\n'}리더 :{' '}
          {userInfo.nickname} {'( '}
          {userInfo.age}
          {', '}
          {userInfo.department}
          {' )'}
        </L.Content>
      )}
      <L.ButtonContainer>
        <L.Button onPress={onAcceptInvitation}>
          <L.ButtonText>수락</L.ButtonText>
        </L.Button>
        <L.Button onPress={onRefuseInvitation}>
          <L.ButtonText>거절</L.ButtonText>
        </L.Button>
      </L.ButtonContainer>
      <L.BorderLine />
    </>
  );
};

export default ReceivedInvitationListItemScreen;
