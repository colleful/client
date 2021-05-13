import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, login, setLoginState, sendAuthEmailForPasswordChange, changePassword, confirmPasswordAuthEmail} from '../reducers/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import AsyncStorage from '@react-native-community/async-storage';
// import * as Keychain from 'react-native-keychain'; AsyncStorage은 안전하지않음, keychain 적용해야 안전
// 계정페이지에서 본인인증을 하기위해 또 다시 패스워드를 칠때 password를 asyncstorage에 저장했는데,, 문제될거같음. 다시한번 생각해보기
const LoginContainer = ({navigation}) => {
  const {
    form,
    auth,
    authError,
    forgetPassword,
    passwordConfirmEmail,
    passwordConfirmEmailError,
    passwordEmailAuth,
    passwordEmailAuthError,
    passwordChange,
    passwordChangeError,
  } = useSelector(({auth}) => ({
    form: auth.login,
    ...auth,
  }));

  const dispatch = useDispatch();

  const onChangeLoginEmail = useCallback((e) => {
    const {text} = e.nativeEvent;
    dispatch(
      changeField({
        form: 'login',
        key: 'email',
        value: text,
      }),
    );
  },[dispatch]);

  const onChangeLoginPassword = useCallback((e) => {
    const {text} = e.nativeEvent;
    dispatch(
      changeField({
        form: 'login',
        key: 'password',
        value: text,
      }),
    );
  },[dispatch]);

  const onChangeFindEmail = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'email',
        value: text
      })
    );
  },[dispatch]);

  const onChangeFindCode = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'code',
        value: text
      })
    );
  },[dispatch]);

  const onChangeFindPassword = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'password',
        value: text
      })
    );
  },[dispatch]);

  const onChangeFindPasswordConfirm = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'forgetPassword',
        key: 'passwordConfirm',
        value: text
      })
    );
  },[dispatch]);

  const onSendAuthEmailForPasswordChange = useCallback(() => {
    const { email } = forgetPassword;
    dispatch(sendAuthEmailForPasswordChange({ email }));
  },[dispatch, forgetPassword]);

  const onConfirmAuthEmail = useCallback(() => {
    const { email, code } = forgetPassword;
    dispatch(confirmPasswordAuthEmail({ email,code }));
  },[dispatch, forgetPassword]);

  const onSubmitLogin = useCallback(() => {
    const {email, password} = form;
    if (!email || !email.trim()) {
      Alert.alert('로그인 실패', '아이디를 입력해주세요', [
        {
          text: '확인',
        },
      ]);
      return;
    }
    
    // 최종 배포할땐 아래 주석 없애기

    // if (!email.includes('@jbnu.ac.kr')) {
    //   Alert.alert('로그인 실패', '올바르지 않은 주소입니다', [
    //     {text: '확인', onPress: () => console.log('주소가 @jbnu.ac.kr이 아님')},
    //   ]);
    //   return;
    // }
    
    if (!password || !password.trim()) {
      Alert.alert('로그인 실패', '비밀번호를 입력해주세요', [
        {
          text: '확인',
        },
      ]);
      return;
    }
    dispatch(login({email, password}));
  },[dispatch, form]);

  const onSubmitChangePassword = useCallback(() => {
    const {email, password, passwordConfirm} = forgetPassword;
    if(!password || !password.trim()) {
      Alert.alert('비밀번호 변경 실패', '비밀번호를 입력해주세요', [
        {
          text: '확인',
        },
      ]);
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호 변경 실패', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.', [
        { 
          text: '확인', 
        },
      ])
      dispatch(changeField({ form: 'forgetPassword', key: 'password', value: '' }));
      dispatch(changeField({ form: 'forgetPassword', key: 'passwordConfirm', value: '' }));
      return;
    }
    dispatch(changePassword({email, password}));
    dispatch(initializeForm('forgetPassword'));
    dispatch(initializeForm('passwordConfirmEmail'))
  },[dispatch, forgetPassword]);

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('authorization', value);
    } catch (error) {
      console.log(error);
    }
  };

  const storePassword = async (value) => {
    try {
      await AsyncStorage.setItem('userPassword', value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authError) {
      Alert.alert('로그인 오류', `${authError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      dispatch(initializeForm('authError'));
      console.log({authError});
      return;
    }
    if(auth){
      if (auth.hasOwnProperty('authorization')) { 
        storeToken(auth.authorization); // auth === response.data
        storePassword(form.password);
        console.log(form.password);
        dispatch(setLoginState(true));
        dispatch(initializeForm('auth'));
        dispatch(initializeForm('login'));
        console.log('로그인 성공');
      }
    }
    if(passwordEmailAuthError) {
      Alert.alert('이메일 인증 보내기 실패',`${passwordEmailAuthError.message}`, [
        { 
          text: '확인',
        },
      ]);
      console.log({passwordEmailAuthError});
      return;
    }
    if(passwordEmailAuth === '') {
      Alert.alert('이메일 인증 보내기 성공', '인증번호를 전송 했습니다. 메일함을 확인하고 인증번호를 입력해주세요', [
        { 
          text: '확인',
        },
      ])
      dispatch(initializeForm('passwordEmailAuth'));
      return;
    }
    if(passwordConfirmEmailError) {
      Alert.alert('이메일 인증 실패', `${passwordConfirmEmailError.response.data.message}`, [
        { 
          text: '확인',
        },
      ])
      console.log({passwordConfirmEmailError});
      return;
    }
    if(passwordConfirmEmail === '') {
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공했습니다. 변경할 비밀번호를 입력해주세요', [
        { 
          text: '확인',
        },
      ])
      return;
    }
    if(passwordChangeError) {
      Alert.alert('비밀번호 변경 실패', `${passwordChangeError.response.data.message}`, [
        { 
          text: '확인',
        },
      ]);
      console.log({passwordChangeError});
      return;
    }
    
    if(passwordChange === '') {
      Alert.alert('비밀번호 변경 성공', '비밀번호가 정상적으로 변경되었습니다', [
        { 
          text: '확인',
        },
      ])
    }

  }, [auth, authError, passwordConfirmEmail, passwordConfirmEmailError, passwordEmailAuth, passwordEmailAuthError, passwordChange, passwordChangeError, dispatch]);

  return (
    <LoginScreen
      navigation={navigation}
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

export default React.memo(LoginContainer);
