import React, {useCallback} from 'react';
import {Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {initializeForm} from '../../../reducers/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import * as S from './style';

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
      <S.Wrapper>
        <S.WrapperInner>
          {(passwordEmailAuthLoading ||
            passwordConfirmEmailLoading ||
            passwordChangeLoading) && <LoadingScreen />}
          <S.Header>
            {passwordConfirmEmail === '' ? (
              <S.Title f18>비밀번호 변경</S.Title>
            ) : (
              <>
                <S.Title>이메일 인증을 통한</S.Title>
                <S.Title f18>비밀번호 찾기</S.Title>
              </>
            )}
          </S.Header>

          <S.Content>
            {passwordConfirmEmail === '' ? (
              <>
                <S.Input
                  placeholder="새로운 비밀번호"
                  placeholderTextColor="black"
                  value={forgetPassword.password}
                  onChange={onChangeFindPassword}
                  secureTextEntry
                />
                <S.Input
                  placeholder="새로운 비밀번호 확인"
                  placeholderTextColor="black"
                  value={forgetPassword.passwordConfirm}
                  onChange={onChangeFindPasswordConfirm}
                  secureTextEntry
                  mb10
                />
                <S.Button onPress={onSubmitChangePassword}>
                  <S.ButtonText>변경하기</S.ButtonText>
                </S.Button>
              </>
            ) : (
              <>
                <S.Input
                  placeholder="학교이메일"
                  placeholderTextColor="black"
                  value={forgetPassword.email}
                  onChange={onChangeFindEmail}
                />
                <S.Button onPress={onSendAuthEmailForPasswordChange}>
                  <S.ButtonText>보내기</S.ButtonText>
                </S.Button>

                <S.Input
                  placeholder="인증번호"
                  placeholderTextColor="black"
                  value={forgetPassword.code}
                  onChange={onChangeFindCode}
                />
                <S.Button onPress={onConfirmAuthEmail}>
                  <S.ButtonText>인증하기</S.ButtonText>
                </S.Button>
              </>
            )}
            <S.ExitButton onPress={exitChangePasswordHandler}>
              <Text>나가기</Text>
            </S.ExitButton>
          </S.Content>
        </S.WrapperInner>
      </S.Wrapper>
    </Modal>
  );
};

export default FindPasswordModal;
