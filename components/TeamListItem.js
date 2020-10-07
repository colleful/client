import React from 'react';
import {View, Text, Image} from 'react-native';

const TeamListItem = ({team}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
      <View
        style={{
          width: 50,
          height: 50,
        }}>
        <Image source={require('../images/1.png')} style={{borderRadius: 10}} />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 15, marginLeft: 25, lineHeight: 21}}>
          팀이름 : {team.teamName}
          {'\n'}
          팀인원 : {team.headcount}명{'  '}
          {team.gender === 'MALE' ? `💪` : `👗`}
          {'\n'}
          {team.college}
          평균나이 : {team.averageAge}
        </Text>
      </View>
    </View>
  );
};

export default TeamListItem;
