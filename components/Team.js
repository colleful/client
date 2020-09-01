import React from 'react';
import TeamList from './TeamList';

const Team = ({teams, loadingTeams}) => {
  return (
    <>
      {loadingTeams && '팀 목록 불러오는 중...'}
      {!loadingTeams && teams && <TeamList teams={teams} />}
    </>
  );
};

export default Team;
