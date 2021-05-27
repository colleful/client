import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  SEARCH_USER_BY_NICKNAME_REQUEST,
  INVITE_TEAM_REQUEST,
} from '../../../../reducers/invite';
import LoadingScreen from '../../../../components/LoadingScreen';
import InvitationListScreen from './InvitationListScreen';

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
    console.log("userNickname",userNickname)
  }, [userNickname])

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
    <View
      style={css`
        flex: 1;
        padding-top: 100px;
        padding-horizontal: 20px;
      `}>
      <View
        style={css`
          margin-bottom: 30px;
        `}>
        <Text
          style={css`
            font-size: 32px;
          `}>
          {' '}
          멤버 초대하기
        </Text>
      </View>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-bottom: 40px;
        `}>
        <TextInput
          placeholder="초대할 멤버의 닉네임 입력"
          onChangeText={(text) => setUserNickname(text)}
          value={userNickname}
          style={css`
            margin-right: 15px;
            padding-left: 15px;
            width: 200px;
            height: 40px;
            border-width: 1px;
            border-radius: 5px;
            border-color: #5e5e5e;
          `}
        />
        <TouchableOpacity
          onPress={onSearchUserByNickname}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 11px 18px;
            width: 61px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            검색
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={css`
          border-bottom-width: 1px;
          margin-bottom: 20px;
        `}
      />
      <Text
        style={css`
          font-size: 20px;
          margin-bottom: 15px;
        `}>
        검색결과
      </Text>

      {searchUserByNicknameDone && (
        <InvitationListScreen searchUserInfos={searchUserInfo} />
      )}

      {(searchUserByNicknameLoading || inviteTeamLoading) && <LoadingScreen />}
    </View>
  );
};

export default InvitationScreen;
