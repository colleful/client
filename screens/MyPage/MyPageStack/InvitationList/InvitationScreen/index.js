import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  SEARCH_USER_BY_NICKNAME_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/invite';
import LoadingScreen from '../../../../../components/LoadingScreen';
import InvitationListScreen from '../InvitationListScreen/index';
import * as S from './style';

const InvitationScreen = () => {
  const [userNickname, setUserNickname] = useState('');
  const dispatch = useDispatch();
  const {
    searchUserInfo,
    searchUserByNicknameLoading,
    searchUserByNicknameDone,
    searchUserByNicknameError,
    inviteTeamLoading,
  } = useSelector(
    (state) => ({
      searchUserInfo: state.invite.searchUserInfo,
      searchUserByNicknameLoading: state.invite.searchUserByNicknameLoading,
      searchUserByNicknameDone: state.invite.searchUserByNicknameDone,
      searchUserByNicknameError: state.invite.searchUserByNicknameError,
      inviteTeamLoading: state.invite.inviteTeamLoading,
    }),
    shallowEqual,
  );
  const searchUserInfoSize = searchUserInfo.length;

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch]);

  useEffect(() => {
    if (searchUserByNicknameDone && !searchUserInfoSize) {
      Alert.alert(
        '검색결과',
        '해당 키워드를 포함한 사용자를 찾을 수 없습니다.',
        [
          {
            text: '확인',
          },
        ],
      );
    }

    if (searchUserByNicknameError) {
      Alert.alert(
        '에러',
        `${searchUserByNicknameError.response.data.message}`,
        [
          {
            text: '확인',
          },
        ],
      );
      console.log({searchUserByNicknameError});
    }
  }, [
    searchUserInfo,
    searchUserByNicknameDone,
    searchUserByNicknameError,
    searchUserInfoSize,
  ]);

  const onSearchUserByNickname = useCallback(() => {
    dispatch({type: SEARCH_USER_BY_NICKNAME_REQUEST, data: userNickname});
  }, [dispatch, userNickname]);

  return (
    <S.Wrapper>
      <S.HeaderTitle>멤버 초대하기</S.HeaderTitle>
      <S.InputFormContainer>
        <S.Input
          placeholder="초대할 멤버의 닉네임 입력"
          onChangeText={(text) => setUserNickname(text)}
          value={userNickname}
        />
        <S.Button onPress={onSearchUserByNickname}>
          <S.ButtonText>검색</S.ButtonText>
        </S.Button>
      </S.InputFormContainer>

      <S.BorderLine />
      <S.ContentTitle>검색결과</S.ContentTitle>

      {searchUserByNicknameDone && (
        <InvitationListScreen searchUserInfos={searchUserInfo} />
      )}

      {(searchUserByNicknameLoading || inviteTeamLoading) && <LoadingScreen />}
    </S.Wrapper>
  );
};

export default InvitationScreen;
