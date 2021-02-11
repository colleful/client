import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TeamListItemScreen from './TeamListItemScreen';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const TeamListScreen = ({navigation, teamId, userId}) => {
  const [teamInfo, setTeamInfo] = useState([]);

  const onGetTeamInfo = async () => {
    try {
      const response = await authAPI.getTeamInfo(teamId, {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      setTeamInfo(response.data);
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(()=>{
    console.log("teamInfo",teamInfo)
  },[teamInfo])

  useEffect(() => {
    onGetTeamInfo();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
      }}>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            fontSize: 19,
            color: '#2E89DE',
            lineHeight: 26,
            marginBottom: 5,
          }}>
          ※ 멤버초대 및 팀 상태변경은{'\n\t\t\t\t\t'}팀의 리더만 할수있습니다
        </Text>
        <Text style={{fontSize: 19, color: '#2E89DE'}}>
          ※ 팀 생성한 사람이 리더 입니다
        </Text>
      </View>
      <Text style={{fontSize: 32, fontWeight: '500'}}>내 팀 목록</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {teamInfo != null &&
        typeof teamInfo == 'object' &&
        !Object.keys(teamInfo).length ? (
          <>
            <View style={{borderBottomWidth: 1, marginVertical: 15}} />
            <Text style={{fontSize: 20}}>등록된 팀이 없습니다</Text>
          </>
        ) : (
          <TeamListItemScreen
            navigation={navigation}
            teamInfo={teamInfo}
            userId={userId}
            teamId={teamId}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default TeamListScreen;
