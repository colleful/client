import React, {useState, useEffect, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import {useForm, Controller} from 'react-hook-form';
import LoadingScreen from '../../../components/LoadingScreen';
import FindPasswordModal from '../FindPasswordModal/index';
import * as P from '../../../assets/css/common';
import * as S from './style';

const LoginScreen = ({
  navigation,
  onChangeLoginEmail,
  onChangeLoginPassword,
  onSubmitLogin,
  onChangeFindEmail,
  onChangeFindCode,
  onChangeFindPassword,
  onChangeFindPasswordConfirm,
  onSendAuthEmailForPasswordChange,
  onConfirmAuthEmail,
  onSubmitChangePassword,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const {email, password} = useSelector((state) => state.auth.login);
  const {authLoading, passwordChange} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (passwordChange === '') {
      dispatch(initializeForm('passwordChange'));
      toggleModal();
    }
  }, [passwordChange]);

  const visibleText = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const loginHandler = useCallback(() => {
    trigger();
    onSubmitLogin();
  }, [onSubmitLogin, trigger]);

  const goToRegisterScreenHandler = useCallback(() => {
    navigation.navigate('RegisterContainer');
  }, []);

  const {control, handleSubmit, trigger, watch, errors} = useForm({
    mode: 'onChange',
  });

  return (
    <>
      <S.Wrapper>
        <S.WrapperInner>
          <P.FormTitle>학교 웹메일</P.FormTitle>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <P.Input
                name="email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(email, value)}
                onChange={onChangeLoginEmail}
              />
            )}
            name="email"
            rules={{required: true, pattern: /^\S+@\S+$/i}}
            defaultValue=""
          />
          {errors.email && errors.email.type === 'required' && (
            <P.ErrorMessage>이메일을 입력해 주세요</P.ErrorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <P.ErrorMessage>이메일 형식에 맞게 작성 해주세요</P.ErrorMessage>
          )}

          <P.FormTitle>비밀번호</P.FormTitle>

          <P.Container>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <P.InputWithIcon
                  name="password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={(password, value)}
                  onChange={onChangeLoginPassword}
                  secureTextEntry={isPasswordVisible}
                />
              )}
              name="password"
              rules={{required: true}}
              defaultValue=""
            />
            {isPasswordVisible ? (
              <Ionicons
                name="eye-off-outline"
                size={20}
                onPress={visibleText}
              />
            ) : (
              <Ionicons name="eye-outline" size={20} onPress={visibleText} />
            )}
          </P.Container>
          {errors.password && (
            <P.ErrorMessage>비밀번호를 입력해 주세요</P.ErrorMessage>
          )}

          <P.Button pink onPress={loginHandler}>
            <P.ButtonText>로그인</P.ButtonText>
          </P.Button>

          <P.Button pink onPress={goToRegisterScreenHandler}>
            <P.ButtonText>회원가입</P.ButtonText>
          </P.Button>

          <P.PasswordFindText onPress={toggleModal}>
            비밀번호 찾기
          </P.PasswordFindText>
        </S.WrapperInner>
      </S.Wrapper>

      {isModalVisible && (
        <FindPasswordModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          onChangeFindEmail={onChangeFindEmail}
          onChangeFindCode={onChangeFindCode}
          onChangeFindPassword={onChangeFindPassword}
          onChangeFindPasswordConfirm={onChangeFindPasswordConfirm}
          onSendAuthEmailForPasswordChange={onSendAuthEmailForPasswordChange}
          onConfirmAuthEmail={onConfirmAuthEmail}
          onSubmitChangePassword={onSubmitChangePassword}
        />
      )}
      {authLoading && <LoadingScreen />}
    </>
  );
};

export default LoginScreen;
