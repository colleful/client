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
import {trigger} from 'swr';
import {Config} from '../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {css} from '@emotion/native';

const TeamListItemScreen = ({navigation, teamInfo, userId, teamId}) => {
  const [isLeader, setLeader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [prevTeamStatus, setPrevTeamStatus] = useState();
  const [teamMember, setTeamMember] = useState();

  useEffect(() => {
    if (userId === teamInfo.leaderId) {
      setLeader(true);
    }
  }, []);

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    setTeamMember(response.data);
    return response.data;
  };

  const {data = [], error} = useSWR(
    `${Config.baseUrl}/api/teams/${teamId}/members`,
    fetcher,
  );
  if (error) return console.log(error);
  const onChangeTeamStatus = async (teamStatus) => {
    if (teamStatus === prevTeamStatus) {
      Alert.alert('오류', '현재 팀 상태와 동일합니다.', [
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
            Authorization: await AsyncStorage.getItem('authorization'),
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
      // trigger(`${Config.baseUrl}/api/teams?page=0`);
    } catch (error) {
      console.log({error});
    }
  };

  const onDeleteTeam = async () => {
    try {
      await authAPI.deleteTeam({
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      Alert.alert('팀 삭제', '팀 삭제를 완료했습니다.', [
        {
          text: '확인',
        },
      ]);
      trigger(`${Config.baseUrl}/api/teams/${teamId}/members`);
    } catch (error) {
      console.log(error);
    }
  };

  const onExitTeam = async () => {
    try {
      await authAPI.exitTeam(teamInfo.teamName, {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      Alert.alert('팀 탈퇴', '팀 나가기를 완료했습니다.', [
        {
          text: '확인',
        },
      ]);
      trigger(`${Config.baseUrl}/api/teams/${teamId}/members`);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <>
      <View style={css`border-bottom-width: 1px; margin-vertical: 15px`} />
      <View>
        <Text style={css`font-size: 19px; line-height: 30px`}>
          팀명 : {teamInfo.teamName}
          {'\n'}
          팀인원 : {teamInfo.headcount}명{'\n'}
          멤버 :{' '}
          {teamMember &&
            teamMember.map((member, index) => (
              <MemberInfo memberInfo={member} key={index} />
            ))}
        </Text>
        <View
          style={css`
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          `}>
          {isLeader ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('팀초대', {
                    teamId: teamInfo.id,
                  });
                }}
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 10px;
                  padding-top: 15px;
                  width: 61px;
                  margin-right: 20px;
                `}>
                <Text style={css`color: #fff; font-weight: 500`}>팀 초대</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 15px;
                  width: 100px;
                  margin-right: 20px;
                `}>
                <Text style={css`color: #fff; font-weight: 500`}>
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
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 10px;
                  padding-top: 15px;
                  width: 61px;
                `}>
                <Text
                  style={css`
                    color: #fff;
                    font-weight: 500;
                    text-align: center;
                  `}>
                  팀 삭제
                </Text>
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
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 10px;
                width: 74px;
              `}>
              <Text style={css`color: #fff; font-weight: 500`}>팀 나가기</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        style={css`justify-content: flex-end; margin: 0`}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!isModalVisible)}>
          <View style={css`flex: 1`} />
        </TouchableWithoutFeedback>
        <View
          style={css`
            background-color: white;
          `}>
          <View
            style={css`
              height: 100px;
              justify-content: center;
              align-items: center;
              border-bottom-width: 0.5px;
              border-color: gray;
            `}>
            <TouchableOpacity
              onPress={() => onChangeTeamStatus('PENDING')}
              style={css`
                flex: 1;
                width: 100%;
                justify-content: center;
                align-items: center;
              `}>
              <Text style={css`font-size: 16px; font-family: AntDesign`}>
                멤버 구성중
              </Text>
            </TouchableOpacity>
            <View
              style={css`
                width: 100%;
                border-bottom-width: 1px;
                border-bottom-color: #cccccc;
              `}
            />
            <TouchableOpacity
              onPress={() => onChangeTeamStatus('READY')}
              style={css`
                flex: 1;
                width: 100%;
                justify-content: center;
                align-items: center;
              `}>
              <Text style={css`font-size: 16px; font-family: AntDesign`}>
                준비 완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(TeamListItemScreen);
