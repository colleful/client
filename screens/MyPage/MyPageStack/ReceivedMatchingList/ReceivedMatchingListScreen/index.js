import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../../../../Config';
import ReceivedMatchingList from '../ReceivedMatchingList/index';
import useSWR from 'swr';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const ReceivedMatchingListScreen = ({teamId}) => {
  const [isLoading, setLoading] = useState(false);
  const {
    acceptMatchingLoading,
    refuseMatchingLoading,
    deleteMatchingLoading,
  } = useSelector(({matching}) => matching);

  const fetcher = async (url) => {
    setLoading((prev) => !prev);
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    setLoading((prev) => !prev);
    return response.data;
  };

  const {data: receivedMatchingList = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/matching/received`,
    fetcher,
  );
  if (!error && !receivedMatchingList.length && isLoading) {
    return <LoadingScreen />;
  }
  if (error) console.log({error});

  return (
    <L.Wrapper>
      <L.HeaderTitle>받은 매칭요청 목록</L.HeaderTitle>
      <L.BorderLine />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!receivedMatchingList.length ? (
          <Text>받은 요청이 없습니다</Text>
        ) : (
          receivedMatchingList && (
            <ReceivedMatchingList receivedMatchingList={receivedMatchingList} />
          )
        )}
      </ScrollView>
      {(acceptMatchingLoading ||
        refuseMatchingLoading ||
        deleteMatchingLoading) && <LoadingScreen />}
    </L.Wrapper>
  );
};

export default ReceivedMatchingListScreen;
