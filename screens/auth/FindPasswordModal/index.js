import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import styled, {css} from '@emotion/native';
import LoadingScreen from '../../../components/LoadingScreen';

const FindPasswordModal = ({
  isModalVisible,
  setModalVisible,
  onChangeFindEmail,
  onChangeFindCode,
  onChangeFindPassword,
  onChangeFindPasswordConfirm,
  onSendAuthEmailForPasswordChange,
  onConfirmAuthEmail,
  onSubmitChangePassword,
}) => {
  const {
    passwordConfirmEmail,
    passwordEmailAuthLoading,
    passwordConfirmEmailLoading,
    passwordChangeLoading,
    forgetPassword,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const exitChangePasswordHandler = useCallback(() => {
    toggleModal();
    dispatch(initializeForm('passwordConfirmEmail'));
    dispatch(initializeForm('forgetPassword'));
  }, [dispatch, toggleModal]);

  return (
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
            border-radius: 5px;
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
              <Text
                style={css`
                  font-size: 18px;
                `}>
                비밀번호 변경
              </Text>
            ) : (
              <>
                <Text
                  style={css`
                    font-size: 12px;
                  `}>
                  이메일 인증을 통한
                </Text>
                <Text
                  style={css`
                    font-size: 18px;
                  `}>
                  비밀번호 찾기
                </Text>
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
                onPress={onSubmitChangePassword}>
                <Text
                  style={css`
                    color: white;
                    text-align: center;
                  `}>
                  변경하기
                </Text>
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
                  onPress={onSendAuthEmailForPasswordChange}>
                  <Text
                    style={css`
                      color: white;
                      text-align: center;
                    `}>
                    보내기
                  </Text>
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
                  onPress={onConfirmAuthEmail}>
                  <Text
                    style={css`
                      color: white;
                      text-align: center;
                    `}>
                    인증하기
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FindPasswordModal;
