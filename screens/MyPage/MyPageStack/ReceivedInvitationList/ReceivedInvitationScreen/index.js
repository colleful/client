import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReceivedInvitationListScreen from '../ReceivedInvitationListScreen/index';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import {Wrapper, InvitationList_title, InvitationList_boundary} from './style';

const ReceivedInvitationScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    acceptInvitationLoading,
    refuseInvitationLoading,
    loadUserLoading,
  } = useSelector(({invite}) => invite);

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
  if (error) console.log({error});

  return (
    <>
      <Wrapper>
        <InvitationList_title>받은 초대목록</InvitationList_title>
        <InvitationList_boundary />
        <ScrollView showsVerticalScrollIndicator={false}>
          {!receivedInvitationList.length ? (
            <Text>받은 초대가 없습니다</Text>
          ) : (
            <ReceivedInvitationListScreen
              receivedInvitationList={receivedInvitationList}
            />
          )}
        </ScrollView>
      </Wrapper>
      {(loadUserLoading ||
        acceptInvitationLoading ||
        refuseInvitationLoading) && <LoadingScreen />}
    </>
  );
};

export default ReceivedInvitationScreen;
