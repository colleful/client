import React from 'react';
import {View, Text, Image} from 'react-native';

const TeamListItem = ({teams}) => {

  const setStatus = () => {
    if(teams.status === 'ready') {
    return <Text style={{color: '#3390FF'}}>{'매칭전'}</Text>
    } else if(teams.status === 'waiting') {
      return <Text style={{color: '#FF5733'}}>{'진행준비중'}</Text>
    } else if(teams.status === 'matched') {
      return <Text style={{color: '#3383FF'}}>{'매칭완료'}</Text>
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderBottomWidth: 0.5,
        borderColor: '#D8D8D8',
        flex: 1,
        height: 100,
        marginHorizontal: 25
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50
          }}>
          <Image source={require('../images/1.png')} style={{borderRadius: 40}} />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 15, marginLeft: 25}}>
            {teams.teamName} ({teams.headcount}명){'  '}
            {teams.gender === 'male' ? `남` : `여`}
            {'\n'}
            {teams.college}{'  '}
            {setStatus()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TeamListItem;
