import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import {useForm, Controller} from 'react-hook-form';
import styled, {css} from '@emotion/native';
import LoadingScreen from '../../../components/LoadingScreen';
import FindPasswordModal from '../FindPasswordModal/index';

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
      <View
        style={css`
          flex: 1;
          justify-content: center;
          align-items: center;
        `}>
        <View
          style={css`
            align-items: center;
            margin-bottom: 15px;
          `}>
          <Text
            style={css`
              align-self: flex-start;
              margin-bottom: 5px;
            `}>
            학교 웹메일
          </Text>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <TextInput
                name="email"
                style={styles.input}
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
            <Text
              style={css`
                color: #f54260;
                align-self: flex-start;
                margin-bottom: 10px;
              `}>
              이메일을 입력해 주세요
            </Text>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <Text
              style={css`
                color: #f54260;
                align-self: flex-start;
                margin-bottom: 10px;
              `}>
              이메일 형식에 맞게 작성 해주세요
            </Text>
          )}

          <Text
            style={css`
              align-self: flex-start;
              margin-bottom: 5px;
            `}>
            비밀번호
          </Text>

          <View
            style={css`
              flex-direction: row;
              align-items: center;
            `}>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <TextInput
                  name="password"
                  style={[
                    styles.input,
                    css`
                      margin-left: -10px;
                    `,
                  ]}
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
            <View
              style={css`
                margin-right: -30px;
              `}
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
          </View>
          {errors.password && (
            <Text
              style={css`
                color: #f54260;
                align-self: flex-start;
                margin-bottom: 10px;
              `}>
              비밀번호를 입력해 주세요
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text
            style={css`
              color: white;
              text-align: center;
            `}>
            로그인
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={goToRegisterScreenHandler}>
          <Text
            style={css`
              color: white;
              text-align: center;
            `}>
            회원가입
          </Text>
        </TouchableOpacity>

        <View
          style={css`
            align-self: flex-end;
            margin-top: 10px;
            margin-right: 80px;
          `}>
          <Text
            onPress={toggleModal}
            style={css`
              color: #639fff;
            `}>
            비밀번호 찾기
          </Text>
        </View>
      </View>
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

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#ec5990',
    borderRadius: 10,
    width: 200,
    paddingVertical: 12,
    borderRadius: 4,
    opacity: 0.8,
    marginVertical: 5,
  },
  textArea: {
    width: 200,
    borderWidth: 0.5,
    height: 100,
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
});
