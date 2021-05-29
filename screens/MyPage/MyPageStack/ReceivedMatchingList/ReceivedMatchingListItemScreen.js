import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Config} from '../../../../Config';
import {trigger} from 'swr';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ACCEPT_MATCHING_REQUEST,
  REFUSE_MATCHING_REQUEST,
} from '../../../../reducers/matching';
import {LOAD_USER_REQUEST, INITAILIZE_STATE} from '../../../../reducers/user';

const ReceivedMatchingListItemScreen = ({receivedMatchingList}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(({user}) => user);
  const {
    acceptMatchingDone,
    acceptMatchingError,
    refuseMatchingDone,
    refuseMatchingError,
  } = useSelector(({matching}) => matching);
  const currentError = acceptMatchingError || refuseMatchingError;
  const currentDone = acceptMatchingDone || refuseMatchingDone;

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedMatchingList.sentTeam.leaderId,
    });
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [receivedMatchingList.sentTeam.leaderId]);

  useEffect(() => {
    if (currentDone) {
      Alert.alert(
        '완료',
        `${receivedMatchingList.sentTeam.teamName}팀 매칭 요청을 ${
          acceptMatchingDone ? '수락' : '거절'
        }했습니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/matching/received`);
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
  }, [currentDone, currentError]);

  const onAcceptMatching = useCallback(() => {
    dispatch({type: ACCEPT_MATCHING_REQUEST, data: receivedMatchingList.id});
  }, [dispatch, receivedMatchingList]);

  const onRefuseMatching = useCallback(() => {
    dispatch({type: REFUSE_MATCHING_REQUEST, data: receivedMatchingList.id});
  }, [dispatch, receivedMatchingList]);

  return (
    <>
      <Text
        style={css`
          font-size: 19px;
          line-height: 30px;
        `}>
        팀명 : {receivedMatchingList.sentTeam.teamName} {'\n'}리더 :{' '}
        {userInfo.nickname} {'( '}
        {userInfo.age}
        {', '}
        {userInfo.department}
        {' )'}
      </Text>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={onAcceptMatching}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            margin-right: 20px;
            padding: 10px 18px;
            width: 61px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            수락
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRefuseMatching}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 18px;
            width: 61px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            거절
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

export default ReceivedMatchingListItemScreen;
