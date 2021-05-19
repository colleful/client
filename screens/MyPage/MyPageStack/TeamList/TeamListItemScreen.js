import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import MemberInfo from '../MemberInfo';
import TeamListItemModal from './TeamListItemModal';
import AsyncStorage from '@react-native-community/async-storage';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DELETE_TEAM_REQUEST,
  EXIT_TEAM_REQUEST,
} from '../../../../reducers/team';

const TeamListItemScreen = ({navigation, teamInfo, userId, teamId}) => {
  const [isLeader, setLeader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    deleteTeamDone,
    deleteTeamError,
    exitTeamDone,
    exitTeamError,
  } = useSelector(({team}) => team);
  const currentError = deleteTeamError || exitTeamError;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId === teamInfo.leaderId) {
      setLeader(true);
    }
  }, []);

  useEffect(() => {
    if (deleteTeamDone) {
      Alert.alert('팀 삭제', '팀 삭제를 완료했습니다.', [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/users`),
        },
      ]);
    }
    if (exitTeamDone) {
      Alert.alert('팀 탈퇴', '팀 나가기를 완료했습니다.', [
        {
          text: '확인',
          onPress: () => trigger(`${Config.baseUrl}/api/users`),
        },
      ]);
    }
    if (currentError) {
      Alert.alert('에러', `${currentError.response.data.message}`, [
        {
          text: '확인',
          onPress: onToggleModal,
        },
      ]);
      console.log({currentError});
    }
  }, [deleteTeamDone, deleteTeamError, currentError]);

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: teamMember = [], error} = useSWR(
    `${Config.baseUrl}/api/teams/${teamId}/members`,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
        if (teamId === null) return;
        if (error) console.log({error});
      },
    },
  );

  const onToggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const onDeleteTeam = () => {
    dispatch({
      type: DELETE_TEAM_REQUEST,
    });
  };

  const onExitTeam = () => {
    dispatch({
      type: EXIT_TEAM_REQUEST,
      data: teamInfo.teamName,
    });
  };

  const onAskBackDeleteTeam = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${teamInfo.teamName} 팀을 삭제하시겠습니까? ※팀원들도 마찬가지로 삭제됩니다.`,
      [{text: '취소'}, {text: '확인', onPress: onDeleteTeam}],
    );
  }, [teamInfo.teamName]);

  const onAskBackExitTeam = useCallback(() => {
    Alert.alert('팀 나가기', `정말 ${teamInfo.teamName} 팀을 나가시겠습니까?`, [
      {text: '취소'},
      {text: '확인', onPress: onExitTeam},
    ]);
  }, [teamInfo.teamName]);

  const goToInvitationScreen = useCallback(() => {
    navigation.navigate('팀초대', {
      teamId: teamInfo.id,
    });
  }, [teamId]);

  const teamInfoStatus = useCallback(() => {
    if (teamInfo.status === 'PENDING') {
      return '멤버 구성중';
    } else if (teamInfo.status === 'READY') {
      return '준비 완료';
    } else if (teamInfo.status === 'WATCHING') {
      return '탐색중';
    }
  }, [teamInfo.status]);

  return (
    <>
      <View
        style={css`
          border-bottom-width: 1px;
          margin-vertical: 15px;
        `}
      />
      <View>
        <Text
          style={css`
            font-size: 19px;
            line-height: 30px;
          `}>
          팀명 : {teamInfo.teamName}
          {'\n'}
          멤버 :{' '}
          {teamMember &&
            teamMember.map((member, index) => (
              <MemberInfo memberInfo={member} key={index} />
            ))}
          {'\n'}
          팀상태 : {teamInfoStatus()}
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
                onPress={goToInvitationScreen}
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 10px;
                  padding-top: 15px;
                  width: 61px;
                  margin-right: 20px;
                `}>
                <Text
                  style={css`
                    color: #fff;
                    font-weight: 500;
                  `}>
                  팀 초대
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onToggleModal}
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 15px;
                  width: 100px;
                  margin-right: 20px;
                `}>
                <Text
                  style={css`
                    color: #fff;
                    font-weight: 500;
                  `}>
                  팀 상태 변경
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onAskBackDeleteTeam}
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
              onPress={onAskBackExitTeam}
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 10px;
                width: 74px;
              `}>
              <Text
                style={css`
                  color: #fff;
                  font-weight: 500;
                `}>
                팀 나가기
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TeamListItemModal
        isModalVisible={isModalVisible}
        onToggleModal={onToggleModal}
        teamId={teamId}
      />
    </>
  );
};

export default React.memo(TeamListItemScreen);
