import React, { useEffect, useCallback } from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, register, sendAuthEmail, confirmAuthEmail} from '../reducers/auth';
import RegisterScreen from '../screens/auth/RegisterScreen/index';

const RegisterContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const {form, auth, authError, emailAuth, emailAuthError, confirmEmail, confirmEmailError } = useSelector(({ auth }) => ({
    form: auth.register,
    ...auth,
  }));

  const onCreateAddress = useCallback((text) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'email',
        value: text === '@jbnu.ac.kr' ? '' : text
      })
    );
  },[dispatch]);

  const onChangeCode = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'code',
        value: text
      })
    )
  },[dispatch]);

  const getDepartmentId = useCallback((item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'departmentId',
        value: item
      })
    );
  },[dispatch]);

  const getGender = useCallback((item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'gender',
        value: item
      })
    );
  },[dispatch]);

  const getBirthYear = useCallback((item) => {
    dispatch(
      changeField({
        form: 'register',
        key: 'birthYear',
        value: item
      })
    );
  },[dispatch]);

  const onChangeEmail = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'email',
        value: text
      })
    );
  },[dispatch]);

  const onChangePassword = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'password',
        value: text
      })
    );
  },[dispatch]);

  const onChangePasswordConfirm = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'passwordConfirm',
        value: text
      })
    );
  },[dispatch]);

  const onChangeNickname = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'nickname',
        value: text
      })
    );
  },[dispatch]);

  const onChangeBirthYear = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'birthYear',
        value: text
      })
    );
  },[dispatch]);

  const onChangeGender = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'gender',
        value: text
      })
    );
  },[dispatch]);

  const onChangeDepartmentId = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'departmentId',
        value: text
      })
    );
  },[dispatch]);

  const onChangeSelfIntroduction = useCallback((e) => {
    const { text } = e.nativeEvent;
    dispatch(
      changeField({
        form: 'register',
        key: 'selfIntroduction',
        value: text
      })
    );
  },[dispatch]);

  const onSendAuthEmail = useCallback(() => {
    const { email } = form;
    dispatch(sendAuthEmail({ email }));
  },[dispatch, form]);

  const onConfirmAuthEmail = useCallback(() => {
    const { email,code } = form;
    dispatch(confirmAuthEmail({ email,code }));
  },[dispatch, form]);

  const onSubmitRegister = useCallback(() => {
    const { email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm } = form;
    if ([email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm].includes('')
        || !email.trim() || !password.trim() || !nickname.trim() || !selfIntroduction.trim()|| !passwordConfirm.trim()) 
    {
      Alert.alert('회원가입 실패', '빈 칸을 모두 입력해주세요', [
        { 
          text: '확인',
        },
      ])
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('회원가입 실패', '비밀번호가 일치하지 않습니다', [
        { 
          text: '확인',
        },
      ])
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      return;
    }
    if (confirmEmail !== '') {
      Alert.alert('회원가입 실패', '인증되지 않은 이메일입니다', [
        { 
          text: '확인',
        },
      ])
      return;
    }
    dispatch(register({ email, password, nickname, birthYear, gender, departmentId, selfIntroduction }));
    dispatch(initializeForm('confirmEmail'));
  },[dispatch, form]);

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if(authError) {
      Alert.alert('회원가입 실패', `${authError.response.data.message}`, [
        { 
          text: '확인',
        },
      ])
      dispatch(initializeForm('authError'));
      console.log({authError});
      return;
    }
    if(auth) {
      console.log(auth);
      dispatch(initializeForm('auth'));
      Alert.alert('회원가입 완료', '회원가입을 완료했습니다', [
        { text: '확인', onPress:() => navigation.navigate('LoginContainer')},
      ])
      return;
    }
    if(emailAuthError) {
      Alert.alert('에러발생', `${emailAuthError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({emailAuthError});
      return;
    }
    if(emailAuth === '') {
      Alert.alert('이메일 인증 보내기 성공', '인증번호를 전송 했습니다. 메일함을 확인하고 인증번호를 입력해주세요', [
        {
          text: '확인',
        },
      ])
      dispatch(initializeForm('emailAuth'));
      return;
    }
    if(confirmEmailError) {
      Alert.alert('이메일 인증 실패', `${confirmEmailError.response.data.message}`, [
        { 
          text: '확인',
        },
      ])
      console.log({confirmEmailError});
      return;
    }
    if(confirmEmail === '') {
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공했습니다', [
        { 
          text: '확인',
        },
      ])
      return;
    }
  }, [auth, authError, emailAuthError, emailAuth, confirmEmailError, confirmEmail]);

  return (
    <RegisterScreen
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

export default React.memo(RegisterContainer);