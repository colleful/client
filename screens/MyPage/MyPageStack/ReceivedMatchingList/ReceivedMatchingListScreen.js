import React,{useState,useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../../lib/api';
import {Config} from '../../../../Config';
import ReceivedMatchingList from './ReceivedMatchingList';
import {css} from '@emotion/native';
import useSWR from 'swr';
import axios from 'axios';

const ReceivedMatchingListScreen = () => {
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data:receivedMatchingList = [], error} = useSWR(`${Config.baseUrl}/api/matching/received`, fetcher);
  if (!receivedMatchingList) return <Text>loading..</Text>
  if (error) console.log({error});

  return (
    <View style={css`flex: 1; padding-top: 100px; padding-horizontal: 25px`}>
      <View style={css`margin-bottom: 30px`}>
        <Text style={css`font-size: 36px`}>
          받은 매칭요청 목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={css`border-bottom-width: 1px; margin-bottom: 20px`} />
        {( receivedMatchingList != null && typeof receivedMatchingList == "object" && !Object.keys(receivedMatchingList).length )
        ? <Text>받은 요청이 없습니다</Text> 
        : receivedMatchingList && <ReceivedMatchingList receivedMatchingList={receivedMatchingList} /> }
      </ScrollView>
    </View>
  );
};

export default ReceivedMatchingListScreen;
