import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../../Config';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  CHANGE_TEAM_STATUS_READY_REQUEST,
  CHANGE_TEAM_STATUS_WATCHING_REQUEST,
  FINISH_TEAM_MATCHING_REQUEST,
  INITAILIZE_STATE,
} from '../../../../../reducers/team';
import * as S from './style';

const TeamListItemModal = ({
  isModalVisible,
  onToggleModal,
  teamId,
  teamInfo,
}) => {
  const dispatch = useDispatch();
  const {
    changeTeamStatusReadyDone,
    changeTeamStatusReadyError,
    changeTeamStatusWatchingDone,
    changeTeamStatusWatchingError,
    finishTeamMatchingDone,
    finishTeamMatchingError,
  } = useSelector(
    ({team}) => ({
      changeTeamStatusReadyDone: team.changeTeamStatusReadyDone,
      changeTeamStatusReadyError: team.changeTeamStatusReadyError,
      changeTeamStatusWatchingDone: team.changeTeamStatusWatchingDone,
      changeTeamStatusWatchingError: team.changeTeamStatusWatchingError,
      finishTeamMatchingDone: team.finishTeamMatchingDone,
      finishTeamMatchingError: team.finishTeamMatchingError,
    }),
    shallowEqual,
  );
  const currentError =
    changeTeamStatusReadyError ||
    changeTeamStatusWatchingError ||
    finishTeamMatchingError;
  const currentDone = changeTeamStatusReadyDone || changeTeamStatusWatchingDone;

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentDone) {
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      trigger(`${Config.baseUrl}/api/teams?page=0`);
      Alert.alert(
        '완료',
        `팀 상태를 ${
          changeTeamStatusReadyDone ? '준비 완료' : '탐색 중으'
        }로 변경했습니다`,
        [
          {
            text: '확인',
          },
        ],
      );
    }
    if (finishTeamMatchingDone) {
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      Alert.alert('완료', '매칭을 종료했습니다.', [
        {
          text: '확인',
        },
      ]);
    }
    if (currentError) {
      Alert.alert('에러', `${currentError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({currentError});
    }
  }, [
    changeTeamStatusReadyDone,
    currentDone,
    finishTeamMatchingDone,
    currentError,
    teamId,
  ]);

  const onChangeTeamStatusToReady = () => {
    // PENDING -> READY
    onToggleModal();
    dispatch({
      type: CHANGE_TEAM_STATUS_READY_REQUEST,
    });
  };

  const onChangeTeamStatusToWatching = () => {
    // PENDING -> WATCHING
    onToggleModal();
    dispatch({
      type: CHANGE_TEAM_STATUS_WATCHING_REQUEST,
    });
  };

  const onFinishTeamMatching = () => {
    // MATCHED -> PENDING
    onToggleModal();
    dispatch({
      type: FINISH_TEAM_MATCHING_REQUEST,
    });
  };

  const onAskBackFinishMatching = () => {
    Alert.alert('경고', '정말 매칭을 끝내시겠습니까?', [
      {
        text: '확인',
        onPress: onFinishTeamMatching,
      },
      {
        text: '취소',
        onPress: onToggleModal,
      },
    ]);
  };

  const renderTeamStatus = () => {
    if (teamInfo.status === 'PENDING') {
      return (
        <S.ButtonContainer h100>
          <S.Button onPress={onChangeTeamStatusToReady}>
            <S.ButtonText>준비 완료</S.ButtonText>
          </S.Button>
          <S.BorderLine />
          <S.Button onPress={onChangeTeamStatusToWatching}>
            <S.ButtonText>탐색중</S.ButtonText>
          </S.Button>
          <S.BorderLine />
        </S.ButtonContainer>
      );
    }
    if (teamInfo.status === 'WATCHING' || teamInfo.status === 'READY') {
      return (
        <S.ButtonContainer h50>
          <S.Button onPress={onToggleModal}>
            <S.ButtonText>바꿀 수 있는 상태가 없습니다.</S.ButtonText>
          </S.Button>
        </S.ButtonContainer>
      );
    }
    if (teamInfo.status === 'MATCHED') {
      return (
        <S.ButtonContainer h50>
          <S.Button onPress={onAskBackFinishMatching}>
            <S.ButtonText>매칭 끝내기</S.ButtonText>
          </S.Button>
        </S.ButtonContainer>
      );
    }
  };

  return (
    <S.StyledModal
      isVisible={isModalVisible}
      onBackButtonPress={onToggleModal}
      onSwipeComplete={onToggleModal}
      swipeDirection={['down']}>
      <S.RestSpace onPress={onToggleModal} />
      {renderTeamStatus()}
    </S.StyledModal>
  );
};

export default TeamListItemModal;
