import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, login, setLoginState, sendAuthEmailForPasswordChange, emailValidstatus, changePassword, confirmAuthEmail, confirmAuthEmailInitialize, passwordEmailAuthInitialize, passwordChangeInitialize} from '../modules/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import {Alert, AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import * as Keychain from 'react-native-keychain';   오토링크문제 해결되면 추후에 적용 할 예정

const LoginContainer = ({navigation}) => {
  const { form, forgetPassword, auth, authError, confirmEmail, confirmEmailError, passwordEmailAuth, passwordEmailAuthError, passwordChange, passwordChangeError} = useSelector(({auth}) => ({
    form: auth.login,
    forgetPassword: auth.forgetPassword,
    auth: auth.auth,
    authError: auth.authError,
    confirmEmail: auth.confirmEmail,
    confirmEmailError: auth.confirmEmailError,
    passwordEmailAuth: auth.passwordEmailAuth,
    passwordEmailAuthError: auth.passwordEmailAuthError,
    passwordChange: auth.passwordChange,
    passwordChangeError: auth.passwordChangeError
  }));

  const dispatch = useDispatch();
  const onCreateAddress = (text) => {
    dispatch(
      changeField({
        form: 'login',
        key: 'email',
        value: text === '@jbnu.ac.kr' ? '' : text
      })
    );
  };

  //비밀번호 찾기에서도 하려면 form: 'forgetPassword'

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
  const onChangeFindEmail = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'email',
        value: text
      })
    );
  };
  const onChangeFindCode = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'code',
        value: text
      })
    );
  };
  const onChangeFindPassword = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'password',
        value: text
      })
    );
  };
  const onChangeFindPasswordConfirm = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'passwordConfirm',
        value: text
      })
    );
  };

  const onSendAuthEmailForPasswordChange = () => {
    const { email } = forgetPassword;
    dispatch(sendAuthEmailForPasswordChange({ email }));
  }

  const onConfirmAuthEmail = () => {
    const { email,code } = forgetPassword;
    dispatch(confirmAuthEmail({ email,code }));
  }

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
    dispatch(emailValidstatus({form: 'isEmailvalided', value: false}));
  };

  const onSubmitChangePassword = () => {
    const {email, password, passwordConfirm} = forgetPassword;
    if([password].includes('')) {
      Alert.alert('비밀번호 변경 실패', '비밀번호를 입력해주세요', [
        {text: '확인', onPress: () => console.log('확인버튼 클릭됨')},
      ]);
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호 변경 실패', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.', [
        { text: '확인', onPress:() => console.log('확인 버튼 클릭됨')},
      ])
      dispatch(changeField({ form: 'forgetPassword', key: 'password', value: '' }));
      dispatch(changeField({ form: 'forgetPassword', key: 'passwordConfirm', value: '' }));
      return;
    }
    dispatch(changePassword({email, password}));
  }
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
    dispatch(initializeForm('forgetPassword'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 500) {
        //아이디 및 비밀번호가 틀렸을때
        Alert.alert('로그인 오류', `${authError.response.data.message}`, [
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
    if(passwordEmailAuthError) {
      if(passwordEmailAuthError.response.status === 409) {
        Alert.alert('이메일 인증 보내기 실패',`${passwordEmailAuthError.message}`, [
          { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
        ])
        return;
      } else if(passwordEmailAuthError.response.status === 404) {
        Alert.alert('이메일 인증 보내기 실패','학교 웹메일만 인증 가능합니다', [
          { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
        ])
        return;
      }

      console.log('이메일인증 보내기 실패');
      console.log(passwordEmailAuthError);
      return;
    }
    if(passwordEmailAuth === '') {
      console.log('비밀번호 찾기 이메일 인증 보내기 성공');
      console.log(passwordEmailAuth)
      Alert.alert('이메일 인증 보내기 성공', '인증번호를 전송 했습니다. 메일함을 확인하고 인증번호를 입력해주세요', [
        { text: '확인', onPress:() => dispatch(passwordEmailAuthInitialize(null))},
      ])
      return;
    }
    if(confirmEmailError) {
      if(confirmEmailError.response.status === 409) {
        Alert.alert('이메일 인증 실패', `${confirmEmailError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
        ])
        return;
      }
      console.log('이메일인증 실패');
      console.log(confirmEmailError);
      return;
    }
    if(confirmEmail === '') {
      console.log('이메일 인증 성공');
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공했습니다. 변경할 비밀번호를 입력해주세요', [
        { text: '확인', onPress:() => dispatch(emailValidstatus({form: 'isEmailvalided', value: true}))},
      ])
      dispatch(confirmAuthEmailInitialize(null));
      return;
    }
    if(passwordChangeError) {
      if(passwordChangeError.response.status === 500 || passwordChangeError.response.status === 401) {
        Alert.alert('비밀번호 변경 실패', `${passwordChangeError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
        ])
        return;
      }
      console.log('비밀번호 변경 실패');
      console.log(passwordChangeError);
      return;
    }
    
    if(passwordChange === '') {
      console.log('비밀번호 변경 성공');
      Alert.alert('비밀번호 변경 성공', '비밀번호가 정상적으로 변경되었습니다', [
        { text: '확인', onPress:() => console.log("비밀번호 변경")}, // TODO : 로그인창으로 가게끔 구현 
      ])
      dispatch(passwordChangeInitialize(null));
    }

  }, [auth, authError, confirmEmail, confirmEmailError, passwordEmailAuth, passwordEmailAuthError, passwordChange, passwordChangeError, dispatch]);

  return (
    <LoginScreen
      navigation={navigation}
      form={form}
      forgetPassword={forgetPassword}
      onCreateAddress={onCreateAddress}
      onChangeLoginEmail={onChangeLoginEmail}
      onChangeLoginPassword={onChangeLoginPassword}
      onSubmitLogin={onSubmitLogin}
      onChangeFindEmail={onChangeFindEmail}
      onChangeFindCode={onChangeFindCode}
      onChangeFindPassword={onChangeFindPassword}
      onChangeFindPasswordConfirm={onChangeFindPasswordConfirm}
      onSendAuthEmailForPasswordChange={onSendAuthEmailForPasswordChange}
      onConfirmAuthEmail={onConfirmAuthEmail}
      onSubmitChangePassword={onSubmitChangePassword}
    />
  );
};

export default LoginContainer;
