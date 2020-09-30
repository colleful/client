import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const InvitationScreen = ({route}) => {
  const [userId, setUserId] = useState(); //id로 검색하기 (유저 이메일이나 닉네임으로 검색하기 api가 없어서 임시방편)
  const [teamId, setTeamIds] = useState();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    age: '',
    gender: '',
  });

  useEffect(() => {
    setTeamIds(JSON.stringify(route.params.teamId));
  }, []);

  useEffect(() => {
    console.log(userId);
    console.log(teamId);
  }, [userId, teamId]);

  const onGetUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo(userId, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onInviteTeam = async () => {
    try {
      const res = await authAPI.inviteTeam(teamId, userId, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      if (res.status === 200) {
        Alert.alert(
          '완료',
          `${userInfo.nickname}님께 팀 초대 메세지를 보냈습니다`,
          [
            {
              text: '확인',
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert(
        '에러발생',
        `${error.response.data.message}`,
        [
          {
            text: '확인',
          },
        ],
      );
      console.log({error});
    }
  };

  return (
    <View style={{flex: 1, paddingTop: 100, paddingHorizontal: 20}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 32}}> 멤버 초대하기</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 40,
        }}>
        <TextInput
          placeholder="초대할 멤버의 닉네임 입력"
          onChangeText={(text) => setUserId(text)}
          style={{
            marginRight: 15,
            paddingLeft: 15,
            width: 200,
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#5e5e5e',
          }}
        />
        <TouchableOpacity
          onPress={() => onGetUserInfo()}
          style={{
            backgroundColor: '#3498db',
            borderRadius: 5,
            padding: 18,
            paddingVertical: 10,
            width: 60,
          }}>
          <Text style={{color: '#fff', fontWeight: '500'}}>검색</Text>
        </TouchableOpacity>
      </View>

      <View style={{borderBottomWidth: 1, marginBottom: 20}} />
      <Text style={{fontSize: 20, marginBottom: 15}}>검색결과</Text>

      {userInfo.hasOwnProperty('id') ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 5,
            padding: 10,
            backgroundColor: '#e5e5e5',
          }}>
          <Text style={{fontSize: 16, marginRight: 15}}>
            {userInfo.nickname} {userInfo.age}
            {' / '}
            {userInfo.gender === 'MALE' ? '남' : '여'}
          </Text>
          <TouchableOpacity
            onPress={() => onInviteTeam()}
            style={{
              backgroundColor: '#5e5e5e',
              borderRadius: 5,
              padding: 18,
              paddingVertical: 10,
              width: 60,
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>초대</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default InvitationScreen;

