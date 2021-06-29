import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert} from 'react-native';
import TeamListItemModal from '../TeamListItemModal/index';
import AsyncStorage from '@react-native-community/async-storage';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  DELETE_TEAM_REQUEST,
  EXIT_TEAM_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/team';
import LoadingScreen from '../../../../../components/LoadingScreen';
import MemberList from '../MemberList/index';
import * as S from './style';

const TeamListItemScreen = ({navigation, teamInfo, userId, teamId}) => {
  const [isLeader, setLeader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    deleteTeamDone,
    deleteTeamError,
    exitTeamDone,
    exitTeamError,
  } = useSelector(({team}) => team);
  const currentError = deleteTeamError || exitTeamError;
  const currentDone = deleteTeamDone || exitTeamDone;

  useEffect(() => {
    if (userId === teamInfo.leaderId) {
      setLeader(true);
    }
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch, userId, teamInfo.leaderId]);

  useEffect(() => {
    if (currentDone) {
      Alert.alert(
        '완료',
        `팀 ${deleteTeamDone ? '삭제' : '나가기'}를 완료했습니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/users`);
              trigger(`${Config.baseUrl}/api/teams?page=0`);
            },
          },
        ],
      );
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
  }, [currentDone, deleteTeamDone, currentError, onToggleModal]);

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: teamMember = [], error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/teams/${teamId}/members`,
    fetcher,
  );
  if (error) {
    console.log({error});
  }
  const onToggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const onDeleteTeam = useCallback(() => {
    dispatch({
      type: DELETE_TEAM_REQUEST,
    });
  }, [dispatch]);

  const onExitTeam = useCallback(() => {
    dispatch({
      type: EXIT_TEAM_REQUEST,
      data: teamInfo.teamName,
    });
  }, [dispatch, teamInfo.teamName]);

  const onAskBackDeleteTeam = useCallback(() => {
    Alert.alert(
      '경고',
      `정말 ${teamInfo.teamName} 팀을 삭제하시겠습니까? ※팀원들도 마찬가지로 삭제됩니다.`,
      [{text: '취소'}, {text: '확인', onPress: onDeleteTeam}],
    );
  }, [teamInfo.teamName, onDeleteTeam]);

  const onAskBackExitTeam = useCallback(() => {
    Alert.alert('팀 나가기', `정말 ${teamInfo.teamName} 팀을 나가시겠습니까?`, [
      {text: '취소'},
      {text: '확인', onPress: onExitTeam},
    ]);
  }, [teamInfo.teamName, onExitTeam]);

  const goToInvitationScreen = useCallback(() => {
    navigation.navigate('팀초대', {
      teamId: teamInfo.id,
    });
  }, [teamInfo.id, navigation]);

  const teamInfoStatus = useCallback(() => {
    if (teamInfo.status === 'PENDING') {
      return '멤버 구성중';
    } else if (teamInfo.status === 'READY') {
      return '준비 완료';
    } else if (teamInfo.status === 'WATCHING') {
      return '탐색중';
    } else if (teamInfo.status === 'MATCHED') {
      return '매칭 완료';
    }
  }, [teamInfo.status]);

  if (!error && !teamMember.length) {
    return <LoadingScreen />;
  }

  return (
    <>
      <S.BorderLine />
      <View>
        <S.Content>
          팀명 : {teamInfo.teamName}
          {'\n'}
          멤버 : <MemberList teamMember={teamMember} />
          {'\n'}
          팀상태 : {teamInfoStatus()}
        </S.Content>
        <S.ButtonContainer>
          {isLeader ? (
            <>
              <S.Button mr20 onPress={goToInvitationScreen}>
                <S.ButtonText>팀 초대</S.ButtonText>
              </S.Button>
              <S.Button mr20 onPress={onToggleModal}>
                <S.ButtonText>팀 상태 변경</S.ButtonText>
              </S.Button>
              <S.Button onPress={onAskBackDeleteTeam}>
                <S.ButtonText>팀 삭제</S.ButtonText>
              </S.Button>
            </>
          ) : (
            <S.Button onPress={onAskBackExitTeam}>
              <S.ButtonText>팀 나가기</S.ButtonText>
            </S.Button>
          )}
        </S.ButtonContainer>
      </View>
      <TeamListItemModal
        isModalVisible={isModalVisible}
        onToggleModal={onToggleModal}
        teamId={teamId}
        teamInfo={teamInfo}
      />
    </>
  );
};

export default React.memo(TeamListItemScreen);
