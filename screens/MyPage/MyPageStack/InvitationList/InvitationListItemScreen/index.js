import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  INITAILIZE_STATE,
  INVITE_TEAM_REQUEST,
} from '../../../../../reducers/invite';
import * as S from './style';

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
    <S.Wrapper>
      <S.Content>
        {searchUserInfo?.nickname} {searchUserInfo?.age}
        {' / '}
        {searchUserInfo?.gender === 'MALE' ? '남' : '여'}
      </S.Content>
      <S.Button onPress={onInviteTeam}>
        <S.ButtonText>초대</S.ButtonText>
      </S.Button>
    </S.Wrapper>
  );
};

export default InvitationListItemScreen;
