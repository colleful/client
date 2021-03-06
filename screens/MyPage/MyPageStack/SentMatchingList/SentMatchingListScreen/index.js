import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import SentMatchingList from '../SentMatchingList/index';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const SentMatchingListScreen = ({teamId}) => {
  const [isLoading, setLoading] = useState(false);
  const {deleteMatchingLoading} = useSelector(({matching}) => matching);

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

  const {data: sentMatchingList = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/matching/sent`,
    fetcher,
  );
  if (!error && !sentMatchingList.length && isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    console.log({error});
  }
  return (
    <L.Wrapper>
      <L.HeaderTitle>보낸 매칭요청 목록</L.HeaderTitle>
      <L.BorderLine />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!sentMatchingList.length ? (
          <Text>보낸 요청이 없습니다</Text>
        ) : (
          <SentMatchingList sentMatchingList={sentMatchingList} />
        )}
      </ScrollView>
      {deleteMatchingLoading && <LoadingScreen />}
    </L.Wrapper>
  );
};

export default SentMatchingListScreen;
