import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({
  navigation,
  form,
  onCreateAddress,
  onChangeLoginEmail,
  onChangeLoginPassword,
  onSubmitLogin,
}) => {
  const [visible, setVisible] = useState(true);
  const visibleText = () => {
    setVisible(!visible);
  };
  const addToBehindText = (e) => {
    onCreateAddress(`${e.nativeEvent.text}@jbnu.ac.kr`);
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
          secureTextEntry={visible}
        />
        {visible ? (
          <Ionicons name="eye-off-outline" size={20} onPress={visibleText} />
        ) : (
          <Ionicons name="eye-outline" size={20} onPress={visibleText} />
        )}
      </View>

      <View style={{flexDirection: 'row', marginTop: 10, marginRight: 20}}>
        <TouchableOpacity
          onPress={onSubmitLogin} //login용 onSubmitLogin
          style={{
            marginTop: 20,
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
            marginTop: 20,
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
