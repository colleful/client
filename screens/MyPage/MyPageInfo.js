import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const MyPageInfo = ({myInfo}) => {
  return (
    <View>
      <Text style={{fontSize: 18, marginBottom: 5}}>{myInfo.nickname}</Text>
      <Text style={{fontSize: 14, color: 'gray', opacity: 0.7}}>
        {myInfo.gender === 'MALE' ? '남' : '여'} {'/'} {myInfo.age}{' '}
        {myInfo.department}
      </Text>
    </View>
  );
};

export default MyPageInfo;
