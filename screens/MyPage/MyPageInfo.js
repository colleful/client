import React from 'react';
import {View, Text} from 'react-native';
import {css} from '@emotion/native';

const MyPageInfo = ({myInfoData}) => {
  return (
    <View>
      <Text style={css`font-size: 18px; margin-bottom: 5px`}>{myInfoData.nickname}</Text>
      <Text style={css`font-size: 14px; color: gray; opacity: 0.7`}>
        {myInfoData.gender === 'MALE' ? '남' : '여'} {'/'} {myInfoData.age}{' '}
        {myInfoData.department}
      </Text>
    </View>
  );
};

export default MyPageInfo;
