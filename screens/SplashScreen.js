import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <TouchableOpacity
        style={css`
          flex-direction: row;
          padding: 5px;
          padding-vertical: 10px;
          width: 100px;
        `}>
        <Text>스플래시 페이지</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
