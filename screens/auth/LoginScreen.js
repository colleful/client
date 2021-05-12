import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../reducers/auth';
import {useForm, Controller} from 'react-hook-form';
import { css } from '@emotion/native';
import LoadingScreen from '../../components/LoadingScreen';

const LoginScreen = ({
  navigation,
  form,
  forgetPassword,
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
  const {
    passwordConfirmEmail,
    authLoading,
    passwordEmailAuthLoading,
    passwordConfirmEmailLoading,
    passwordChangeLoading,
    passwordChange
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(passwordChange === ''){
      dispatch(initializeForm('passwordChange'));
      toggleModal();
    }
  },[passwordChange]);

  const visibleText = useCallback(() => {
    setPasswordVisible(prev => !prev);
  },[]);

  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  },[]);

  const loginHandler = useCallback(() => {
    trigger();
    onSubmitLogin();
  },[onSubmitLogin, trigger]);
  
  const goToRegisterScreenHandler = useCallback(() => {
    navigation.navigate('RegisterContainer');
  },[]);

  const exitChangePasswordHandler = useCallback(() => {
    toggleModal();
    dispatch(initializeForm('passwordConfirmEmail'))
    dispatch(initializeForm('forgetPassword'));
  },[dispatch, toggleModal]);

  const {control, handleSubmit, trigger, watch, errors} = useForm({ mode: 'onChange' });
  // const onSubmit = (data) => console.log(data);

  return (
    <>
      <View style={css`flex: 1; justify-content: center; align-items: center`}>
        <View style={css`align-items: center; margin-bottom: 15px`}>
          <Text style={css`align-self: flex-start; margin-bottom: 5px`}>
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
                value={(form.email, value)}
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

          <Text style={css`align-self: flex-start; margin-bottom: 5px`}>
            비밀번호
          </Text>

          <View style={css`flex-direction: row; align-items: center`}>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <TextInput
                  name="password"
                  style={[styles.input, css`margin-left: -10px`]}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={(form.password, value)}
                  onChange={onChangeLoginPassword}
                  secureTextEntry={isPasswordVisible}
                />
              )}
              name="password"
              rules={{required: true}}
              defaultValue=""
            />
            <View style={css`margin-right: -30px`} />
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

        <Modal isVisible={isModalVisible}>
          <View
            style={css`
              flex: 1;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}>
            <View
              style={css`
                background-color: white;
                width: 250px;
                height: 250px;
                borderRadius: 5px;
              `}>
              {(passwordEmailAuthLoading ||
                passwordConfirmEmailLoading ||
                passwordChangeLoading) && <LoadingScreen />}
              <View
                style={css`
                  height: 50px;
                  justify-content: center;
                  align-items: center;
                  border-bottom-width: 0.5px;
                  border-color: gray;
                `}>
                {passwordConfirmEmail === '' ? (
                  <Text style={css`font-size: 18px`}>비밀번호 변경</Text>
                ) : (
                  <>
                    <Text style={css`font-size: 12px`}>이메일 인증을 통한</Text>
                    <Text style={css`font-size: 18px`}>비밀번호 찾기</Text>
                  </>
                )}
              </View>
              <TouchableOpacity
                onPress={exitChangePasswordHandler}
                style={css`
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  margin-bottom: 10px;
                  margin-right: 15px;
                `}>
                <Text>나가기</Text>
              </TouchableOpacity>
              {passwordConfirmEmail === '' ? (
                <View
                  style={css`
                    align-items: center;
                    margin-top: 10px;
                  `}>
                  <TextInput
                    placeholder="변경할 비밀번호 입력"
                    placeholderTextColor="black"
                    style={css`
                      border-bottom-width: 1px;
                      border-color: gray;
                      opacity: 0.5;
                      width: 150px;
                      height: 45px;
                      padding-left: 10px;
                      margin-right: 10px;
                    `}
                    value={forgetPassword.password}
                    onChange={onChangeFindPassword}
                    secureTextEntry
                  />
                  <TextInput
                    placeholder="비밀번호 확인"
                    placeholderTextColor="black"
                    style={css`
                      border-bottom-width: 1px;
                      border-color: gray;
                      opacity: 0.5;
                      width: 150px;
                      height: 45px;
                      padding-left: 10px;
                      margin-bottom: 10px;
                      margin-right: 10px;
                    `}
                    value={forgetPassword.passwordConfirm}
                    onChange={onChangeFindPasswordConfirm}
                    secureTextEntry
                  />
                  <TouchableOpacity
                    style={css`
                      background-color: #5e5e5e;
                      border-radius: 5px;
                      padding: 12px 4px;
                      margin-top: 5px;
                      width: 66px;
                    `}
                    onPress={onSubmitChangePassword}
                    >
                    <Text style={css`color: white; text-align: center`}>변경하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View
                    style={css`
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;
                      margin-top: 30px;
                    `}>
                    <TextInput
                      placeholder="학교이메일 입력"
                      placeholderTextColor="black"
                      style={css`
                        border-bottom-width: 1px;
                        border-color: gray;
                        opacity: 0.5;
                        width: 150px;
                        height: 45px;
                        padding-left: 10px;
                        margin-bottom: 10px;
                        margin-right: 10px;
                      `}
                      value={forgetPassword.email}
                      onChange={onChangeFindEmail}
                    />
                    <TouchableOpacity
                      style={css`
                        background-color: #5e5e5e;
                        border-radius: 5px;
                        padding: 12px 12px;
                        width: 61px;
                      `}
                      onPress={onSendAuthEmailForPasswordChange}
                      >
                      <Text style={css`color: white; text-align: center`}>보내기</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={css`
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;
                      margin-bottom: 20px;
                    `}>
                    <TextInput
                      placeholder="인증번호 입력"
                      placeholderTextColor="black"
                      style={css`
                        border-bottom-width: 1px;
                        border-color: gray;
                        opacity: 0.5;
                        width: 100px;
                        height: 45px;
                        padding-left: 10px;
                        margin-bottom: 10px;
                        margin-right: 20px;
                      `}
                      value={forgetPassword.code}
                      onChange={onChangeFindCode}
                    />
                    <TouchableOpacity
                      style={css`
                        background-color: #5e5e5e;
                        border-radius: 5px;
                        padding: 12px 4px;
                        width: 66px;
                      `}
                      onPress={onConfirmAuthEmail}
                      >
                      <Text style={css`color: white; text-align: center`}>인증하기</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.button}
          onPress={loginHandler}>
          <Text style={css`color: white; text-align: center`}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={goToRegisterScreenHandler}>
          <Text style={css`color: white; text-align: center`}>회원가입</Text>
        </TouchableOpacity>

        <View style={css`align-self: flex-end; margin-top: 10px; margin-right: 80px`}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={css`color: #639fff`}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
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
