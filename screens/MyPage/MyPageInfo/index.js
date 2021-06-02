import React from 'react';
import {View} from 'react-native';
import * as S from './style';

const MyPageInfo = ({myInfoData}) => {
  return (
    <View>
      <S.Nickname>{myInfoData.nickname}</S.Nickname>
      <S.Information>
        {myInfoData.gender === 'MALE' ? '남' : '여'} {'/'} {myInfoData.age}{' '}
        {myInfoData.department}
      </S.Information>
    </View>
  );
};

export default MyPageInfo;
