import React from 'react';
import {View, Text, Image} from 'react-native';

const TeamListItem = ({teams}) => {
  return (
    <>
      {
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'black',
            borderBottomWidth: 0.5,
            borderColor: '#D8D8D8',
            flex: 1,
            height: 100,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 50,
                height: 50,
                margin: 25,
              }}>
              <Image source={require('../images/1.png')} />
            </View>
            <Text style={{fontSize: 15}}>
              {teams.name} ({teams.player}명){'  '}
              {teams.gender === 'male' ? `남` : `여`}
              {'\n'}
              {teams.school} {teams.department}
            </Text>
          </View>
        </View>
      }
    </>
  );
};

export default TeamListItem;
