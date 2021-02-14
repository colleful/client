import React, {useState,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../../modules/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import * as authAPI from '../../../lib/api';
import {css} from '@emotion/native';
import {trigger} from 'swr';
import {Config} from '../../../Config';

const AccountScreen = ({navigation, myInfoData}) => {
  const dispatch = useDispatch();
  const [isSuccessIdentification, setSuccessIdentification] = useState(false);
  const [passwordForAuth, setPasswordForAuth] = useState();
  const [passwordForChange, setPasswordForChange] = useState();
  const [passwordForConfirm, setPasswordForConfirm] = useState();

  const [selectedDepartment, setSelectedDepartment] = useState({
    item: ''
  });
  const [departmentData,setDepartmentData] = useState([]);
  const [sortedDepartmentName, setSortedDepartmentName] = useState([]);
  const [nicknameForChange, setNicknameForChange] = useState('');
  const [selfIntroductionForChange, setSelfIntroductionForChange] = useState('');

  useEffect(()=>{
    getDepartments();
  },[]);

  const getDepartments = async () => {
    try {
      const response = await authAPI.getDepartment();
      setDepartmentData(response.data);
      setSortedDepartmentName(response.data.map(datas => datas.departmentName).sort());
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteUser = async () => {
    try {
      const response = await authAPI.deleteUser({
        headers: {
          'Authorization': await AsyncStorage.getItem('authorization'),
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

  const confirmUser = async () => {
    const userPassword = await AsyncStorage.getItem('userPassword');
    if (passwordForAuth === userPassword) {
      Alert.alert('인증 완료', '본인인증을 확인했습니다.', [
        {
          text: '확인',
          onPress: () => {
            setSuccessIdentification(true);
          },
        },
      ]);
    } else {
      Alert.alert('인증 실패', '비밀번호가 일치하지 않습니다.', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const onChangeUserPassword = async () => {
    try {
      await authAPI.changeUserPassword(
        {password: passwordForChange},
        {
          headers: {
            'Authorization': await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert('변경 성공', '비밀번호 변경을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('유저정보');
          },
        },
      ]);
    } catch (error) {
      console.log({error});
    }
  };

  const ConfirmToChangePassword = () => {
    if(passwordForChange !== passwordForConfirm) {
      Alert.alert('변경 실패', '두 비밀번호가 일치하지 않습니다.', [
        {
          text: '확인'
        },
      ]);
    } else {
      onChangeUserPassword();
    }
  };

  const userData = () => {
    let changeData = {};
    if(nicknameForChange !== myInfoData.nickname && nicknameForChange !== ''){
      let pair = {nickname: nicknameForChange};
      changeData = {...changeData, ...pair};
    }
    if(selfIntroductionForChange !== myInfoData.selfIntroduction && selfIntroductionForChange !== ''){
      let pair = {selfIntroduction: selfIntroductionForChange};
      changeData = {...changeData, ...pair};
    }
    if(selectedDepartment.item !== myInfoData.department){
      let pair = {departmentId: departmentData.find(data => data.departmentName === selectedDepartment.item).id};
      changeData = {...changeData, ...pair};
    }
    return changeData;
  }

  const onChangeUserInfo = async () => {
    try {
      await authAPI.changeUserInfo(
        userData(),
        {
          headers: {
            'Authorization': await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert('변경 성공', '회원정보 수정을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('유저정보');
          },
        },
      ]);
      trigger(`${Config.baseUrl}/api/users`);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <>
      {isSuccessIdentification ? (
        <ScrollView style={css`margin-top: 40px; padding-horizontal: 30px`}>
          <Text style={css`font-size: 32px`}>내 계정</Text>
          <View style={css`margin-top: 30px; align-items:center`}>
            <View
              style={css`flex-direction: row; align-items: center; margin-top: 10px`}>
              <Text style={css`font-size: 18px; margin-right: 20px`}>{'    '}닉네임</Text>
              <TextInput
                onChangeText={text => setNicknameForChange(text)}
                defaultValue={myInfoData.nickname}
                style={css`
                  margin-right: 20px;
                  padding-left: 15px;
                  width: 160px;
                  height: 40px;
                  border-width: 1px;
                  border-radius: 5px;
                  border-color: #404040;
                `}
              />
            </View>
            <View
              style={css`flex-direction: row; align-items: center; margin-top: 15px`}>
              <Text style={css`font-size: 18px; margin-right: 20px`}>단과대학</Text>
              <TouchableOpacity
                style={css`
                  margin-right: 20px;
                  padding-left: 5px;
                  width: 160px;
                  border-width: 1px;
                  border-radius: 5px;
                  border-color: #404040;
                `}>
                <Picker
                  selectedValue={selectedDepartment.item}  
                  mode="dropdown"
                  style={css`height: 50px; width: 250px`}
                  onValueChange={(itemValue) => { 
                    setSelectedDepartment({item: itemValue});
                  }}
                  itemStyle={{fontSize:15}} //ios만 지원됨 ㅋㅋ 
                  >
                  <Picker.Item label={myInfoData.department} value={myInfoData.department} />
                  {sortedDepartmentName.map((datas) => {
                    return (
                      <Picker.Item
                        label={datas}
                        value={datas}
                        key={datas}
                      />
                    );
                  })}
                </Picker>
              </TouchableOpacity>
            </View>
            <View
              style={css`flex-direction: row; align-items: center; margin-top: 15px`}>
              <Text style={css`font-size: 18px; margin-right: 20px`}>자기소개</Text>
              <TextInput
                onChangeText={text => setSelfIntroductionForChange(text)}
                defaultValue={myInfoData.selfIntroduction}
                style={css`
                  margin-right: 20px;
                  padding-left: 15px;
                  width: 160px;
                  height: 40px;
                  border-width: 1px;
                  border-radius: 5px;
                  border-color: #404040;
                `}
              />
            </View>
            <TouchableOpacity
              onPress={() => onChangeUserInfo()}
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 10px 18px;
                margin-vertical: 20px;
                width: 70px;
              `}>
              <Text style={css`color: white; text-align: center`}>수정</Text>
            </TouchableOpacity>
          </View>

          <View style={css`border-bottom-width:1px; margin-horizontal: 15px; margin-right: 25px`} />

          <View style={css`margin-top: 10px; align-items: center`}>
            <View
              style={css`flex-direction: row; align-items: center; margin-top: 15px`}>
              <Text style={css`font-size: 18px; margin-right: 20px`}>비밀번호 변경</Text>
              <TextInput
                placeholder="비밀번호"
                onChangeText={text => setPasswordForChange(text)}
                secureTextEntry
                style={css`
                  margin-right: 20px;
                  padding-left: 15px;
                  width: 130px;
                  height: 40px;
                  border-width: 1px;
                  border-radius: 5px;
                  border-color: #404040;
                `}
              />
            </View>
            <View
              style={css`flex-direction: row; align-items: center; margin-top: 15px`}>
              <Text style={css`font-size: 18px; margin-right: 20px`}>비밀번호 확인</Text>
              <TextInput
                placeholder="비밀번호"
                onChangeText={text => setPasswordForConfirm(text)}
                secureTextEntry
                style={css`
                  margin-right: 20px;
                  padding-left: 15px;
                  width: 130px;
                  height: 40px;
                  border-width: 1px;
                  border-radius: 5px;
                  border-color: #404040;
                `}
              />
            </View>
            <TouchableOpacity
              onPress={ConfirmToChangePassword}
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 10px 18px;
                margin-vertical: 20px;
                width: 70px;
              `}>
              <Text style={css`color: white; text-align: center`}>수정</Text>
            </TouchableOpacity>
          </View>
          <View style={css`border-bottom-width:1px; margin-horizontal: 15px; margin-right: 25px`} />
          <View style={css`flex-direction: row; justify-content: space-between; margin-top: 20px; margin-horizontal: 30px`}>
            <TouchableOpacity
              style={css`
                width: 80px;
                justify-content: center;
                padding: 7px 13px;
                border-radius: 5px;
                border-color: gray;
                border-width: 1px;
                opacity: 0.4;
                background-color: gray;
              `}
              onPress={() => {
                Alert.alert('LOGOUT', '로그아웃 하시겠습니까?', [
                  {
                    text: '취소',
                    onPress: () => {
                      console.log('취소');
                    },
                  },
                  {
                    text: '확인',
                    onPress: () => {
                      AsyncStorage.removeItem('authorization');
                      AsyncStorage.removeItem('userPassword');
                      dispatch(setLoginState(false)); // dispatch로 token값 변경하면 구독한 listener(SwitchNavigator)에 가서 바뀐 token값을 변경
                    },
                  },
                ]);
              }}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={css`
                width: 81px;
                justify-content: center;
                padding-horizontal: 13px;
                padding-vertical: 7px;
                border-radius: 5px;
                border-color: gray;
                border-width: 1px;
                opacity: 0.4;
                background-color: gray;
              `}
              onPress={() => {
                Alert.alert('회원 탈퇴', '정말 회원 탈퇴를 하시겠습니까?', [
                  {
                    text: '취소',
                    onPress: () => {
                      console.log('취소');
                    },
                  },
                  {
                    text: '확인',
                    onPress: () => {
                      DeleteUser();
                      setTimeout(() => {
                        AsyncStorage.removeItem('authorization');
                      }, 2000);
                      dispatch(setLoginState(false));
                    },
                  },
                ]);
              }}>
              <Text>회원 탈퇴</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={css`flex: 1; justify-content: center; align-items: center`}>
          <Text style={css`font-size: 36px`}>
            비밀번호 입력
          </Text>
          <View style={css`flex-direction: row; margin-top: 30px`}>
            <TextInput
              onChangeText={(text) => setPasswordForAuth(text)}
              placeholder="비밀번호"
              secureTextEntry
              style={css`
                margin-right: 20px;
                padding-left: 15px;
                width: 130px;
                height: 40px;
                border-width: 1px;
                border-radius: 5px;
                border-color: #404040;
              `}
            />
            <TouchableOpacity
              onPress={confirmUser}
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 12px 18px;
                width: 61px;
              `}>
              <Text style={css`color: white; text-align: center`}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountScreen;
