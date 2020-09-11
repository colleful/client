import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const SplashScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "green"}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 5,
          paddingVertical: 10,
          width: 100,
        }}>
        <Text>스플래시 페이지</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
