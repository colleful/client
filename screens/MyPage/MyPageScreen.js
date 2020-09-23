import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import MyPageNavList from './MyPageNavList';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../modules/auth';
import MyPageInfo from './MyPageInfo';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../lib/api';

const MyPageScreen = ({navigation, myInfoData}) => {
  const dispatch = useDispatch();
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    setMyInfo(myInfoData);
  }, []);

  const DeleteUser = async () => {
    try {
      const response = await authAPI.deleteUser({
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      Alert.alert('회원 탈퇴', '회원 탈퇴를 정상적으로 처리했습니다.', [
        {
          text: '확인',
        },
      ]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          backgroundColor: 'white',
          borderBottomColor: '#f0f0f0',
          padding: 20,
        }}>
        <Image
          source={require('../../images/1.png')}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <MyPageInfo myInfo={myInfoData} />

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 13,
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: 'gray',
              borderWidth: 1,
              opacity: 0.4,
              backgroundColor: 'gray',
            }}
            onPress={() => {
              Alert.alert('LOGOUT', '로그아웃 하시겠습니까?', [
                {
                  text: '확인',
                  onPress: () => {
                    AsyncStorage.removeItem('token');
                    dispatch(setLoginState(false)); // dispatch로 token값 변경하면 구독한 listener(SwitchNavigator)에 가서 바뀐 token값을 변경
                  },
                },
              ]);
            }}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 13,
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: 'gray',
              borderWidth: 1,
              opacity: 0.4,
              backgroundColor: 'gray',
            }}
            onPress={() => {
              Alert.alert('회원 탈퇴', '정말 회원 탈퇴를 하시겠습니까?', [
                {
                  text: '확인',
                  onPress: () => {
                    DeleteUser();
                    setTimeout(() => {
                      AsyncStorage.removeItem('token');
                    }, 2000);
                    dispatch(setLoginState(false));
                  },
                },
              ]);
            }}>
            <Text>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MyPageNavList navigation={navigation} />
    </View>
  );
};

export default MyPageScreen;