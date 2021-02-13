import React from 'react';
import {Text, View} from 'react-native';
import styled, {css} from '@emotion/native';

const ChatScreen = () => {
  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text>채팅페이지</Text>
    </View>
  );
};

export default ChatScreen;
