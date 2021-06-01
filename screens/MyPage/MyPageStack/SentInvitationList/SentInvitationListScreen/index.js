import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import SentInvitationList from '../SentInvitationList/index';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import * as L from '../../../../../assets/css/InvitationMatchingListLayout';

const SentInvitationListScreen = ({teamId}) => {
  const [isLoading, setLoading] = useState(false);
  const {deleteInvitationLoading, loadUserLoading} = useSelector(
    ({invite}) => invite,
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

  const {data: sentInvitationList = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/invitations/sent`,
    fetcher,
  );
  if (!error && !sentInvitationList.length && isLoading) {
    return <LoadingScreen />;
  }
  if (error) console.log({error});

  return (
    <L.Wrapper>
      <L.HeaderTitle>보낸 초대목록</L.HeaderTitle>
      <L.BorderLine />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!sentInvitationList.length ? (
          <Text>보낸 초대가 없습니다</Text>
        ) : (
          sentInvitationList && (
            <SentInvitationList sentInvitationList={sentInvitationList} />
          )
        )}
      </ScrollView>
      {(deleteInvitationLoading || loadUserLoading) && <LoadingScreen />}
    </L.Wrapper>
  );
};

export default SentInvitationListScreen;
