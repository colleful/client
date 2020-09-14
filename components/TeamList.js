import React from 'react';
import TeamListItem from './TeamListItem';

const TeamList = ({teams}) => {
  return teams.map((team) => <TeamListItem key={team.id} teams={team} />);
};

export default TeamList;
