import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginState} from '../../../../reducers/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '@emotion/native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import * as P from '../../../../assets/css/InputForm';
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
import {
  CHANGE_USER_INFO_REQUEST,
  CHANGE_USER_PASSWORD_REQUEST,
  DELETE_USER_REQUEST,
  INITAILIZE_STATE,
} from '../../../../reducers/user';
import LoadingScreen from '../../../../components/LoadingScreen';

const AccountScreen = ({navigation, myInfoData}) => {
  const [isSuccessIdentification, setSuccessIdentification] = useState(false);
  const [passwordForAuth, setPasswordForAuth] = useState();
  const [passwordForChange, setPasswordForChange] = useState();
  const [passwordForConfirm, setPasswordForConfirm] = useState();
  const [nicknameForChange, setNicknameForChange] = useState('');
  const [selfIntroductionForChange, setSelfIntroductionForChange] = useState(
    '',
  );

  const dispatch = useDispatch();
  const {
    changeUserInfoLoading,
    changeUserInfoDone,
    changeUserInfoError,
    deleteUserLoading,
    deleteUserDone,
    deleteUserError,
    changeUserPasswordLoading,
    changeUserPasswordDone,
    changeUserPasswordError,
  } = useSelector(({user}) => user);
  const currentError =
    changeUserInfoError || deleteUserError || changeUserPasswordError;

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (deleteUserDone) {
      Alert.alert('완료', '회원 탈퇴를 정상적으로 처리했습니다.', [
        {
          text: '확인',
          onPress: deleteUserHandler,
        },
      ]);
    }
    if (changeUserPasswordDone) {
      Alert.alert('완료', '비밀번호 변경을 성공했습니다.', [
        {
          text: '확인',
          onPress: () => {
            AsyncStorage.setItem('userPassword', passwordForChange);
            navigation.navigate('유저정보');
          },
        },
      ]);
    }
    if (changeUserInfoDone) {
      Alert.alert('완료', '회원정보 수정을 완료했습니다.', [
        {
          text: '확인',
          onPress: () => {
            trigger(`${Config.baseUrl}/api/users`);
            navigation.navigate('유저정보');
          },
        },
      ]);
    }
    if (currentError) {
      Alert.alert('에러', `${currentError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({currentError});
    }
  }, [
    deleteUserDone,
    changeUserPasswordDone,
    changeUserInfoDone,
    currentError,
  ]);

  const DeleteUser = useCallback(() => {
    dispatch({type: DELETE_USER_REQUEST});
  }, [dispatch]);

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

  const onChangeUserPassword = useCallback(() => {
    dispatch({
      type: CHANGE_USER_PASSWORD_REQUEST,
      data: {password: passwordForChange},
    });
  }, [dispatch, passwordForChange]);

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
    if (nicknameForChange !== myInfoData.nickname && nicknameForChange !== '') {
      return {nickname: nicknameForChange};
    }
    if (
      selfIntroductionForChange !== myInfoData.selfIntroduction &&
      selfIntroductionForChange !== ''
    ) {
      return {selfIntroduction: selfIntroductionForChange};
    }
  }, [
    nicknameForChange,
    selfIntroductionForChange,
    myInfoData.nickname,
    myInfoData.selfIntroduction,
  ]);

  const onChangeUserInfo = useCallback(() => {
    dispatch({type: CHANGE_USER_INFO_REQUEST, data: userData()});
  }, [dispatch, userData]);

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
              <P.Title>닉네임</P.Title>
              <P.Input
                onChangeText={(text) => setNicknameForChange(text)}
                defaultValue={myInfoData.nickname}
              />
              <View
                style={css`
                  margin-bottom: 15px;
                `}
              />

              <P.Title>자기소개</P.Title>
              <P.Input
                onChangeText={(text) => setSelfIntroductionForChange(text)}
                defaultValue={myInfoData.selfIntroduction}
              />
              <Button__dark__width100__marginVertical20
                onPress={onChangeUserInfo}>
                <P.ButtonText>수정</P.ButtonText>
              </Button__dark__width100__marginVertical20>
            </View>

            <View
              style={css`
                width: 100%;
                border: 0.3px solid gray;
                margin-bottom: 20px;
              `}
            />

            <P.Title>비밀번호 변경</P.Title>
            <P.Input
              placeholder="비밀번호"
              onChangeText={(text) => setPasswordForChange(text)}
              secureTextEntry
            />
            <View
              style={css`
                margin-bottom: 15px;
              `}
            />

            <P.Title>비밀번호 확인</P.Title>
            <P.Input
              placeholder="비밀번호"
              onChangeText={(text) => setPasswordForConfirm(text)}
              secureTextEntry
            />

            <Button__dark__width100__marginVertical20
              onPress={ConfirmToChangePassword}>
              <P.ButtonText>수정</P.ButtonText>
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
                <P.ButtonText>로그아웃</P.ButtonText>
              </Button__dark>
              <Button__dark onPress={userDeleteAlert}>
                <P.ButtonText>회원 탈퇴</P.ButtonText>
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

          <P.Title>비밀번호</P.Title>
          <P.Input
            onChangeText={(text) => setPasswordForAuth(text)}
            placeholder="비밀번호"
            secureTextEntry
          />
          <Button__dark__width100 onPress={confirmUser}>
            <P.ButtonText>확인</P.ButtonText>
          </Button__dark__width100>
        </AccountForm_container>
      )}
      {(changeUserInfoLoading ||
        deleteUserLoading ||
        changeUserPasswordLoading) && <LoadingScreen />}
    </>
  );
};

export default AccountScreen;
