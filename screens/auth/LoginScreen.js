import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import auth from '../../modules/auth';

const LoginScreen = ({navigation, isLoggedIn, LoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 20}}>
        <TextInput
          placeholder=" 학교 웹메일"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderBottomLeftRadius:5, borderTopLeftRadius:5, opacity:0.5, paddingLeft:10, width: 150, marginLeft: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          editable={false}
          placeholder=" @jbnu.ac.kr"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderTopRightRadius:5, borderBottomRightRadius:5, opacity:0.5, width: 100}}
        />
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder=" 비밀번호"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 250, paddingLeft:10,marginLeft: 10}}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={() => dispatch(LoginSuccess())} //여기서 api 비동기통신으로 받고 dispatch({type:LOGIN_SUCCESS , isSignedIn: true}) 해주면 될거같지않음?
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
          onPress={() => navigation.navigate('RegisterScreen')}
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
