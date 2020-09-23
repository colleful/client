import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const TeamListItemScreen = ({teamInfo,setUpdate,update}) => {
  return teamInfo.map((team,index) => <TeamListItem teamInfo={team} update={update} setUpdate={setUpdate} key={index} />);
};

const TeamListItem = ({teamInfo,setUpdate,update}) => {
  const onDeleteTeam = async () => {
    try {
      const response = await authAPI.deleteTeam(teamInfo.id, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      Alert.alert('팀 나가기', '팀 나가기를 완료했습니다.', [
        {
          text: '확인',
        },
      ]);
      setUpdate(!update);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{borderBottomWidth: 1, marginVertical: 15}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>{teamInfo.teamName}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              '팀 나가기',`정말 ${teamInfo.teamName} 팀을 나가시겠습니까?`,
              [
                {text: '취소', onPress: () => console.log('취소')},
                {text: '확인', onPress: () => onDeleteTeam()},
              ],
            );
          }}
          style={{
            backgroundColor: '#5e5e5e',
            borderRadius: 5,
            padding: 15,
            paddingVertical: 10,
            width: 80,
          }}>
          <Text style={{color: '#fff', fontWeight: '500'}}>팀 나가기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TeamListItemScreen;
