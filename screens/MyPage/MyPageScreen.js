import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import MyPageNavList from './MyPageNavList';
import {useDispatch} from 'react-redux';
import {setLoginState, initializeForm} from '../../modules/auth';
import axios from 'axios';
import {Config} from '../../Config';

const MyPageScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const DeleteUser = async () => {
    try {
      const response = await axios.delete(`${Config.baseUrl}/api/users`, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      Alert.alert('계정 삭제', '회원 탈퇴를 정상적으로 처리했습니다.', [
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
          <View>
            <Text style={{fontSize: 18, marginBottom: 5}}>박상범</Text>
            <Text style={{fontSize: 14, color: 'gray', opacity: 0.7}}>
              남 {'/'} 25 공과대학
            </Text>
          </View>
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
                    console.log('회원 탈퇴');
                    DeleteUser();
                    setTimeout(() => {
                      AsyncStorage.removeItem('token');
                    }, 2000);
                    dispatch(setLoginState(false)); // dispatch로 token값 변경하면 구독한 listener(SwitchNavigator)에 가서 바뀐 token값을 변경
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
