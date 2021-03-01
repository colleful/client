import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {css} from '@emotion/native';
import FlipCard from 'react-native-flip-card';
import {Gravatar} from 'react-native-gravatar';

const TeamInfoModalListItem = ({teamMemberInfo}) => {
  return (
    <View
      style={css`
        width: 50%;
        height: 50%;
        padding: 20px;
      `}>
      <FlipCard flip={false} flipHorizontal={true} flipVertical={false}>
        <View
          style={css`
            flex: 1;
          `}>
          <Gravatar
            options={{
              email: teamMemberInfo.email,
              parameters: { s: '200', d: 'retro'},
              secure: true,
            }}
            style={(styles.face, {borderRadius: 10, width: 100, height:100})}
          />
        </View>

        <View
          style={css`
            flex: 1;
          `}>
          <Text style={styles.back}>
            {teamMemberInfo && teamMemberInfo.selfIntroduction}
          </Text>
        </View>
      </FlipCard>
    </View>
  );
};

export default TeamInfoModalListItem;

const styles = StyleSheet.create({});
