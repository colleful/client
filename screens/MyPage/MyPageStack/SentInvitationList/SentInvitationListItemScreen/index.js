import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {DELETE_INVITATION_REQUEST} from '../../../../../reducers/invite';
import {
  LOAD_USER_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/user';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const SentInvitationListItemScreen = ({sentInvitationList}) => {
  const dispatch = useDispatch();
  const {userInfo, senderNickname} = useSelector(({user}) => ({
    userInfo: user.userInfo,
    senderNickname: user.userInfo.nickname,
  }));
  const {
    loadUserError,
    deleteInvitationDone,
    deleteInvitationError,
  } = useSelector(
    ({invite}) => ({
      loadUserError: invite.loadUserError,
      deleteInvitationDone: invite.deleteInvitationDone,
      deleteInvitationError: invite.deleteInvitationError,
    }),
    shallowEqual,
  );
  const currentError = loadUserError || deleteInvitationError;
  const {
    team: {leaderId},
    user: {receiverNickname},
    id: sentInvitationId,
  } = sentInvitationList;

  useEffect(() => {
    dispatch({type: LOAD_USER_REQUEST, data: leaderId});
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch, leaderId]);

  useEffect(() => {
    if (deleteInvitationDone) {
      Alert.alert('완료', '초대를 취소하였습니다.', [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/invitations/sent`),
        },
      ]);
    }
    if (currentError) {
      Alert.alert('에러', `${currentError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({currentError});
    }
  }, [deleteInvitationDone, currentError]);

  const onDeleteInvitation = useCallback(() => {
    dispatch({type: DELETE_INVITATION_REQUEST, data: sentInvitationId});
  }, [dispatch, sentInvitationId]);

  const onPressDeleteInvitation = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${receiverNickname} 님에게 보낸 초대를 취소하시겠습니까?`,
      [
        {text: '취소', onPress: () => console.log('취소')},
        {text: '확인', onPress: onDeleteInvitation},
      ],
    );
  }, [receiverNickname, onDeleteInvitation]);

  return (
    <>
      {userInfo && (
        <L.Content>
          보낸사람 : {senderNickname}
          {' \n'}
          받는사람 : {receiverNickname}{' '}
        </L.Content>
      )}
      <L.ButtonContainer>
        <L.Button onPress={onPressDeleteInvitation}>
          <L.ButtonText>초대 취소</L.ButtonText>
        </L.Button>
      </L.ButtonContainer>
      <L.BorderLine />
    </>
  );
};

export default SentInvitationListItemScreen;
