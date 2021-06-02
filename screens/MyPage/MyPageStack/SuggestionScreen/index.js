import React from 'react';
import {View, Text} from 'react-native';
import {css} from '@emotion/native';

const SuggestionScreen = () => {
  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text>개발자 건의사항</Text>
    </View>
  );
};

export default SuggestionScreen;
