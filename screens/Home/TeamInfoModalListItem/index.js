import React from 'react';
import {Text, StyleSheet} from 'react-native';
import FlipCard from 'react-native-flip-card';
import * as S from './style';

const TeamInfoModalListItem = ({teamMemberInfo}) => {
  const {email, selfIntroduction, department, age} = teamMemberInfo;
  return (
    <S.Wrapper>
      <FlipCard flip={false} flipHorizontal={true} flipVertical={false}>
        <S.CardContainer>
          <S.StyledGravatar
            options={{
              email: email,
              parameters: {s: '200', d: 'retro'},
              secure: true,
            }}
            style={styles.face}
          />
        </S.CardContainer>
        <Text style={styles.back}>
          간단소개 : {selfIntroduction}
          <S.BorderLine />
          학과 : {department}
          <S.BorderLine />
          나이 : {age}
        </Text>
      </FlipCard>
    </S.Wrapper>
  );
};

export default TeamInfoModalListItem;

const styles = StyleSheet.create({});
