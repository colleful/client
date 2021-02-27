import React, {useState, useEffect, useCallback} from 'react';
import {View,Text} from 'react-native';
import useSWR from 'swr';
import axios from 'axios';
import {Config} from '../../Config';
import AsyncStorage from '@react-native-community/async-storage';
import TeamInfoModalListItem from './TeamInfoModalListItem';

const TeamInfoModalList = ({team}) => {
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: teamMemberInfo, error} = useSWR(
    `${Config.baseUrl}/api/teams/${team.id}/members`,
    fetcher,
  );

  if(!teamMemberInfo) return <Text>Loading...</Text>
  if (error) console.log({error});

  return teamMemberInfo && teamMemberInfo.map((team, index) => (
    <TeamInfoModalListItem teamMemberInfo={team} key={index} />
  ));
};

export default TeamInfoModalList;
