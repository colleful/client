import React, {useState, useEffect, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import {useForm, Controller} from 'react-hook-form';
import LoadingScreen from '../../../components/LoadingScreen';
import FindPasswordModal from '../FindPasswordModal/index';
import {Wrapper, InputForm} from './style';
import {
  InputForm_title,
  InputForm_container__borderWidth05,
  InputForm_input,
  InputForm_inputWithIcon,
  InputForm_errorMessage,
  InputForm_button,
  InputForm_buttonText,
  InputForm_passwordFindText,
} from '../../../assets/css/InputForm';

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
        <InputForm>
          <InputForm_title>학교 웹메일</InputForm_title>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <InputForm_input
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
            <InputForm_errorMessage>
              이메일을 입력해 주세요
            </InputForm_errorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <InputForm_errorMessage>
              이메일 형식에 맞게 작성 해주세요
            </InputForm_errorMessage>
          )}

          <InputForm_title>비밀번호</InputForm_title>

          <InputForm_container__borderWidth05>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <InputForm_inputWithIcon
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
          </InputForm_container__borderWidth05>
          {errors.password && (
            <InputForm_errorMessage>
              비밀번호를 입력해 주세요
            </InputForm_errorMessage>
          )}

          <InputForm_button onPress={loginHandler}>
            <InputForm_buttonText>로그인</InputForm_buttonText>
          </InputForm_button>

          <InputForm_button onPress={goToRegisterScreenHandler}>
            <InputForm_buttonText>회원가입</InputForm_buttonText>
          </InputForm_button>

          <InputForm_passwordFindText onPress={toggleModal}>
            비밀번호 찾기
          </InputForm_passwordFindText>
        </InputForm>
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
