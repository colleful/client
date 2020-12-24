import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {emailValidstatus} from '../../modules/auth';
import {useForm, Controller} from 'react-hook-form';

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

  const {isEmailvalidedAtPasswordFind} = useSelector(({auth}) => ({
    isEmailvalidedAtPasswordFind: auth.isEmailvalidedAtPasswordFind,
  }));
  const {isLoading} = useSelector(({loading}) => ({
    isLoading: loading.isLoading,
  }));

  const visibleText = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const addToBehindText = (e) => {
    onCreateAddress(
      e.nativeEvent.text.includes('@')
        ? e.nativeEvent.text
        : `${e.nativeEvent.text}@jbnu.ac.kr`,
    );
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();

  const {control, handleSubmit, trigger, watch, errors} = useForm({
    mode: 'onChange',
  }); // useForm({ mode: "onChange"});
  const onSubmit = (data) => console.log(data);

  return (
    <>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginBottom: 15}}>
          <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>
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
                onEndEditing={addToBehindText}
              />
            )}
            name="email"
            rules={{required: true, pattern: /^\S+@\S+$/i}}
            defaultValue=""
          />
          {errors.email && errors.email.type === 'required' && (
            <Text
              style={{
                color: '#f54260',
                alignSelf: 'flex-start',
                marginBottom: 10,
              }}>
              이메일을 입력해 주세요
            </Text>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <Text
              style={{
                color: '#f54260',
                alignSelf: 'flex-start',
                marginBottom: 10,
              }}>
              이메일 형식에 맞게 작성 해주세요
            </Text>
          )}

          <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>
            비밀번호
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <TextInput
                  name="password"
                  style={[styles.input, {marginLeft: -10}]}
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
            <View style={{marginRight: -30}} />
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
              style={{
                color: '#f54260',
                alignSelf: 'flex-start',
                marginBottom: 10,
              }}>
              비밀번호를 입력해 주세요
            </Text>
          )}
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
                borderRadius: 5,
              }}>
              {isLoading && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    opacity: 0.5,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999,
                  }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
              <View
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderColor: 'gray',
                }}>
                {isEmailvalidedAtPasswordFind ? (
                  <Text style={{fontSize: 18}}>비밀번호 변경</Text>
                ) : (
                  <>
                    <Text style={{fontSize: 12}}>이메일 인증을 통한</Text>
                    <Text style={{fontSize: 18}}>비밀번호 찾기</Text>
                  </>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  dispatch(
                    emailValidstatus({
                      form: 'isEmailvalidedAtPasswordFind',
                      value: false,
                    }),
                  );
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  marginBottom: 10,
                  marginRight: 15,
                }}>
                <Text>나가기</Text>
              </TouchableOpacity>
              {isEmailvalidedAtPasswordFind ? (
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
                    onPress={() => {
                      onSubmitChangePassword();
                      toggleModal(); //변경하기후에 나가지지 않으면 지우기
                    }}
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
                      onEndEditing={addToBehindText}
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

        <TouchableOpacity
          onPress={() => {
            trigger();
            onSubmitLogin();
          }}
          style={styles.button}>
          <Text style={{color: 'white', textAlign: 'center'}}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterContainer')}
          style={styles.button}>
          <Text style={{color: 'white', textAlign: 'center'}}>회원가입</Text>
        </TouchableOpacity>

        <View style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 80}}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{color: '#639fff'}}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
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
