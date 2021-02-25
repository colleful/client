import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {css} from '@emotion/native';
import FlipCard from 'react-native-flip-card';

const TeamInfoModalListItem = ({teamMemberInfo}) => {
  return (
    <View
      style={css`
        border: 1px solid black;
        width: 50%;
        height: 50%;
        padding: 20px;
      `}>
      <FlipCard flip={false} flipHorizontal={true} flipVertical={false}>
        <View
          style={css`
            border: 1px solid black;
            flex: 1;
          `}>
          <Text style={styles.back}>
            {teamMemberInfo && teamMemberInfo.selfIntroduction}
          </Text>
        </View>

        <View
          style={css`
            border: 1px solid black;
            flex: 1;
          `}>
          <Image source={require('../../images/1.png')} style={styles.face} />
        </View>
      </FlipCard>
    </View>
  );
};

export default TeamInfoModalListItem;

const styles = StyleSheet.create({});
