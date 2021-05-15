import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../../../reducers/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import * as authAPI from '../../../../lib/api';
import {css} from '@emotion/native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {
  InputForm_title,
  InputForm_container__borderWidth05,
  InputForm_input,
  InputForm_buttonText,
  InputForm_pickerContainer,
} from '../../../../assets/css/InputForm';
import {
  Wrapper,
  Inner,
  Header,
  Button__dark__width100__marginVertical20,
  Button__dark__width100,
  Button__dark,
  AccountForm_container,
  AccountForm_buttonContainer,
} from './style';

const AccountScreen = ({navigation, myInfoData}) => {
  const [isSuccessIdentification, setSuccessIdentification] = useState(false);
  const [passwordForAuth, setPasswordForAuth] = useState();
  const [passwordForChange, setPasswordForChange] = useState();
  const [passwordForConfirm, setPasswordForConfirm] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [departmentData, setDepartmentData] = useState([]);
  const [sortedDepartmentName, setSortedDepartmentName] = useState([]);
  const [nicknameForChange, setNicknameForChange] = useState('');
  const [selfIntroductionForChange, setSelfIntroductionForChange] = useState(
    '',
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const response = await authAPI.getDepartment();
      setDepartmentData(response.data);
      setSortedDepartmentName(
        response.data.map((datas) => datas.departmentName).sort(),
      );
    } catch (error) {
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const DeleteUser = async () => {
    try {
      await authAPI.deleteUser({
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      Alert.alert('회원 탈퇴', '회원 탈퇴를 정상적으로 처리했습니다.', [
        {
          text: '확인',
          onPress: deleteUserHandler,
        },
      ]);
    } catch (error) {
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const confirmUser = useCallback(async () => {
    const userPassword = await AsyncStorage.getItem('userPassword');
    if (passwordForAuth === userPassword) {
      Alert.alert('인증 완료', '본인인증을 확인했습니다.', [
        {
          text: '확인',
          onPress: () => setSuccessIdentification(true),
        },
      ]);
    } else {
      Alert.alert('인증 실패', '비밀번호가 일치하지 않습니다.', [
        {
          text: '확인',
        },
      ]);
    }
  }, [passwordForAuth, setSuccessIdentification]);

  const onChangeUserPassword = async () => {
    try {
      await authAPI.changeUserPassword(
        {password: passwordForChange},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert('변경 성공', '비밀번호 변경을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('유저정보'),
              AsyncStorage.setItem('userPassword', passwordForChange);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const ConfirmToChangePassword = useCallback(() => {
    if (passwordForChange !== passwordForConfirm) {
      Alert.alert('변경 실패', '두 비밀번호가 일치하지 않습니다.', [
        {
          text: '확인',
        },
      ]);
    } else {
      onChangeUserPassword();
    }
  }, [passwordForChange, passwordForConfirm, onChangeUserPassword]);

  const userData = useCallback(() => {
    let changeData = {};
    if (nicknameForChange !== myInfoData.nickname && nicknameForChange !== '') {
      let pair = {nickname: nicknameForChange};
      changeData = {...changeData, ...pair};
    }
    if (
      selfIntroductionForChange !== myInfoData.selfIntroduction &&
      selfIntroductionForChange !== ''
    ) {
      let pair = {selfIntroduction: selfIntroductionForChange};
      changeData = {...changeData, ...pair};
    }
    if (selectedDepartment.item !== myInfoData.department) {
      let pair = {
        departmentId: departmentData.find(
          (data) => data.departmentName === selectedDepartment.item,
        ).id,
      };
      console.log('pair', pair);
      changeData = {...changeData, ...pair};
    }
    return changeData;
  }, [
    nicknameForChange,
    selfIntroductionForChange,
    selectedDepartment,
    myInfoData.nickname,
    myInfoData.selfIntroduction,
    myInfoData.department,
  ]);

  const onChangeUserInfo = async () => {
    try {
      await authAPI.changeUserInfo(userData(), {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
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
      Alert.alert('에러', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const logoutHandler = useCallback(() => {
    AsyncStorage.removeItem('authorization');
    AsyncStorage.removeItem('userPassword');
    dispatch(setLoginState(false));
  }, [dispatch]);

  const deleteUserHandler = useCallback(() => {
    setTimeout(() => {
      AsyncStorage.removeItem('authorization');
    }, 2000);
    dispatch(setLoginState(false));
  }, [dispatch]);

  const logoutAlert = useCallback(() => {
    Alert.alert('LOGOUT', '로그아웃 하시겠습니까?', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: logoutHandler,
      },
    ]);
  }, [logoutHandler]);

  const userDeleteAlert = useCallback(() => {
    Alert.alert('회원 탈퇴', '정말 회원 탈퇴를 하시겠습니까?', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: DeleteUser,
      },
    ]);
  }, [DeleteUser]);

  return (
    <>
      {isSuccessIdentification ? (
        <Wrapper>
          <Inner>
            <Header>내 계정</Header>
            <View
              style={css`
                align-items: center;
              `}>
              <InputForm_title>닉네임</InputForm_title>
              <InputForm_input
                onChangeText={(text) => setNicknameForChange(text)}
                defaultValue={myInfoData.nickname}
              />
              <View
                style={css`
                  margin-bottom: 15px;
                `}
              />

              <InputForm_title>단과대학</InputForm_title>
              <InputForm_container__borderWidth05>
                <InputForm_pickerContainer
                  selectedValue={selectedDepartment.item}
                  mode="dropdown"
                  onValueChange={(itemValue) => {
                    setSelectedDepartment({item: itemValue});
                  }}
                  itemStyle={{fontSize: 15}} //ios만 지원됨 ㅋㅋ
                >
                  <Picker.Item
                    label={myInfoData.department}
                    value={myInfoData.department}
                  />
                  {sortedDepartmentName.map((datas) => {
                    return (
                      <Picker.Item label={datas} value={datas} key={datas} />
                    );
                  })}
                </InputForm_pickerContainer>
              </InputForm_container__borderWidth05>
              <View
                style={css`
                  margin-bottom: 15px;
                `}
              />

              <InputForm_title>자기소개</InputForm_title>
              <InputForm_input
                onChangeText={(text) => setSelfIntroductionForChange(text)}
                defaultValue={myInfoData.selfIntroduction}
              />
              <Button__dark__width100__marginVertical20
                onPress={onChangeUserInfo}>
                <InputForm_buttonText>수정</InputForm_buttonText>
              </Button__dark__width100__marginVertical20>
            </View>

            <View
              style={css`
                width: 100%;
                border: 0.3px solid gray;
                margin-bottom: 20px;
              `}
            />

            <InputForm_title>비밀번호 변경</InputForm_title>
            <InputForm_input
              placeholder="비밀번호"
              onChangeText={(text) => setPasswordForChange(text)}
              secureTextEntry
            />
            <View
              style={css`
                margin-bottom: 15px;
              `}
            />

            <InputForm_title>비밀번호 확인</InputForm_title>
            <InputForm_input
              placeholder="비밀번호"
              onChangeText={(text) => setPasswordForConfirm(text)}
              secureTextEntry
            />

            <Button__dark__width100__marginVertical20
              onPress={ConfirmToChangePassword}>
              <InputForm_buttonText>수정</InputForm_buttonText>
            </Button__dark__width100__marginVertical20>

            <View
              style={css`
                width: 100%;
                border: 0.3px solid gray;
                margin-bottom: 20px;
              `}
            />

            <AccountForm_buttonContainer>
              <Button__dark onPress={logoutAlert}>
                <InputForm_buttonText>로그아웃</InputForm_buttonText>
              </Button__dark>
              <Button__dark onPress={userDeleteAlert}>
                <InputForm_buttonText>회원 탈퇴</InputForm_buttonText>
              </Button__dark>
            </AccountForm_buttonContainer>
          </Inner>
        </Wrapper>
      ) : (
        <AccountForm_container>
          <Text
            style={css`
              font-size: 32px;
              margin-bottom: 20px;
            `}>
            본인인증 확인
          </Text>

          <InputForm_title>비밀번호</InputForm_title>
          <InputForm_input
            onChangeText={(text) => setPasswordForAuth(text)}
            placeholder="비밀번호"
            secureTextEntry
          />
          <Button__dark__width100 onPress={confirmUser}>
            <InputForm_buttonText>확인</InputForm_buttonText>
          </Button__dark__width100>
        </AccountForm_container>
      )}
    </>
  );
};

export default AccountScreen;
