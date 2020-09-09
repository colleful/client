import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const SplashScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "green"}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{
          flexDirection: 'row',
          padding: 5,
          paddingVertical: 10,
          width: 100,
        }}>
        <Text>로그인으로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
