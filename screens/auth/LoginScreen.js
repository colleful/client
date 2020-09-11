import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

const LoginScreen = ({navigation, form, onChangeLoginEmail, onChangeLoginPassword, onSubmitLogin}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 20}}>
        <TextInput
          placeholder=" 학교 웹메일"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderBottomLeftRadius:5, borderTopLeftRadius:5, opacity:0.5, paddingLeft:10, width: 250, marginLeft: 10}}
          value={form.email}
          onChange={onChangeLoginEmail}
        />
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder=" 비밀번호"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 250, paddingLeft:10, marginLeft: 10}}
          secureTextEntry
          value={form.password}
          onChange={onChangeLoginPassword}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={onSubmitLogin} //login용 onSubmitLogin
          style={{
            marginTop:20,
            marginRight:20,
            backgroundColor: '#cdc',
            opacity: 0.5,
            borderRadius:5,
            padding: 22,
            paddingVertical: 10,
            width: 80,
          }}>
          <Text>로그인</Text>
        </TouchableOpacity>
         <TouchableOpacity
          onPress={() => navigation.navigate('RegisterContainer')}
          style={{
            marginTop:20,
            backgroundColor: '#cdc',
            opacity: 0.5,
            borderRadius:5,
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
