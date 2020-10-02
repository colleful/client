import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMyInfo} from '../modules/team';
import Team from '../components/Team';

const TeamContainer = () => {

  const dispatch = useDispatch();
  const {loadingTeams} = useSelector(({team}) => ({
    lodingTeams: team.loading.GET_TEAM_PENDING,
  }));

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  return <Team getMyInfo={getMyInfo} loadingTeams={loadingTeams} />;
};

export default TeamContainer;
