import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MemberInfo from './MemberInfo';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [prevTeamStatus, setPrevTeamStatus] = useState();

  useEffect(() => {
    if (userId === teamInfo.leaderId) {
      setLeader(true);
    }
  }, []);

  const onChangeTeamStatus = async (teamStatus) => {
    if (teamStatus === prevTeamStatus) {
      Alert.alert('에러', '현재 팀 상태와 동일합니다.', [
        {
          text: '확인',
        },
      ]);
      return;
    }
    try {
      await authAPI.changeTeamStatus(
        teamInfo.id,
        {status: teamStatus},
        {
          headers: {
            'Access-Token': await AsyncStorage.getItem('token'),
          },
        },
      );
      Alert.alert(
        '팀 상태변경',
        `팀 상태를 ${
          teamStatus === `PENDING` ? `멤버 구성중 ` : `준비 완료 `
        }(으)로 변경했습니다`,
        [
          {
            text: '확인',
            onPress: () => {
              setModalVisible(!isModalVisible);
              setPrevTeamStatus(teamStatus);
            },
          },
        ],
      );
    } catch (error) {
      console.log({error});
    }
  };

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
      <View>
        <Text style={{fontSize: 19, lineHeight: 30}}>
          팀명 : {teamInfo.teamName}
          {'\n'}
          평균나이 : {teamInfo.averageAge}
          {'\n'}
          팀인원 : {teamInfo.headcount}명{'\n'}
          멤버 :{' '}
          {teamInfo.members.map((member, index) => (
            <MemberInfo memberInfo={member} key={index} />
          ))}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
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
                  marginRight: 20,
                }}>
                <Text style={{color: '#fff', fontWeight: '500'}}>팀 초대</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={{
                  backgroundColor: '#5e5e5e',
                  borderRadius: 5,
                  padding: 15,
                  paddingVertical: 10,
                  width: 95,
                  marginRight: 20,
                }}>
                <Text style={{color: '#fff', fontWeight: '500'}}>
                  팀 상태 변경
                </Text>
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
      <Modal
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!isModalVisible)}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              borderColor: 'gray',
            }}>
            <TouchableOpacity
              onPress={() => onChangeTeamStatus('PENDING')}
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontFamily: 'AntDesign'}}>
                멤버 구성중
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#cccccc',
              }}
            />
            <TouchableOpacity
              onPress={() => onChangeTeamStatus('READY')}
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontFamily: 'AntDesign'}}>
                준비 완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TeamListItemScreen;
