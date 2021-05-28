import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_INVITATION_REQUEST} from '../../../../reducers/invite';
import {LOAD_USER_REQUEST, INITAILIZE_STATE} from '../../../../reducers/user';

const SentInvitationListItemScreen = ({sentInvitationList}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(({user}) => user);
  const {
    loadUserError,
    deleteInvitationDone,
    deleteInvitationError,
  } = useSelector(({invite}) => invite);

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
    if (loadUserError) {
      Alert.alert('에러', `${loadUserError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({loadUserError});
    }
    if (deleteInvitationError) {
      Alert.alert('에러', `${loadUserError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({loadUserError});
    }
  }, [loadUserError, deleteInvitationDone, deleteInvitationError]);

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
      <Text
        style={css`
          font-size: 19px;
          line-height: 30px;
        `}>
        보낸사람 : {userInfo.nickname}
        {' \n'}
        받는사람 : {sentInvitationList.user.nickname}{' '}
      </Text>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={onPressDeleteInvitation}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 17px;
            width: 88px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            초대 취소
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

export default SentInvitationListItemScreen;
