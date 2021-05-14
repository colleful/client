import React, {useState, useEffect, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import {useForm, Controller} from 'react-hook-form';
import {css} from '@emotion/native';
import LoadingScreen from '../../../components/LoadingScreen';
import FindPasswordModal from '../FindPasswordModal/index';
import {
  Wrapper,
  AuthForm,
  AuthForm_inputTitle,
  AuthForm_inputContainer,
  AuthForm_input,
  AuthForm_errorMessage,
  AuthForm_button,
  AuthForm_buttonText,
  AuthForm_passwordFindText,
} from './style';

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
      <Wrapper>
        <AuthForm>
          <AuthForm_inputTitle>학교 웹메일</AuthForm_inputTitle>
          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.email && errors.email.type === 'required' && (
            <AuthForm_errorMessage>
              이메일을 입력해 주세요
            </AuthForm_errorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <AuthForm_errorMessage>
              이메일 형식에 맞게 작성 해주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm_inputTitle>비밀번호</AuthForm_inputTitle>

          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.password && (
            <AuthForm_errorMessage>
              비밀번호를 입력해 주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm_button onPress={loginHandler}>
            <AuthForm_buttonText>로그인</AuthForm_buttonText>
          </AuthForm_button>

          <AuthForm_button onPress={goToRegisterScreenHandler}>
            <AuthForm_buttonText>회원가입</AuthForm_buttonText>
          </AuthForm_button>

          <AuthForm_passwordFindText onPress={toggleModal}>
            비밀번호 찾기
          </AuthForm_passwordFindText>
        </AuthForm>
      </Wrapper>

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
