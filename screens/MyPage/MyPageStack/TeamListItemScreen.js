import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';

const TeamListItemScreen = ({
  navigation,
  teamInfo,
  userId,
  setUpdate,
  update,
}) => {
  return teamInfo.map((team, index) => (
    <TeamListItem
      navigation={navigation}
      teamInfo={team}
      userId={userId}
      update={update}
      setUpdate={setUpdate}
      key={index}
    />
  ));
};

const TeamListItem = ({navigation, teamInfo, userId, setUpdate, update}) => {
  const [isLeader, setLeader] = useState(false);

  useEffect(() => {
    if (userId === teamInfo.leaderId) {
      setLeader(true);
    }
  }, []);

  const onDeleteTeam = async () => {
    try {
      await authAPI.deleteTeam(teamInfo.id, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      Alert.alert('팀 삭제', '팀 삭제를 완료했습니다.', [
        {
          text: '확인',
        },
      ]);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const onExitTeam = async () => {
    try {
      await authAPI.exitTeam(teamInfo.id, {
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      Alert.alert('팀 탈퇴', '팀 나가기를 완료했습니다.', [
        {
          text: '확인',
        },
      ]);
      setUpdate(!update);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <>
      <View style={{borderBottomWidth: 1, marginVertical: 15}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>{teamInfo.teamName}</Text>
        <View style={{flexDirection: 'row'}}>
          {isLeader ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('팀초대', {
                    teamId: teamInfo.id,
                  });
                }}
                style={{
                  backgroundColor: '#5e5e5e',
                  borderRadius: 5,
                  padding: 15,
                  paddingVertical: 10,
                  width: 70,
                  marginRight: 10,
                }}>
                <Text style={{color: '#fff', fontWeight: '500'}}>팀 초대</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    '경고',
                    `정말 ${teamInfo.teamName} 팀을 삭제하시겠습니까? ※팀원들도 마찬가지로 삭제됩니다.`,
                    [
                      {text: '취소', onPress: () => console.log('취소')},
                      {text: '확인', onPress: () => onDeleteTeam()},
                    ],
                  );
                }}
                style={{
                  backgroundColor: '#5e5e5e',
                  borderRadius: 5,
                  padding: 15,
                  paddingVertical: 10,
                  width: 70,
                }}>
                <Text style={{color: '#fff', fontWeight: '500'}}>팀 삭제</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  '팀 나가기',
                  `정말 ${teamInfo.teamName} 팀을 나가시겠습니까?`,
                  [
                    {text: '취소', onPress: () => console.log('취소')},
                    {text: '확인', onPress: () => onExitTeam()},
                  ],
                );
              }}
              style={{
                backgroundColor: '#5e5e5e',
                borderRadius: 5,
                padding: 15,
                paddingVertical: 10,
                width: 80,
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>팀 나가기</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default TeamListItemScreen;
