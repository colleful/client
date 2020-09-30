import React,{useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import InvitationListItemScreen from './InvitationListItemScreen';

const InvitationListScreen = ({update,setUpdate}) => {
  const [invitationList, setInvitationList] = useState([]);

  useEffect(()=>{
    onGetInvitationList();
  },[])

  const onGetInvitationList = async () => {
    try {
      const response = await authAPI.getInvitationList({
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      setInvitationList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, paddingTop: 100, paddingHorizontal: 25}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 36, fontFamily: 'AntDesign'}}>
          받은 초대목록
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{borderBottomWidth: 1, marginBottom: 20}} />
        {( invitationList != null && typeof invitationList == "object" && !Object.keys(invitationList).length )
        ? <Text>받은 초대가 없습니다</Text> 
        : <InvitationListItemScreen invitationList={invitationList} update={update} setUpdate={setUpdate} /> }
      </ScrollView>
    </View>
  );
};

export default InvitationListScreen;
