import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {css} from '@emotion/native';
import {Config} from '../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import SentInvitationList from './SentInvitationList';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../components/LoadingScreen';

const SentInvitationListScreen = ({teamId}) => {
  const {deleteInvitationLoading, loadUserLoading} = useSelector(
    ({invite}) => invite,
  );

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: sentInvitationList = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/invitations/sent`,
    fetcher,
  );
  if (!sentInvitationList && !error) {
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
          보낸 초대목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={css`
            border-bottom-width: 1px;
            margin-bottom: 20px;
          `}
        />
        {!sentInvitationList.length ? (
          <Text>보낸 초대가 없습니다</Text>
        ) : (
          sentInvitationList && (
            <SentInvitationList sentInvitationList={sentInvitationList} />
          )
        )}
      </ScrollView>
      {(deleteInvitationLoading || loadUserLoading) && <LoadingScreen />}
    </View>
  );
};

export default SentInvitationListScreen;
