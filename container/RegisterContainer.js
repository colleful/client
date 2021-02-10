import React, { useEffect } from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, register, sendAuthEmail, confirmAuthEmail, authEmailInitialize, confirmAuthEmailInitialize, emailValidstatus} from '../modules/auth';
import RegisterScreen from '../screens/auth/RegisterScreen';

const RegisterContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const { isEmailvalided, form, auth, authError, emailAuth, emailAuthError, confirmEmail, confirmEmailError } = useSelector(({ auth }) => ({
    isEmailvalided: auth.isEmailvalided,
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    emailAuth: auth.emailAuth,
    emailAuthError: auth.emailAuthError,
    confirmEmail: auth.confirmEmail,
    confirmEmailError: auth.confirmEmailError
  }));

  const onCreateAddress = (text) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'email',
        value: text === '@jbnu.ac.kr' ? '' : text
      })
    );
  };

  const onChangeCode = (e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'code',
        value: text
      })
    )
  }

  const getDepartmentId = (item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'departmentId',
        value: item
      })
    );
  };
  const getGender = (item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'gender',
        value: item
      })
    );
  };
  const getBirthYear = (item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'birthYear',
        value: item
      })
    );
  };
  const onChangeEmail = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'email',
        value: text
      })
    );
  };
  const onChangePassword = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'password',
        value: text
      })
    );
  };

  const onChangePasswordConfirm = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'passwordConfirm',
        value: text
      })
    );
  };
  const onChangeNickname = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'nickname',
        value: text
      })
    );
  };
  const onChangeBirthYear = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'birthYear',
        value: text
      })
    );
  };
  const onChangeGender = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'gender',
        value: text
      })
    );
  };
  const onChangeDepartmentId = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'departmentId',
        value: text
      })
    );
  };
  const onChangeSelfIntroduction = e => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'selfIntroduction',
        value: text
      })
    );
  };
  const onSendAuthEmail = () => {
    const { email } = form;
    dispatch(sendAuthEmail({ email }));
  }

  const onConfirmAuthEmail = () => {
    const { email,code } = form;
    dispatch(confirmAuthEmail({ email,code }));
  }

  const onSubmitRegister = () => {
    const { email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm } = form;
    if ([email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm].includes('')) {
      Alert.alert('회원가입 실패', '빈 칸을 모두 입력해주세요', [
        { text: '확인', onPress:() => console.log('확인버튼 클릭됨')},
      ])
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('회원가입 실패', '비밀번호가 일치하지 않습니다', [
        { text: '확인', onPress:() => console.log('확인 버튼 클릭됨')},
      ])
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      return;
    }
    if (!isEmailvalided) {
      Alert.alert('회원가입 실패', '인증되지 않은 이메일입니다', [
        { text: '확인', onPress:() => console.log('확인버튼 클릭됨')},
      ])
      return;
    }
    dispatch(register({ email, password, nickname, birthYear, gender, departmentId, selfIntroduction }));
    dispatch(emailValidstatus({form: 'isEmailvalided', value: false}));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if(authError) {
      if(authError.response.status === 500) {
        Alert.alert('회원가입 실패', `${authError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('확인 버튼 클릭됨')},
        ])
        dispatch(initializeForm('authError'));
        return;
      } 
      console.log('회원가입 실패');
      console.log(authError);
      return;
    }
    if(auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(initializeForm('auth'));
      Alert.alert('회원가입 완료', '회원가입을 완료했습니다', [
        { text: '확인', onPress:() => navigation.navigate('LoginContainer')},
      ])
    }
    if(emailAuthError) {
      if(emailAuthError.response.status === 409) {
        Alert.alert('이메일 인증 보내기 실패', `${emailAuthError.response.data.message}`, [
          { text: '확인', onPress:() => console.log(emailAuthError.response.data.message)},
        ])
        return;
      }
      console.log('이메일인증 보내기 실패');
      console.log(emailAuthError);
      return;
    }
    if(emailAuth === '') {
      Alert.alert('이메일 인증 보내기 성공', '인증번호를 전송 했습니다. 메일함을 확인하고 인증번호를 입력해주세요', [
        { text: '확인', onPress:() => console.log('회원가입용 이메일 인증 보내기 성공')},
      ])
      dispatch(authEmailInitialize(null));
      return;
    }
    if(confirmEmailError) {
      if(confirmEmailError.response.status === 409) {
        Alert.alert('이메일 인증 실패', `${confirmEmailError.response.data.message}`, [
          { text: '확인', onPress:() => console.log('회원가입용 이메일 인증 확인 실패')},
        ])
        return;
      }
      console.log('회원가입용 이메일 인증 확인 실패');
      console.log(confirmEmailError);
      return;
    }
    if(confirmEmail === '') {
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공했습니다', [
        { text: '확인', onPress:() => console.log('회원가입용 이메일 인증 확인 성공')},
      ])
      dispatch(emailValidstatus({form: 'isEmailvalided', value: true}));
      dispatch(confirmAuthEmailInitialize(null));
      return;
    }
  }, [auth, authError, emailAuthError, emailAuth, confirmEmailError, confirmEmail]);

  return (
    <RegisterScreen
      form={form}
      getDepartmentId={getDepartmentId}
      getGender={getGender}
      getBirthYear={getBirthYear}
      onSendAuthEmail={onSendAuthEmail}
      onCreateAddress={onCreateAddress}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangePasswordConfirm={onChangePasswordConfirm}
      onChangeNickname={onChangeNickname}
      onChangeBirthYear={onChangeBirthYear}
      onChangeGender={onChangeGender}
      onChangeDepartmentId={onChangeDepartmentId}
      onChangeSelfIntroduction={onChangeSelfIntroduction}
      onChangeCode={onChangeCode}
      onConfirmAuthEmail={onConfirmAuthEmail}
      onSubmitRegister={onSubmitRegister}
    />
  );
};

export default RegisterContainer;