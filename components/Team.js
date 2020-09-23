import React from 'react';
import {Text} from 'react-native';
import TeamList from './TeamList';

const Team = ({teams, loadingTeams}) => {
  return (
    <>
      {loadingTeams && <Text>팀 목록 불러오는 중...</Text>}
      {!loadingTeams && teams && <TeamList teams={teams} />}
    </>
  );
};

export default Team;
