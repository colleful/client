import React, { useState,useEffect } from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initializeForm, register,login,sendAuthEmail,confirmAuthEmail,authEmailInitialize,confirmAuthEmailInitialize, emailValidstatus} from '../modules/auth';
import SwitchNavigator from '../screens/SwitchNavigator';
import LoginScreen from '../screens/auth/LoginScreen';

const AuthContainer = () => {
  const [error, setError] = useState(null);
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
        value: text.includes('@jbnu.ac.kr@jbnu.ac.kr') ? text.slice(0,-11) : text 
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

  const onSubmit = () => {
    const { email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm } = form;
    // 하나라도 비어있다면
    if ([email, password, nickname, birthYear, gender, departmentId, selfIntroduction, passwordConfirm].includes('')) {
      Alert.alert('회원가입 실패', '빈 칸을 모두 입력해주세요', [
        { text: '확인', onPress:() => console.log('확인버튼 클릭됨')},
      ])
      // setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      Alert.alert('회원가입 실패', '비밀번호가 일치하지 않습니다', [
        { text: '확인', onPress:() => console.log('확인 버튼 클릭됨')},
      ])
      // setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      return;
    }
    // 이메일 인증을 하지 않았다면
    if (!isEmailvalided) {
      Alert.alert('회원가입 실패', '이메일 인증을 해주세요', [
        { text: '확인', onPress:() => console.log('확인버튼 클릭됨')},
      ])
      return;
    }
    dispatch(register({ email, password, nickname, birthYear, gender, departmentId, selfIntroduction }));
    dispatch(emailValidstatus({form: 'isEmailvalided', value: false}));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);


  useEffect(() => {
    if(authError) {
      if(authError.response.status === 500) {
        Alert.alert('회원가입 실패', '이미 회원가입을 했거나 이미 존재하는 닉네임입니다', [
          { text: '확인', onPress:() => console.log('확인 버튼 클릭됨')},
        ])
        // setError('이미 존재하는 계정명입니다.');
        return;
      }
      console.log('회원가입 실패');
      console.log(authError);
      return;
    }
    if(auth) {
      console.log('회원가입 성공');
      console.log(auth);
      Alert.alert('회원가입 완료', '이제 로그인 해주세요', [
        { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')}, //클릭시 네비게이션으로 loginScreen으로 가도록 구현하기
      ])
    }
    if(emailAuthError) {
      if(emailAuthError.response.status === 500) {
        Alert.alert('이메일 인증 보내기 실패', '이메일 인증 발송오류', [
          { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
        ])
        return;
      }
      console.log('이메일인증 보내기 실패');
      console.log(emailAuthError);
      return;
    }
    if(emailAuth === '') {
      console.log('이메일인증 보내기 성공');
      Alert.alert('이메일 인증 보내기 성공', '메일함을 확인하시고 해당 인증번호를 적어주세요', [
        { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
      ])
      dispatch(authEmailInitialize(null));
      return;
    }
    if(confirmEmailError) {
      if(confirmEmailError.response.status === 500) {
        Alert.alert('이메일 인증 실패', '인증번호를 다시 입력해주세요', [
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
      Alert.alert('이메일 인증 성공', '이메일 인증에 성공하셨습니다! 이어서 작성해주세요~', [
        { text: '확인', onPress:() => console.log('완료 버튼 클릭됨')},
      ])
      dispatch(emailValidstatus({form: 'isEmailvalided', value: true}));
      dispatch(confirmAuthEmailInitialize(null));
      return;
    }
  }, [auth, authError, emailAuthError, emailAuth, confirmEmailError, confirmEmail]);

  return (
    <SwitchNavigator
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
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default AuthContainer;