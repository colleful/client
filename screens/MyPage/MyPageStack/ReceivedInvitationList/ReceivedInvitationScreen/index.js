import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReceivedInvitationListScreen from '../ReceivedInvitationListScreen/index';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {useSelector, shallowEqual} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const ReceivedInvitationScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    acceptInvitationLoading,
    refuseInvitationLoading,
    loadUserLoading,
  } = useSelector(
    ({invite}) => ({
      acceptInvitationLoading: invite.acceptInvitationLoading,
      refuseInvitationLoading: invite.refuseInvitationLoading,
      loadUserLoading: invite.loadUserLoading,
    }),
    shallowEqual,
  );
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

  const {data: receivedInvitationList = [], error} = useSWR(
    `${Config.baseUrl}/api/invitations/received`,
    fetcher,
  );
  if (!error && !receivedInvitationList.length && isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    console.log({error});
  }
  return (
    <L.Wrapper>
      <L.HeaderTitle>받은 초대목록</L.HeaderTitle>
      <L.BorderLine />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!receivedInvitationList.length ? (
          <Text>받은 초대가 없습니다</Text>
        ) : (
          <ReceivedInvitationListScreen
            receivedInvitationList={receivedInvitationList}
          />
        )}
      </ScrollView>
      {(loadUserLoading ||
        acceptInvitationLoading ||
        refuseInvitationLoading) && <LoadingScreen />}
    </L.Wrapper>
  );
};

export default ReceivedInvitationScreen;
