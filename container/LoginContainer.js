import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, login, setLoginState} from '../modules/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import {AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import * as Keychain from 'react-native-keychain';   오토링크문제 해결되면 추후에 적용 할 예정

const LoginContainer = ({navigation}) => {
  const { form, auth, authError} = useSelector(({auth}) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const dispatch = useDispatch();

  const onCreateAddress = (text) => {
    dispatch(
      changeField({
        form: 'login',
        key: 'email',
        value: (text.includes('@jbnu.ac.kr@jbnu.ac.kr') ? text.slice(0,-11) : text) === '@jbnu.ac.kr' ? '' : text
      })
    );
  };

  const onChangeLoginEmail = (e) => {
    const {text} = e.nativeEvent;
    dispatch(
      changeField({
        form: 'login',
        key: 'email',
        value: text,
      }),
    );
  };

  const onChangeLoginPassword = (e) => {
    const {text} = e.nativeEvent;
    dispatch(
      changeField({
        form: 'login',
        key: 'password',
        value: text,
      }),
    );
  };

  const onSubmitLogin = () => {
    const {email, password} = form;
    if ([email].includes('')) {
      Alert.alert('로그인 실패', '아이디를 입력해주세요', [
        {text: '확인', onPress: () => console.log('확인버튼 클릭됨')},
      ]);
      return;
    }
    if ([password].includes('')) {
      Alert.alert('로그인 실패', '비밀번호를 입력해주세요', [
        {text: '확인', onPress: () => console.log('확인버튼 클릭됨')},
      ]);
      return;
    }
    dispatch(login({email, password}));
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      console.log(error);
    }
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 500) {
        //아이디 및 비밀번호가 틀렸을때
        Alert.alert('로그인 오류', '아이디나 비밀번호를 다시 입력해주세요', [
          {text: '확인', onPress: console.log('아이디 비밀번호 입력오류')},
        ]);
        return;
      }
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      storeData(auth.token); // auth === response.data
      dispatch(setLoginState(true));
      dispatch(initializeForm('auth'));
    }
  }, [auth, authError, dispatch]);

  return (
    <LoginScreen
      navigation={navigation}
      form={form}
      onCreateAddress={onCreateAddress}
      onChangeLoginEmail={onChangeLoginEmail}
      onChangeLoginPassword={onChangeLoginPassword}
      onSubmitLogin={onSubmitLogin}
    />
  );
};

export default LoginContainer;
