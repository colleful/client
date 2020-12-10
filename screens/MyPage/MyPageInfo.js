import React from 'react';
import {View, Text} from 'react-native';

const MyPageInfo = ({myInfoData}) => {
  return (
    <View>
      <Text style={{fontSize: 18, marginBottom: 5}}>{myInfoData.nickname}</Text>
      <Text style={{fontSize: 14, color: 'gray', opacity: 0.7}}>
        {myInfoData.gender === 'MALE' ? '남' : '여'} {'/'} {myInfoData.age}{' '}
        {myInfoData.department}
      </Text>
    </View>
  );
};

export default MyPageInfo;
