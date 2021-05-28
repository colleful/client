import React, {useState, useEffect} from 'react';
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
  const {deleteMatchingLoading} = useSelector(({matching}) => matching);

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: sentMatchingList = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/matching/sent`,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
        if (error.response.status === 403) return; //팀이 없는데 받은초대목록페이지가 마운트 될 때
        if (error) console.log({error});
      },
    },
  );

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
        {sentMatchingList != null &&
        typeof sentMatchingList == 'object' &&
        !Object.keys(sentMatchingList).length ? (
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
