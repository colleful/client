import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import TeamListItemScreen from './TeamListItemScreen';

const TeamListScreen = ({myInfoData,setUpdate,update}) => {
  const [teamInfo, setTeamInfo] = useState([]);

  useEffect(() => {
    setTeamInfo(myInfoData.teams);
  }, []);

  return (
    <View style={{flex: 1, marginVertical: 50, paddingHorizontal: 40}}>
      <Text style={{fontSize: 36, fontWeight: '500'}}>내 팀 목록</Text>
     
      {( teamInfo != null && typeof teamInfo == "object" && !Object.keys(teamInfo).length ) ? (   // teamInfo === [] 
        <>
          <View style={{borderBottomWidth: 1, marginVertical: 15}} />
          <Text style={{fontSize: 20}}>등록된 팀이 없습니다</Text>
        </>
      ) : (
        <TeamListItemScreen teamInfo={teamInfo} update={update} setUpdate={setUpdate} />
      )}
    </View>
  );
};

export default TeamListScreen;
