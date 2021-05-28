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

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: receivedMatchingList.sentTeam.leaderId,
    });
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (acceptMatchingDone) {
      Alert.alert(
        '완료',
        `${receivedMatchingList.sentTeam.teamName}팀 매칭 요청을 수락했습니다.`,
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
    if (acceptMatchingError) {
      Alert.alert('에러', `${acceptMatchingError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({acceptMatchingError});
    }

    if (refuseMatchingDone) {
      Alert.alert(
        '완료',
        `${receivedMatchingList.sentTeam.teamName}팀의 매칭 요청을 거절했습니다.`,
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
    if (refuseMatchingError) {
      Alert.alert('에러', `${refuseMatchingError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({refuseMatchingError});
    }
  }, [
    acceptMatchingDone,
    acceptMatchingError,
    refuseMatchingDone,
    refuseMatchingError,
  ]);

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
