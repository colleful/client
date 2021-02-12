import React from 'react';
import {View, Text, Image} from 'react-native';
import {css} from '@emotion/native';

const TeamListItem = ({team}) => {
  return (
    <View
      style={css`
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
      `}>
      <View
        style={css`
          width: 50px;
          height: 50px;
        `}>
        <Image
          source={require('../images/1.png')}
          style={css`
            border-radius: 10px;
          `}
        />
      </View>
      <View
        style={css`
          flex-direction: column;
        `}>
        <Text
          style={css`
            font-size: 15px;
            margin-left: 25px;
            line-height: 21px;
          `}>
          팀이름 : {team.teamName}
          {'\n'}
          팀인원 : {team.headcount}명{'  '}
          {team.gender === 'MALE' ? `💪` : `👗`}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(TeamListItem);
