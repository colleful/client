import React,{useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '@emotion/native';
import {Config} from '../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import SentInvitationList from './SentInvitationList';

const SentInvitationListScreen = ({teamId}) => {
  
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data:sentInvitationList = [], error} = useSWR(teamId === null ? null :`${Config.baseUrl}/api/invitations/sent`, fetcher, {
    onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
      if (error.response.status === 403) return; //팀이 없는데 받은초대목록페이지가 마운트 될 때
      if (error) console.log({error});
    },
  });
  
  if(!sentInvitationList) return <Text>loading..</Text>;

  return (
    <View style={css`flex: 1; padding-top: 100px; padding-horizontal: 25px`}>
      <View style={css`margin-bottom: 30px`}>
        <Text style={css`font-size: 36px`}>
          보낸 초대목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={css`border-bottom-width: 1px; margin-bottom: 20px`} />
        {( sentInvitationList != null && typeof sentInvitationList == "object" && !Object.keys(sentInvitationList).length )
        ? <Text>보낸 초대가 없습니다</Text> 
        : sentInvitationList && <SentInvitationList sentInvitationList={sentInvitationList} /> }
      </ScrollView>
    </View>
  );
};

export default SentInvitationListScreen;
