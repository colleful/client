import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {Config} from '../../../Config';
import AsyncStorage from '@react-native-community/async-storage';
import TeamInfoModalListItem from '../TeamInfoModalListItem/index';
import LoadingScreen from '../../../components/LoadingScreen';

const TeamInfoModalList = ({team}) => {
  const {id} = team;
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: teamMemberInfo, error} = useSWR(
    `${Config.baseUrl}/api/teams/${id}/members`,
    fetcher,
  );

  if (!error && !teamMemberInfo) {
    return <LoadingScreen />;
  }
  if (error) {
    console.log({error});
  }
  return teamMemberInfo?.map((teams, index) => (
    <TeamInfoModalListItem teamMemberInfo={teams} key={index} />
  ));
};

export default TeamInfoModalList;
