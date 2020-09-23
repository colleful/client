import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const InvitationScreen = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    age: '',
    gender: '',
  });

  const onGetUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo(13, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{marginBottom: 40, marginTop: 20}}>
        <Text style={{fontSize: 20}}>※ 맴버초대는 팀의 리더만 가능합니다</Text>
        <Text style={{fontSize: 20}}>※ 팀 생성한 사람이 리더 입니다</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 40,
        }}>
        <TextInput
          placeholder="초대할 멤버의 닉네임 입력"
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
