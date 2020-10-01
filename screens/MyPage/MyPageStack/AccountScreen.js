import React, {useState,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../../modules/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import * as authAPI from '../../../lib/api';

const AccountScreen = ({navigation, myInfoData, update, setUpdate}) => {
  const dispatch = useDispatch();
  const [isSuccessIdentification, setSuccessIdentification] = useState(true);
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
            'Access-Token': await AsyncStorage.getItem('token'),
          },
        },
      );
      Alert.alert('변경 성공', '비밀번호 변경을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate("마이페이지");
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
            'Access-Token': await AsyncStorage.getItem('token'),
          },
        },
      );
      Alert.alert('변경 성공', '회원정보 수정을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate("마이페이지");
          },
        },
      ]);
      setUpdate(!update);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <>
      {isSuccessIdentification ? (
        <ScrollView style={{marginTop: 40, paddingHorizontal: 30}}>
          <Text style={{fontSize: 32,fontFamily: 'AntDesign'}}>내 계정</Text>
          <View style={{marginTop: 30, alignItems:'center'}}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 18, marginRight: 20, fontFamily: 'AntDesign'}}>    닉네임</Text>
              <TextInput
                onChangeText={text => setNicknameForChange(text)}
                defaultValue={myInfoData.nickname}
                style={{
                  marginRight: 20,
                  paddingLeft: 15,
                  width: 160,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#404040',
                }}
              />
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18, marginRight: 20, fontFamily: 'AntDesign'}}>단과대학</Text>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  paddingLeft: 5,
                  width: 160,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#404040',
                }}>
                <Picker
                  selectedValue={selectedDepartment.item}  
                  mode="dropdown"
                  style={{ height: 50, width: 250}}
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
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18, marginRight: 20, fontFamily: 'AntDesign'}}>자기소개</Text>
              <TextInput
                onChangeText={text => setSelfIntroductionForChange(text)}
                defaultValue={myInfoData.selfIntroduction}
                style={{
                  marginRight: 20,
                  paddingLeft: 15,
                  width: 160,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#404040',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => onChangeUserInfo()}
              style={{
                backgroundColor: '#5e5e5e',
                borderRadius: 5,
                padding: 18,
                paddingVertical: 10,
                marginVertical: 20,
                width: 70,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>수정</Text>
            </TouchableOpacity>
          </View>

          <View style={{borderBottomWidth:1, marginHorizontal: 15, marginRight: 25}} />

          <View style={{marginTop: 10, alignItems:'center'}}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18, marginRight: 20, fontFamily: 'AntDesign'}}>비밀번호 변경</Text>
              <TextInput
                placeholder="비밀번호"
                onChangeText={text => setPasswordForChange(text)}
                secureTextEntry
                style={{
                  marginRight: 20,
                  paddingLeft: 15,
                  width: 130,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#404040',
                }}
              />
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18, marginRight: 20, fontFamily: 'AntDesign'}}>비밀번호 확인</Text>
              <TextInput
                placeholder="비밀번호"
                onChangeText={text => setPasswordForConfirm(text)}
                secureTextEntry
                style={{
                  marginRight: 20,
                  paddingLeft: 15,
                  width: 130,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#404040',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={ConfirmToChangePassword}
              style={{
                backgroundColor: '#5e5e5e',
                borderRadius: 5,
                padding: 18,
                paddingVertical: 10,
                marginVertical: 20,
                width: 70,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>수정</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomWidth:1, marginHorizontal: 15, marginRight: 25}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30}}>
            <TouchableOpacity
              style={{
                width: 80,
                justifyContent: 'center',
                paddingHorizontal: 13,
                paddingVertical: 7,
                borderRadius: 5,
                borderColor: 'gray',
                borderWidth: 1,
                opacity: 0.4,
                backgroundColor: 'gray',
              }}
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
                      AsyncStorage.removeItem('token');
                      AsyncStorage.removeItem('userPassword');
                      dispatch(setLoginState(false)); // dispatch로 token값 변경하면 구독한 listener(SwitchNavigator)에 가서 바뀐 token값을 변경
                    },
                  },
                ]);
              }}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                justifyContent: 'center',
                paddingHorizontal: 13,
                paddingVertical: 7,
                borderRadius: 5,
                borderColor: 'gray',
                borderWidth: 1,
                opacity: 0.4,
                backgroundColor: 'gray',
              }}
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
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 36, fontFamily: 'AntDesign'}}>
            비밀번호 입력
          </Text>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <TextInput
              onChangeText={(text) => setPasswordForAuth(text)}
              placeholder="비밀번호"
              secureTextEntry
              style={{
                marginRight: 20,
                paddingLeft: 15,
                width: 130,
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#404040',
              }}
            />
            <TouchableOpacity
              onPress={confirmUser}
              style={{
                backgroundColor: '#e0e0e0',
                borderRadius: 5,
                padding: 18,
                paddingVertical: 10,
                width: 60,
              }}>
              <Text style={{color: '#404040'}}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountScreen;
