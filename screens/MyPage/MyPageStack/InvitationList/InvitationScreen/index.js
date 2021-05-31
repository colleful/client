import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  SEARCH_USER_BY_NICKNAME_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/invite';
import LoadingScreen from '../../../../../components/LoadingScreen';
import InvitationListScreen from '../InvitationListScreen/index';
import * as IS from './style';

const InvitationScreen = () => {
  const [userNickname, setUserNickname] = useState('');
  const dispatch = useDispatch();
  const {
    searchUserInfo,
    searchUserByNicknameLoading,
    searchUserByNicknameDone,
    searchUserByNicknameError,
    inviteTeamLoading,
  } = useSelector(({invite}) => invite);

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (searchUserByNicknameDone && !searchUserInfo.length) {
      Alert.alert(
        '검색결과',
        `해당 키워드를 포함한 사용자를 찾을 수 없습니다.`,
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
  }, [searchUserInfo, searchUserByNicknameError]);

  const onSearchUserByNickname = useCallback(() => {
    dispatch({type: SEARCH_USER_BY_NICKNAME_REQUEST, data: userNickname});
  }, [dispatch, userNickname]);

  return (
    <IS.Wrapper>
      <IS.HeaderTitle>멤버 초대하기</IS.HeaderTitle>
      <IS.InputFormContainer>
        <IS.Input
          placeholder="초대할 멤버의 닉네임 입력"
          onChangeText={(text) => setUserNickname(text)}
          value={userNickname}
        />
        <IS.Button onPress={onSearchUserByNickname}>
          <IS.ButtonText>검색</IS.ButtonText>
        </IS.Button>
      </IS.InputFormContainer>

      <IS.BorderLine />
      <IS.ContentTitle>검색결과</IS.ContentTitle>

      {searchUserByNicknameDone && (
        <InvitationListScreen searchUserInfos={searchUserInfo} />
      )}

      {(searchUserByNicknameLoading || inviteTeamLoading) && <LoadingScreen />}
    </IS.Wrapper>
  );
};

export default InvitationScreen;