import React, {useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Config} from '../../../../Config';
import {trigger} from 'swr';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DELETE_MATCHING_REQUEST,
  INITAILIZE_STATE,
} from '../../../../reducers/matching';

const SentMatchingListItemScreen = ({sentMatchingList}) => {
  const dispatch = useDispatch();
  const {deleteMatchingDone, deleteMatchingError} = useSelector(
    ({matching}) => matching,
  );

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (deleteMatchingDone) {
      Alert.alert('완료', `요청을 취소하였습니다.`, [
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
  }, [sentMatchingList]);

  return (
    <>
      <Text
        style={css`
          font-size: 19px;
          line-height: 30px;
        `}>
        보낸 팀 : {sentMatchingList.sentTeam.teamName}
        {'\n'}
        받는 팀 : {sentMatchingList.receivedTeam.teamName}
      </Text>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={onPressDeleteMatching}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 17px;
            width: 88px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            매칭 취소
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

export default SentMatchingListItemScreen;
