import React from 'react';
import {View, Text} from 'react-native';
import {css} from '@emotion/native';

const NoticeScreen = () => {
  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text>공지사항 페이지</Text>
    </View>
  );
};

export default NoticeScreen;
