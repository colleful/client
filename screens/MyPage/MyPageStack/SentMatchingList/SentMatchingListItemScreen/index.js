import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {Config} from '../../../../../Config';
import {trigger} from 'swr';
import {useDispatch, useSelector} from 'react-redux';
import {
  DELETE_MATCHING_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/matching';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const SentMatchingListItemScreen = ({sentMatchingList}) => {
  const dispatch = useDispatch();
  const {deleteMatchingDone, deleteMatchingError} = useSelector(
    ({matching}) => matching,
  );

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteMatchingDone) {
      Alert.alert('완료', '요청을 취소하였습니다.', [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/matching/sent`),
        },
      ]);
    }
    if (deleteMatchingError) {
      Alert.alert('에러', `${deleteMatchingError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({deleteMatchingError});
    }
  }, [deleteMatchingDone, deleteMatchingError]);

  const onDeleteMatching = useCallback(() => {
    dispatch({type: DELETE_MATCHING_REQUEST, data: sentMatchingList.id});
  }, [dispatch, sentMatchingList]);

  const onPressDeleteMatching = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${sentMatchingList.receivedTeam.teamName}팀에게 보낸 요청을 취소하시겠습니까?`,
      [
        {text: '취소', onPress: () => console.log('취소')},
        {text: '확인', onPress: onDeleteMatching},
      ],
    );
  }, [sentMatchingList.receivedTeam.teamName, onDeleteMatching]);

  return (
    <>
      <L.Content>
        보낸 팀 : {sentMatchingList.sentTeam.teamName}
        {'\n'}
        받는 팀 : {sentMatchingList.receivedTeam.teamName}
      </L.Content>
      <L.ButtonContainer>
        <L.Button onPress={onPressDeleteMatching}>
          <L.ButtonText>매칭 취소</L.ButtonText>
        </L.Button>
      </L.ButtonContainer>
      <L.BorderLine />
    </>
  );
};

export default SentMatchingListItemScreen;
