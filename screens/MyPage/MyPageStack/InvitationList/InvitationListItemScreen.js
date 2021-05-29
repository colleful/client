import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  INITAILIZE_STATE,
  INVITE_TEAM_REQUEST,
} from '../../../../reducers/invite';

const InvitationListItemScreen = ({searchUserInfo}) => {
  const dispatch = useDispatch();
  const {
    searchUserByNicknameError,
    inviteTeamDone,
    inviteTeamError,
  } = useSelector(({invite}) => invite);
  const currentError = searchUserByNicknameError || inviteTeamError;

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (inviteTeamDone) {
      Alert.alert(
        '완료',
        `${searchUserInfo?.nickname}님께 팀 초대 메세지를 보냈습니다`,
        [
          {
            text: '확인',
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
  }, [inviteTeamDone, currentError]);

  const onInviteTeam = useCallback(() => {
    dispatch({type: INVITE_TEAM_REQUEST, data: {userId: searchUserInfo.id}});
  }, [dispatch, searchUserInfo.id]);

  return (
    <View
      style={css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
        background-color: #e5e5e5;
      `}>
      <Text
        style={css`
          font-size: 16px;
          margin-right: 15px;
        `}>
        {searchUserInfo?.nickname} {searchUserInfo?.age}
        {' / '}
        {searchUserInfo?.gender === 'MALE' ? '남' : '여'}
      </Text>
      <TouchableOpacity
        onPress={onInviteTeam}
        style={css`
          background-color: #5e5e5e;
          border-radius: 5px;
          padding: 10px 15px;
          width: 56px;
        `}>
        <Text
          style={css`
            color: #fff;
            font-weight: 500;
          `}>
          초대
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvitationListItemScreen;
