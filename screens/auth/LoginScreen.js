import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

const LoginScreen = ({
  navigation,
  form,
  forgetPassword,
  onCreateAddress,
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

  const {isEmailvalided} = useSelector(({auth}) => ({
    isEmailvalided: auth.isEmailvalided,
  }));

  const visibleText = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const addToBehindText = (e) => {
    onCreateAddress(`${e.nativeEvent.text}@jbnu.ac.kr`);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TextInput
          placeholder="학교 웹메일"
          placeholderTextColor="black"
          style={{
            backgroundColor: '#ccc',
            borderRadius: 5,
            opacity: 0.5,
            paddingLeft: 15,
            width: 220,
            marginLeft: 10,
            marginRight: 30,
          }}
          value={form.email}
          onChange={onChangeLoginEmail}
          onEndEditing={addToBehindText}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="black"
          style={{
            backgroundColor: '#ccc',
            borderRadius: 5,
            opacity: 0.5,
            width: 220,
            paddingLeft: 10,
            marginHorizontal: 10,
          }}
          secureTextEntry
          value={form.password}
          onChange={onChangeLoginPassword}
          secureTextEntry={isPasswordVisible}
        />
        {isPasswordVisible ? (
          <Ionicons name="eye-off-outline" size={20} onPress={visibleText} />
        ) : (
          <Ionicons name="eye-outline" size={20} onPress={visibleText} />
        )}
      </View>

      <View style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 80}}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{color: '#639fff'}}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: 250,
              height: 250,
              borderRadius: 10,
            }}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderColor: 'gray',
              }}>
              {isEmailvalided ? (
                <Text style={{fontSize: 18}}>비밀번호 변경</Text>
              ) : (
                <>
                  <Text style={{fontSize: 12}}>이메일 인증을 통한</Text>
                  <Text style={{fontSize: 18}}>비밀번호 찾기</Text>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                marginBottom: 10,
                marginRight: 15,
              }}>
              <Text>나가기</Text>
            </TouchableOpacity>
            {isEmailvalided ? (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TextInput
                  placeholder="변경할 비밀번호 입력"
                  placeholderTextColor="black"
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'gray',
                    opacity: 0.5,
                    width: 150,
                    height: 45,
                    paddingLeft: 10,
                    marginRight: 10,
                  }}
                  value={forgetPassword.password}
                  onChange={onChangeFindPassword}
                  secureTextEntry
                />
                <TextInput
                  placeholder="비밀번호 확인"
                  placeholderTextColor="black"
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'gray',
                    opacity: 0.5,
                    width: 150,
                    height: 45,
                    paddingLeft: 10,
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                  value={forgetPassword.passwordConfirm}
                  onChange={onChangeFindPasswordConfirm}
                  secureTextEntry
                />
                <Button
                  title="변경하기"
                  onPress={onSubmitChangePassword}
                  color="#00C831"
                />
              </View>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                  }}>
                  <TextInput
                    placeholder="학교이메일 입력"
                    placeholderTextColor="black"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'gray',
                      opacity: 0.5,
                      width: 160,
                      height: 45,
                      paddingLeft: 10,
                      marginBottom: 10,
                      marginRight: 10,
                    }}
                    value={forgetPassword.email}
                    onChange={onChangeFindEmail}
                  />
                  <Button
                    title="보내기"
                    onPress={onSendAuthEmailForPasswordChange}
                    color="#00C831"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <TextInput
                    placeholder="인증번호 입력"
                    placeholderTextColor="black"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'gray',
                      opacity: 0.5,
                      width: 100,
                      height: 45,
                      paddingLeft: 10,
                      marginBottom: 10,
                      marginRight: 20,
                    }}
                    value={forgetPassword.code}
                    onChange={onChangeFindCode}
                  />
                  <Button
                    title="인증하기"
                    onPress={onConfirmAuthEmail}
                    color="#00C831"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={{flexDirection: 'row', marginTop: 10, marginRight: 20}}>
        <TouchableOpacity
          onPress={onSubmitLogin} //login용 onSubmitLogin
          style={{
            marginTop: 10,
            marginRight: 20,
            backgroundColor: '#cdc',
            opacity: 0.5,
            borderRadius: 5,
            padding: 22,
            paddingVertical: 10,
            width: 80,
          }}>
          <Text>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterContainer')}
          style={{
            marginTop: 10,
            backgroundColor: '#cdc',
            opacity: 0.5,
            borderRadius: 5,
            padding: 15,
            paddingVertical: 10,
            width: 80,
          }}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
