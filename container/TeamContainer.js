import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {getTeam} from '../modules/team';
import Team from '../components/Team';

const TeamContainer = ({getTeam, teams, loadingTeams}) => {
  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return <Team teams={teams} loadingTeams={loadingTeams} />
};

export default connect(
  ({team}) => ({
    teams: team.teams,
    lodingTeams: team.loading.GET_TEAM_PENDING,
  }),
  {
    getTeam,
  },
)(TeamContainer);
