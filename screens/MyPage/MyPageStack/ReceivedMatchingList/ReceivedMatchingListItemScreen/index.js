import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {Config} from '../../../../../Config';
import {trigger} from 'swr';
import {useDispatch, useSelector} from 'react-redux';
import {
  ACCEPT_MATCHING_REQUEST,
  REFUSE_MATCHING_REQUEST,
} from '../../../../../reducers/matching';
import {
  LOAD_USER_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/user';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

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
  }, [dispatch, receivedMatchingList.sentTeam.leaderId]);

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
              trigger(`${Config.baseUrl}/api/teams?page=0`);
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
  }, [
    receivedMatchingList.sentTeam.teamName,
    acceptMatchingDone,
    currentDone,
    currentError,
  ]);

  const onAcceptMatching = useCallback(() => {
    dispatch({type: ACCEPT_MATCHING_REQUEST, data: receivedMatchingList.id});
  }, [dispatch, receivedMatchingList]);

  const onRefuseMatching = useCallback(() => {
    dispatch({type: REFUSE_MATCHING_REQUEST, data: receivedMatchingList.id});
  }, [dispatch, receivedMatchingList]);

  return (
    <>
      {userInfo && (
        <L.Content>
          팀명 : {receivedMatchingList.sentTeam.teamName} {'\n'}리더 :{' '}
          {userInfo.nickname} {'( '}
          {userInfo.age}
          {', '}
          {userInfo.department}
          {' )'}
        </L.Content>
      )}
      <L.ButtonContainer>
        <L.Button onPress={onAcceptMatching}>
          <L.ButtonText>수락</L.ButtonText>
        </L.Button>
        <L.Button onPress={onRefuseMatching}>
          <L.ButtonText>거절</L.ButtonText>
        </L.Button>
      </L.ButtonContainer>
      <L.BorderLine />
    </>
  );
};

export default ReceivedMatchingListItemScreen;
