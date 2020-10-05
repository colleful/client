import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TeamListItemScreen from './TeamListItemScreen';

const TeamListScreen = ({navigation, myInfoData, setUpdate, update}) => {
  const [teamInfo, setTeamInfo] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
    setTeamInfo(myInfoData.teams);
    setUserId(myInfoData.id);
  }, []);

  return (
    <View style={{flex: 1, paddingVertical: 50, paddingHorizontal: 40, backgroundColor:'#fff'}}>
      <View style={{marginBottom: 30}}>
        <Text style={{fontSize: 19, color: '#2E89DE'}}>
          ※ 멤버초대 버튼은 팀의 리더에게만{'\n'} 보여집니다
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
            update={update}
            setUpdate={setUpdate}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default TeamListScreen;
