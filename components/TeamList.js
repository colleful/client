import React from 'react';

import TeamListItem from './TeamListItem';
const TeamList = ({team}) => {
  return (
    <>
      {team.map((teams) => (
        <TeamListItem key={teams.name} teams={teams} />
      ))}
    </>
  );
};

export default TeamList;
