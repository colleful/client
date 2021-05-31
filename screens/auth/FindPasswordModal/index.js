import React, {useCallback} from 'react';
import {Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import * as FPM from './style';

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
    <Modal isVisible={isModalVisible} onBackButtonPress={toggleModal}>
      <FPM.Wrapper>
        <FPM.WrapperInner>
          {(passwordEmailAuthLoading ||
            passwordConfirmEmailLoading ||
            passwordChangeLoading) && <LoadingScreen />}
          <FPM.Header>
            {passwordConfirmEmail === '' ? (
              <FPM.Title large>비밀번호 변경</FPM.Title>
            ) : (
              <>
                <FPM.Title>이메일 인증을 통한</FPM.Title>
                <FPM.Title large>비밀번호 찾기</FPM.Title>
              </>
            )}
          </FPM.Header>

          <FPM.Content>
            {passwordConfirmEmail === '' ? (
              <>
                <FPM.Input
                  placeholder="새로운 비밀번호"
                  placeholderTextColor="black"
                  value={forgetPassword.password}
                  onChange={onChangeFindPassword}
                  secureTextEntry
                />
                <FPM.Input
                  placeholder="새로운 비밀번호 확인"
                  placeholderTextColor="black"
                  value={forgetPassword.passwordConfirm}
                  onChange={onChangeFindPasswordConfirm}
                  secureTextEntry
                />
                <FPM.Button onPress={onSubmitChangePassword}>
                  <FPM.ButtonText>변경하기</FPM.ButtonText>
                </FPM.Button>
              </>
            ) : (
              <>
                <FPM.Input
                  placeholder="학교이메일"
                  placeholderTextColor="black"
                  value={forgetPassword.email}
                  onChange={onChangeFindEmail}
                />
                <FPM.Button onPress={onSendAuthEmailForPasswordChange}>
                  <FPM.ButtonText>보내기</FPM.ButtonText>
                </FPM.Button>

                <FPM.Input
                  placeholder="인증번호"
                  placeholderTextColor="black"
                  value={forgetPassword.code}
                  onChange={onChangeFindCode}
                />
                <FPM.Button onPress={onConfirmAuthEmail}>
                  <FPM.ButtonText>인증하기</FPM.ButtonText>
                </FPM.Button>
              </>
            )}
            <FPM.ExitButton onPress={exitChangePasswordHandler}>
              <Text>나가기</Text>
            </FPM.ExitButton>
          </FPM.Content>
        </FPM.WrapperInner>
      </FPM.Wrapper>
    </Modal>
  );
};

export default FindPasswordModal;
