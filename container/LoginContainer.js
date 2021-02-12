import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, login, setLoginState, sendAuthEmailForPasswordChange, emailValidstatus, changePassword, confirmPasswordAuthEmail, confirmPasswordAuthEmailInitialize, passwordEmailAuthInitialize, passwordChangeInitialize} from '../modules/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import * as Keychain from 'react-native-keychain'; AsyncStorage은 안전하지않음, keychain 적용해야 안전
// 계정페이지에서 본인인증을 하기위해 또 다시 패스워드를 칠때 password를 asyncstorage에 저장했는데,, 문제될거같음 
const LoginContainer = ({navigation}) => {
  const { form, password, forgetPassword, auth, authError, passwordConfirmEmail, passwordConfirmEmailError, passwordEmailAuth, passwordEmailAuthError, passwordChange, passwordChangeError} = useSelector(({auth}) => ({
    form: auth.login,
    password: auth.login.password,
    forgetPassword: auth.forgetPassword,
    auth: auth.auth,
    authError: auth.authError,
    passwordConfirmEmail: auth.passwordConfirmEmail,
    passwordConfirmEmailError: auth.passwordConfirmEmailError,
    passwordEmailAuth: auth.passwordEmailAuth,
    passwordEmailAuthError: auth.passwordEmailAuthError,
    passwordChange: auth.passwordChange,
    passwordChangeError: auth.passwordChangeError,
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
  };

  const onConfirmAuthEmail = () => {
    const { email,code } = forgetPassword;
    dispatch(confirmPasswordAuthEmail({ email,code }));
  };

  const onSubmitLogin = () => {
    const {email, password} = form;
    if ([email].includes('')) {
      Alert.alert('로그인 실패', '아이디를 입력해주세요', [
        {text: '확인', onPress: () => console.log('아이디 입력하지않음')},
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
    
    if ([password].includes('')) {
      Alert.alert('로그인 실패', '비밀번호를 입력해주세요', [
        {text: '확인', onPress: () => console.log('비밀번호 입력하지않음')},
      ]);
      return;
    }
    dispatch(login({email, password}));
    dispatch(emailValidstatus({form: 'isEmailvalidedAtPasswordFind', value: false}));
  };

  const onSubmitChangePassword = () => {
    const {email, password, passwordConfirm} = forgetPassword;
    if([password].includes('')) {
      Alert.alert('비밀번호 변경 실패', '비밀번호를 입력해주세요', [
        {text: '확인', onPress: () => console.log('비밀번호 변경 실패')},
      ]);
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호 변경 실패', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.', [
        { text: '확인', onPress:() => console.log('비밀번호 불일치')},
      ])
      dispatch(changeField({ form: 'forgetPassword', key: 'password', value: '' }));
      dispatch(changeField({ form: 'forgetPassword', key: 'passwordConfirm', value: '' }));
      return;
    }
    dispatch(changePassword({email, password}));
  };

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
    dispatch(initializeForm('login'));
    dispatch(initializeForm('forgetPassword'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        //비밀번호가 틀렸을때
        Alert.alert('로그인 오류', `${authError.response.data.message}`, [
          {text: '확인', onPress: console.log('비밀번호 불일치 오류')},
        ]);
        dispatch(initializeForm('authError'));
        return;
      } else if(authError.response.status === 404) {
        //가입되지 않은 유저
        Alert.alert('로그인 오류', `${authError.response.data.message}`, [
          {text: '확인', onPress: console.log('가입되지 않은 유저')},
        ]);
        dispatch(initializeForm('authError'));
        return;
      }
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if(auth){
      if (auth.hasOwnProperty('authorization')) { // auth.hasOwnProperty('token') 해준이유 : auth를 공용자원으로 사용중, 회원가입하면 login의 auth까지 사용돼서 여기에 씀. 위 if문에 && 연산자로 같이 쓰면 이미 hasOwnProperty는 null이 되기떄문에 안됨 
        console.log('로그인 성공');
        storeToken(auth.authorization); // auth === response.data
        storePassword(password);
        dispatch(setLoginState(true));
        dispatch(initializeForm('auth'));
      }
    }
    if(passwordEmailAuthError) {
      if(passwordEmailAuthError.response.status === 409) {
        Alert.alert('이메일 인증 보내기 실패',`${passwordEmailAuthError.message}`, [
          { text: '확인', onPress:() => console.log('이메일 인증 보내기 실패')},
        ])
        return;
      } else if(passwordEmailAuthError.response.status === 404) {
        Alert.alert('이메일 인증 보내기 실패',`${passwordEmailAuthError.message}`, [
          { text: '확인', onPress:() => console.log('이메일 인증 보내기 실패(학교 웹메일만 인증 가능)')},
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
    if(passwordConfirmEmailError) {
      if(passwordConfirmEmailError.response.status === 409) {
        Alert.alert('이메일 인증 실패', `${passwordConfirmEmailError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('비밀번호 찾기 이메일 인증 확인 실패')},
        ])
        return;
      }
      console.log('비밀번호 찾기 이메일 인증 확인 실패');
      console.log(passwordConfirmEmailError);
      return;
    }
    if(passwordConfirmEmail === '') {
      console.log('이메일 인증 성공');
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공했습니다. 변경할 비밀번호를 입력해주세요', [
        { text: '확인', onPress:() => dispatch(emailValidstatus({form: 'isEmailvalidedAtPasswordFind', value: true}))},
      ])
      dispatch(confirmPasswordAuthEmailInitialize(null));
      return;
    }
    if(passwordChangeError) {
      if(passwordChangeError.response.status === 500) {
        Alert.alert('비밀번호 변경 실패', `${passwordChangeError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('비밀번호 변경 실패')},
        ])
        return;
      } else if(passwordChangeError.response.status === 401) {
        Alert.alert('비밀번호 변경 실패', `${passwordChangeError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('비밀번호 변경 실패')},
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
        { text: '확인', onPress:() => console.log("비밀번호 변경 성공")},
      ])
      dispatch(passwordChangeInitialize(null));
    }

  }, [auth, authError, passwordConfirmEmail, passwordConfirmEmailError, passwordEmailAuth, passwordEmailAuthError, passwordChange, passwordChangeError, dispatch]);

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
