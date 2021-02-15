import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import {trigger} from 'swr';
import {Config} from '../../../Config';
import {css} from '@emotion/native';

const AddTeamScreen = ({navigation}) => {
  const [teamName, setTeamName] = useState('');
  const [teamInfo, setTeamInfo] = useState('');
  const [teamInfoError, setTeamInfoError] = useState(0);

  const onCreateTeam = async () => {
    if (!teamName) {
      Alert.alert('팀생성 오류', '팀명은 최소 한 글자 이상 이여야 합니다.', [
        {text: '확인', onPress: console.log('팀생성 오류')},
      ]);
      return;
    }
    try {
      const response = await authAPI.createTeam(
        {teamName: teamName},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      setTeamInfo(response.data);
    } catch (error) {
      setTeamInfoError(error);
      console.log({error});
    }
  };

  useEffect(() => {
    if (teamInfo) {
      Alert.alert(
        '완료',
        '팀 생성이 완료되었습니다. 이어서 팀 초대를 하시겠습니까? ( 나중에 팀목록 -> 팀초대로 팀을 초대할 수 있습니다 )',
        [
          {
            text: '팀 초대',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/users`);
              navigation.navigate('팀초대', {
                teamId: teamInfo.id,
              });
            },
          },
          {
            text: '나가기',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/users`);
              navigation.navigate('유저정보');
            },
          },
        ],
      );
    }
    if (teamInfoError) {
      if (teamInfoError.response.data.status == 500) {
        Alert.alert('팀생성 오류', '이미 존재하는 팀명입니다.', [
          {text: '확인', onPress: console.log('팀생성 오류')},
        ]);
      } else if (teamInfoError.response.data.status === 403) {
        Alert.alert('팀생성 오류', '팀은 하나만 생성 가능합니다.', [
          {text: '확인', onPress: console.log('팀생성 오류')},
        ]);
      }
      setTeamInfoError(0);
    }
  }, [teamInfo, teamInfoError]);

  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text
        style={css`
          font-size: 25px;
          margin-bottom: 15px;
        `}>
        팀 이름을 입력해주세요
      </Text>
      <TextInput
        style={css`
          width: 150px;
          height: 50px;
          border-bottom-width: 1px;
          margin-bottom: 15px;
          font-size: 16px;
        `}
        onChangeText={(text) => setTeamName(text)}
      />

      <TouchableOpacity
        onPress={onCreateTeam}
        style={css`
          background-color: #5e5e5e;
          border-radius: 5px;
          padding: 13px 18px;
          margin-vertical: 20px;
          width: 70px;
        `}>
        <Text
          style={css`
            color: white;
            text-align: center;
          `}>
          생성
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTeamScreen;
