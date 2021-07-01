import React from 'react';
import {Text, ScrollView} from 'react-native';
import MyPageNavList from '../MyPageNavList/index';
import MyPageInfo from '../MyPageInfo/index';
import * as S from './style';

const MyPageScreen = ({navigation, myInfoData}) => {
  const {email} = myInfoData;
  return (
    <S.Wrapper>
      <S.WrapperInner>
        <S.StyledGravatar
          options={{
            email: email,
            parameters: {s: '50', d: 'retro'},
            secure: true,
          }}
        />
        <S.ContentContainer>
          <MyPageInfo myInfoData={myInfoData} />
        </S.ContentContainer>
        <S.ButtonContainer>
          <S.Button
            onPress={() => {
              navigation.navigate('프로필');
            }}>
            <Text>프로필 보기</Text>
          </S.Button>
        </S.ButtonContainer>
      </S.WrapperInner>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyPageNavList navigation={navigation} />
      </ScrollView>
    </S.Wrapper>
  );
};

export default MyPageScreen;
