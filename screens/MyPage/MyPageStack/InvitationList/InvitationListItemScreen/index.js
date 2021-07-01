import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
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
  } = useSelector(
    (state) => ({
      searchUserByNicknameError: state.invite.searchUserByNicknameError,
      inviteTeamDone: state.invite.inviteTeamDone,
      inviteTeamError: state.invite.inviteTeamError,
    }),
    shallowEqual,
  );
  const {nickname, id, age, gender} = searchUserInfo;
  const currentError = searchUserByNicknameError || inviteTeamError;

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch]);

  useEffect(() => {
    if (inviteTeamDone) {
      Alert.alert('완료', `${nickname}님께 팀 초대 메세지를 보냈습니다`, [
        {
          text: '확인',
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
  }, [inviteTeamDone, currentError, nickname]);

  const onInviteTeam = useCallback(() => {
    dispatch({type: INVITE_TEAM_REQUEST, data: {userId: id}});
  }, [dispatch, id]);

  return (
    <S.Wrapper>
      <S.Content>
        {nickname} {age}
        {' / '}
        {gender === 'MALE' ? '남' : '여'}
      </S.Content>
      <S.Button onPress={onInviteTeam}>
        <S.ButtonText>초대</S.ButtonText>
      </S.Button>
    </S.Wrapper>
  );
};

export default InvitationListItemScreen;
