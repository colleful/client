import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import useSWR, {trigger} from 'swr';
import {Config} from '../../../Config';
import {css} from '@emotion/native';

const SentInvitationListItemScreen = ({sentInvitationList}) => {
  const [senderData, setSenderData] = useState([]);

  useEffect(() => {
    onGetSenderData();
    console.log('senderData', senderData);
  }, []);

  const onGetSenderData = async () => {
    try {
      const response = await authAPI.getUserInfo(
        sentInvitationList.team.leaderId,
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      setSenderData(response.data);
    } catch (error) {
      console.log({error});
    }
  };

  const onCancelInvitation = async () => {
    try {
      await authAPI.cancelInvitation(sentInvitationList.id, {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      Alert.alert('완료', `초대를 취소하였습니다.`, [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/invitations/sent`),
        },
      ]);
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  const onPressCancelInvitation = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${sentInvitationList.user.nickname} 님에게 보낸 초대를 취소하시겠습니까?`,
      [
        {text: '취소', onPress: () => console.log('취소')},
        {text: '확인', onPress: onCancelInvitation},
      ],
    );
  }, []);

  return (
    <>
      <Text
        style={css`
          font-size: 19px;
          line-height: 30px;
        `}>
        보낸사람 : {senderData.nickname}{' '}
        {/* {`( ${senderData.age}, ${senderData.department} )`} */}{'\n'}
        받는사람 : {sentInvitationList.user.nickname}{' '}
        {/* {`( ${sentInvitationList.user.age}, ${sentInvitationList.user.department} )`}{' '}
        {'\n'} */}
      </Text>
      <View
        style={css`
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
        `}>
        <TouchableOpacity
          onPress={onPressCancelInvitation}
          style={css`
            background-color: #5e5e5e;
            border-radius: 5px;
            padding: 10px 17px;
            width: 88px;
          `}>
          <Text
            style={css`
              color: #fff;
              font-weight: 500;
            `}>
            초대 취소
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={css`
          border-bottom-width: 1px;
          margin-vertical: 20px;
        `}
      />
    </>
  );
};

export default SentInvitationListItemScreen;
