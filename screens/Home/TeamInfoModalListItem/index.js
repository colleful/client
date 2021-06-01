import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {css} from '@emotion/native';
import FlipCard from 'react-native-flip-card';
import {Gravatar} from 'react-native-gravatar';
import * as S from './style';

const TeamInfoModalListItem = ({teamMemberInfo}) => {
  return (
    <S.Wrapper>
      <FlipCard flip={false} flipHorizontal={true} flipVertical={false}>
        <S.CardContainer>
          <Gravatar
            options={{
              email: teamMemberInfo.email,
              parameters: {s: '200', d: 'retro'},
              secure: true,
            }}
            style={
              (styles.face,
              css`
                border-radius: 10px;
                width: 110px;
                height: 110px;
              `)
            }
          />
        </S.CardContainer>
        <Text style={styles.back}>
          간단소개 : {teamMemberInfo?.selfIntroduction}
          <S.BorderLine />
          학과 : {teamMemberInfo?.department}
          <S.BorderLine />
          나이 : {teamMemberInfo?.age}
        </Text>
      </FlipCard>
    </S.Wrapper>
  );
};

export default TeamInfoModalListItem;

const styles = StyleSheet.create({});
