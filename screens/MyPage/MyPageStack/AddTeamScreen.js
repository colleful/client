import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const AddTeamScreen = ({navigation,setUpdate,update}) => {
  const [teamName, setTeamName] = useState('');
  const [teamInfo, setTeamInfo] = useState('');
  const [teamInfoError, setTeamInfoError] = useState('');

  const onCreateTeam = async () => {
    try {
      const response = await authAPI.createTeam({teamName: teamName},
        {
          headers: {
            'Access-Token': await AsyncStorage.getItem('token'),
          },
        },
      );
      setTeamInfo(response.data);
    } catch (e) {
      setTeamInfoError(e);
      console.log(e);
    }
  };

  useEffect(() => {
    if (teamInfo) {
      Alert.alert('팀생성', '팀 생성을 완료하였습니다.', [
        {text: '확인', onPress: () => {navigation.navigate('팀초대'); setUpdate(!update);}},
      ]);
    }
    if (teamInfoError) {
      Alert.alert('팀생성 오류', `${teamInfoError.response.data.message}`, [
        {text: '확인', onPress: console.log('팀생성 오류')},
      ]);
    }
  },[teamInfo,teamInfoError]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 25, marginBottom: 15}}>
        팀 이름을 입력해주세요
      </Text>
      <TextInput
        style={{
          width: 150,
          height: 50,
          borderBottomWidth: 1,
          marginBottom: 15,
          fontSize: 16,
        }}
        onChangeText={(text) => setTeamName(text)}
      />
      <TouchableOpacity
        onPress={() => onCreateTeam()} //만약, 팀이름이 중복되면 이동되지 못하게 고치기
        style={{
          marginVertical: 15,
          backgroundColor: '#d4d4d4',
          opacity: 0.5,
          borderRadius: 5,
          padding: 18,
          paddingVertical: 10,
          width: 60,
        }}>
        <Text>생성</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTeamScreen;
