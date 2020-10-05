import React from 'react';
import {View, StyleSheet} from 'react-native';
import TeamListItem from './TeamListItem';

const TeamList = ({team}) => {
  return team.map((teams, index) => (
    <View style={[index === 0 && {marginTop: 12}, styles.item]} key={index}>
      <TeamListItem team={teams} />
    </View>
  ));
};

export default TeamList;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    height: 100,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: '#f0f0f0',
    borderBottomWidth: 2,
  },
});
