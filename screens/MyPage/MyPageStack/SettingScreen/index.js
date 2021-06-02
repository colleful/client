import React from 'react';
import {View, Text} from 'react-native';
import {css} from '@emotion/native';

const SettingScreen = () => {
  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text>설정 페이지</Text>
    </View>
  );
};

export default SettingScreen;
