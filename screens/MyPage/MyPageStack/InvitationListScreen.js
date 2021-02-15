import React,{useState,useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import InvitationList from './InvitationList';
import {css} from '@emotion/native';
import {Config} from '../../../Config';
import useSWR from 'swr';
import axios from 'axios';

const InvitationListScreen = () => {
  const [receivedInvitationList, setReceivedInvitationList] = useState([]);
  
  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    setReceivedInvitationList(response.data);
    return response.data;
  };

  const {data = [], error} = useSWR(`${Config.baseUrl}/api/invitations/received`, fetcher);
  if (error) return console.log(error);

  return (
    <View style={css`flex: 1; padding-top: 100px; padding-horizontal: 25px`}>
      <View style={css`margin-bottom: 30px`}>
        <Text style={css`font-size: 36px`}>
          받은 초대목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={css`border-bottom-width: 1px; margin-bottom: 20px`} />
        {( receivedInvitationList != null && typeof receivedInvitationList == "object" && !Object.keys(receivedInvitationList).length )
        ? <Text>받은 초대가 없습니다</Text> 
        : <InvitationList receivedInvitationList={receivedInvitationList} /> }
      </ScrollView>
    </View>
  );
};

export default InvitationListScreen;
