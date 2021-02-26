import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../../lib/api';
import {Config} from '../../../../Config';
import {trigger} from 'swr';
import {css} from '@emotion/native';

const ReceivedMatchingListItemScreen = ({receivedMatchingList}) => {
  const [MatcherInfo, setMatchingInfo] = useState('');

  useEffect(() => {
    onGetUserInfo();
  }, []);

  useEffect(() => {
    console.log("receivedMatchingList",receivedMatchingList);
  }, [receivedMatchingList])

  const onGetUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo(receivedMatchingList.sentTeam.leaderId,{
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        }
      });
      setMatchingInfo(response.data);
    } catch (error) {
      console.log({error});
    }
  }

  const onAcceptMatching = async () => {
    try {
      await authAPI.acceptMatching(
        receivedMatchingList.id,
        {},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert(
        '완료',
        `${receivedMatchingList.sentTeam.teamName}팀 매칭 요청을 수락했습니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/matching/received`);
              trigger(`${Config.baseUrl}/api/users`);
            }
          },
        ],
      );
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const onRefuseMatching = async () => {
    try {
      const response = await authAPI.refuseMatching(
        receivedMatchingList.id,
        {},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      if (response.status === 200) {
        Alert.alert(
          '완료',
          `${receivedMatchingList.sentTeam.teamName}팀의 매칭 요청을 거절했습니다.`,
          [
            {
              text: '확인',
              onPress: () => {
                trigger(`${Config.baseUrl}/api/matching/received`);
                trigger(`${Config.baseUrl}/api/users`);
              }
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  return (
    <>
      <Text style={css`font-size: 19px; line-height: 30px`}>
        팀명 : {receivedMatchingList.sentTeam.teamName} {'\n'}리더 :{' '}
        {MatcherInfo.nickname} {'( '}{MatcherInfo.age}{', '}{MatcherInfo.department}{' )'}
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
          <Text style={css`color: #fff; font-weight: 500`}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRefuseMatching}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 18px;
            width: 61px;
          `}>
          <Text style={css`color: #fff; font-weight: 500`}>거절</Text>
        </TouchableOpacity>
      </View>
      <View style={css`border-bottom-width: 1px; margin-vertical: 20px`} />
    </>
  );
};

export default React.memo(ReceivedMatchingListItemScreen);
