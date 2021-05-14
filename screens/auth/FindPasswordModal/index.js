import React, {useCallback} from 'react';
import {Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import {css} from '@emotion/native';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  Wrapper,
  ModalForm,
  ModalForm_title,
  ModalForm_title__fontSize12,
  ModalForm_title__fontSize18,
  ModalForm_content,
  ModalForm_input,
  ModalForm_button,
  ModalForm_buttonText,
  ModalForm_exitButton,
} from './style';

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
      <Wrapper>
        <ModalForm>
          {(passwordEmailAuthLoading ||
            passwordConfirmEmailLoading ||
            passwordChangeLoading) && <LoadingScreen />}
          <ModalForm_title>
            {passwordConfirmEmail === '' ? (
              <ModalForm_title__fontSize18>
                비밀번호 변경
              </ModalForm_title__fontSize18>
            ) : (
              <>
                <ModalForm_title__fontSize12>
                  이메일 인증을 통한
                </ModalForm_title__fontSize12>
                <ModalForm_title__fontSize18>
                  비밀번호 찾기
                </ModalForm_title__fontSize18>
              </>
            )}
          </ModalForm_title>

          <ModalForm_content>
            {passwordConfirmEmail === '' ? (
              <>
                <ModalForm_input
                  placeholder="새로운 비밀번호"
                  placeholderTextColor="black"
                  value={forgetPassword.password}
                  onChange={onChangeFindPassword}
                  secureTextEntry
                />
                <ModalForm_input
                  placeholder="새로운 비밀번호 확인"
                  placeholderTextColor="black"
                  value={forgetPassword.passwordConfirm}
                  onChange={onChangeFindPasswordConfirm}
                  secureTextEntry
                />
                <ModalForm_button onPress={onSubmitChangePassword}>
                  <ModalForm_buttonText>변경하기</ModalForm_buttonText>
                </ModalForm_button>
              </>
            ) : (
              <>
                <ModalForm_input
                  placeholder="학교이메일"
                  placeholderTextColor="black"
                  value={forgetPassword.email}
                  onChange={onChangeFindEmail}
                />
                <ModalForm_button onPress={onSendAuthEmailForPasswordChange}>
                  <ModalForm_buttonText>보내기</ModalForm_buttonText>
                </ModalForm_button>

                <ModalForm_input
                  placeholder="인증번호"
                  placeholderTextColor="black"
                  value={forgetPassword.code}
                  onChange={onChangeFindCode}
                />
                <ModalForm_button onPress={onConfirmAuthEmail}>
                  <ModalForm_buttonText>인증하기</ModalForm_buttonText>
                </ModalForm_button>
              </>
            )}
            <ModalForm_exitButton onPress={exitChangePasswordHandler}>
              <Text>나가기</Text>
            </ModalForm_exitButton>
          </ModalForm_content>
        </ModalForm>
      </Wrapper>
    </Modal>
  );
};

export default FindPasswordModal;
