import React,{useState,useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import InvitationListItemScreen from './InvitationListItemScreen';
import {css} from '@emotion/native';

const InvitationListScreen = () => {
  const [invitationList, setInvitationList] = useState([]);

  useEffect(()=>{
    onGetInvitationList();
  },[])

  const onGetInvitationList = async () => {
    try {
      const response = await authAPI.getInvitationList({
        headers: {
          'Authorization': await AsyncStorage.getItem('authorization'),
        },
      });
      setInvitationList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={css`flex: 1; padding-top: 100px; padding-horizontal: 25px`}>
      <View style={css`margin-bottom: 30px`}>
        <Text style={css`font-size: 36px`}>
          받은 초대목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={css`border-bottom-width: 1px; margin-bottom: 20px`} />
        {( invitationList != null && typeof invitationList == "object" && !Object.keys(invitationList).length )
        ? <Text>받은 초대가 없습니다</Text> 
        : <InvitationListItemScreen invitationList={invitationList} /> }
      </ScrollView>
    </View>
  );
};

export default InvitationListScreen;
