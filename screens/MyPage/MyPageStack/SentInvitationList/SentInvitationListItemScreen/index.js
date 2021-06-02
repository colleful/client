import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_INVITATION_REQUEST} from '../../../../../reducers/invite';
import {
  LOAD_USER_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/user';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const SentInvitationListItemScreen = ({sentInvitationList}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(({user}) => user);
  const {
    loadUserError,
    deleteInvitationDone,
    deleteInvitationError,
  } = useSelector(({invite}) => invite);
  const currentError = loadUserError || deleteInvitationError;

  useEffect(() => {
    dispatch({type: LOAD_USER_REQUEST, data: sentInvitationList.team.leaderId});
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (deleteInvitationDone) {
      Alert.alert('완료', `초대를 취소하였습니다.`, [
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
    dispatch({type: DELETE_INVITATION_REQUEST, data: sentInvitationList.id});
  }, [dispatch, sentInvitationList]);

  const onPressDeleteInvitation = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${sentInvitationList.user.nickname} 님에게 보낸 초대를 취소하시겠습니까?`,
      [
        {text: '취소', onPress: () => console.log('취소')},
        {text: '확인', onPress: onDeleteInvitation},
      ],
    );
  }, [sentInvitationList]);

  return (
    <>
      {userInfo && (
        <L.Content>
          보낸사람 : {userInfo.nickname}
          {' \n'}
          받는사람 : {sentInvitationList.user.nickname}{' '}
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
