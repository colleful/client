import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as S from './style';

const MyPageNavListItem = ({navigation, navInfo}) => {
  return navInfo.map((navInfos, index) => (
    <S.Button onPress={() => navigation.navigate(navInfos.navName)} key={index}>
      <Ionicons name={navInfos.iconName} size={22} />
      <S.ButtonText>{navInfos.navName}</S.ButtonText>
    </S.Button>
  ));
};

export default React.memo(MyPageNavListItem);
