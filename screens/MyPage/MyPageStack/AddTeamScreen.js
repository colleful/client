import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import useSWR, {trigger} from 'swr';
import {Config} from '../../../Config';

const AddTeamScreen = ({navigation}) => {
  const [teamName, setTeamName] = useState('');
  const [teamInfo, setTeamInfo] = useState('');
  const [teamInfoError, setTeamInfoError] = useState('');

  // const fetcher = async (url) => {
  //   const response = await axios.post(url, {teamName: teamName},
  //     {
  //       headers: {
  //         'Authorization': await AsyncStorage.getItem('authorization'),
  //       },
  //     });
  //   setTeamInfo(response.data);
  //   return response.data;
  // };

  // const {data = [], error} = useSWR(`${Config.baseUrl}/api/teams`, fetcher);
  // if(!data) return <div style={{backgroundColor:'green'}}>asd</div>
  // if(error) {
  //   Alert.alert('팀생성 오류', '이미 존재하는 팀명입니다.', [
  //     {text: '확인', onPress: console.log('팀생성 오류')},
  //   ]);
  // }

  // useEffect(()=>{
  //   if(teamInfo) { 
  //     Alert.alert('완료', '팀 생성이 완료되었습니다. 이어서 팀 초대를 하시겠습니까? ( 나중에 팀목록 -> 팀초대로 팀을 초대할 수 있습니다 )', [
  //       {
  //         text: '팀 초대',
  //         onPress: () => {
  //           // setUpdate(!update);
  //           trigger(`${Config.baseUrl}/api/users`);
  //           navigation.navigate('팀초대',{
  //             teamId: teamInfo.id
  //           });
  //         },
  //       },
  //       {
  //         text: '나가기',
  //         onPress: () => {
  //           // setUpdate(!update);
  //           trigger(`${Config.baseUrl}/api/users`);
  //           navigation.navigate('유저정보');
  //         },
  //       },
  //     ]);
  //   }
  // },[teamInfo])


  const onCreateTeam = async () => {
    try {
      const response = await authAPI.createTeam(
        {teamName: teamName},
        {
          headers: {
            'Authorization': await AsyncStorage.getItem('authorization'),
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
    console.log(teamInfo);
    if (teamInfo) {
      Alert.alert('완료', '팀 생성이 완료되었습니다. 이어서 팀 초대를 하시겠습니까? ( 나중에 팀목록 -> 팀초대로 팀을 초대할 수 있습니다 )', [
        {
          text: '팀 초대',
          onPress: () => {
            trigger(`${Config.baseUrl}/api/users`);
            navigation.navigate('팀초대',{
              teamId: teamInfo.id
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
      ]);
    }
    if (teamInfoError) {
      Alert.alert('팀생성 오류', '이미 존재하는 팀명입니다.', [
        {text: '확인', onPress: console.log('팀생성 오류')},
      ]);
      setTeamInfoError('');
    }
  }, [teamInfo, teamInfoError]);

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
        onPress={() => onCreateTeam()}
        style={{
          marginVertical: 15,
          backgroundColor: '#d4d4d4',
          opacity: 0.5,
          borderRadius: 5,
          padding: 18,
          paddingVertical: 10,
          width: 61,
        }}>
        <Text>생성</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTeamScreen;
