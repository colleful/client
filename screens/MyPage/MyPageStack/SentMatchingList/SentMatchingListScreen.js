import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '@emotion/native';
import {Config} from '../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import SentMatchingList from './SentMatchingList';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../components/LoadingScreen';

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
  if (error) console.log({error});

  return (
    <View
      style={css`
        flex: 1;
        padding-top: 100px;
        padding-horizontal: 25px;
      `}>
      <View
        style={css`
          margin-bottom: 30px;
        `}>
        <Text
          style={css`
            font-size: 36px;
          `}>
          보낸 매칭요청 목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={css`
            border-bottom-width: 1px;
            margin-bottom: 20px;
          `}
        />
        {!sentMatchingList.length ? (
          <Text>보낸 요청이 없습니다</Text>
        ) : (
          <SentMatchingList sentMatchingList={sentMatchingList} />
        )}
      </ScrollView>
      {deleteMatchingLoading && <LoadingScreen />}
    </View>
  );
};

export default SentMatchingListScreen;
