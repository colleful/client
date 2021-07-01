import React from 'react';
import {View} from 'react-native';
import * as S from './style';

const MyPageInfo = ({myInfoData}) => {
  const {nickname, gender, age, department} = myInfoData;
  return (
    <View>
      <S.Nickname>{nickname}</S.Nickname>
      <S.Information>
        {gender === 'MALE' ? '남' : '여'} {'/'} {age} {department}
      </S.Information>
    </View>
  );
};

export default MyPageInfo;
