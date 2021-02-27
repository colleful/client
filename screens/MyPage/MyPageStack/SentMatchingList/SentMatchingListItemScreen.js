import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../../lib/api';
import {Config} from '../../../../Config';
import useSWR, {trigger} from 'swr';
import {css} from '@emotion/native';

const SentMatchingListItemScreen = ({sentMatchingList}) => {
  useEffect(() => {
    console.log('sentMatchingList', sentMatchingList);
  }, [sentMatchingList]);

  const onDeleteMatching = async () => {
    try {
      await authAPI.deleteMatching(sentMatchingList.id, {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      Alert.alert('완료', `요청을 취소하였습니다.`, [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/matching/sent`),
        },
      ]);
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const onPressDeleteMatching = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${sentMatchingList.receivedTeam.teamName}팀에게 보낸 요청을 취소하시겠습니까?`,
      [
        {text: '취소', onPress: () => console.log('취소')},
        {text: '확인', onPress: onDeleteMatching},
      ],
    );
  }, []);

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
