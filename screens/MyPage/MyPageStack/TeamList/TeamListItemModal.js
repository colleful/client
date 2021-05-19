import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../../lib/api';
import Modal from 'react-native-modal';
import {css} from '@emotion/native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {useSelector, useDispatch} from 'react-redux';
import {
  CHANGE_TEAM_STATUS_READY_REQUEST,
  CHANGE_TEAM_STATUS_WATCHING_REQUEST,
  FINISH_TEAM_MATCHING_REQUEST,
  CHANGE_TEAM_STATUS_READY_INITIALIZE,
  CHANGE_TEAM_STATUS_WATCHING_INITIALIZE,
  FINISH_TEAM_MATCHING_INITIALIZE,
} from '../../../../reducers/team';

const TeamListItemModal = ({isModalVisible, onToggleModal, teamId}) => {
  const dispatch = useDispatch();
  const {
    changeTeamStatusReadyDone,
    changeTeamStatusReadyError,
    changeTeamStatusWatchingDone,
    changeTeamStatusWatchingError,
    finishTeamMatchingDone,
    finishTeamMatchingError,
  } = useSelector(({team}) => team);

  useEffect(() => {
    if (changeTeamStatusReadyDone) {
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      Alert.alert('팀 상태변경', `팀 상태를 준비 완료로 변경했습니다`, [
        {
          text: '확인',
          onPress: onToggleModal,
        },
      ]);
    }
    if (changeTeamStatusWatchingDone) {
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      Alert.alert('팀 상태변경', `팀 상태를 탐색 중으로 변경했습니다`, [
        {
          text: '확인',
          onPress: onToggleModal,
        },
      ]);
    }
    if (finishTeamMatchingDone) {
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      Alert.alert('매칭 종료', `매칭을 종료했습니다.`, [
        {
          text: '확인',
          onPress: onToggleModal,
        },
      ]);
    }
    if (changeTeamStatusReadyError) {
      Alert.alert(
        '에러',
        `${changeTeamStatusReadyError.response.data.message}`,
        [
          {
            text: '확인',
            onPress: onToggleModal,
          },
        ],
      );
      console.log({changeTeamStatusReadyError});
      dispatch({
        type: CHANGE_TEAM_STATUS_READY_INITIALIZE,
      });
    }
    if (changeTeamStatusWatchingError) {
      Alert.alert(
        '에러',
        `${changeTeamStatusWatchingError.response.data.message}`,
        [
          {
            text: '확인',
            onPress: onToggleModal,
          },
        ],
      );
      console.log({changeTeamStatusWatchingError});
      dispatch({
        type: CHANGE_TEAM_STATUS_WATCHING_INITIALIZE,
      });
    }
    if (finishTeamMatchingError) {
      Alert.alert('에러', `${finishTeamMatchingError.response.data.message}`, [
        {
          text: '확인',
          onPress: onToggleModal,
        },
      ]);
      console.log({finishTeamMatchingError});
      dispatch({
        type: FINISH_TEAM_MATCHING_INITIALIZE,
      });
    }
  }, [
    changeTeamStatusReadyDone,
    changeTeamStatusReadyError,
    changeTeamStatusWatchingDone,
    changeTeamStatusWatchingError,
    finishTeamMatchingDone,
    finishTeamMatchingError,
  ]);

  const onChangeTeamStatusToReady = () => {
    // PENDING -> READY
    dispatch({
      type: CHANGE_TEAM_STATUS_READY_REQUEST,
    });
  };

  const onChangeTeamStatusToWatching = () => {
    // PENDING -> WATCHING
    dispatch({
      type: CHANGE_TEAM_STATUS_WATCHING_REQUEST,
    });
  };

  const onFinishTeamMatching = () => {
    // MATCHED -> PENDING
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

  return (
    <Modal
      style={css`
        justify-content: flex-end;
        margin: 0;
      `}
      isVisible={isModalVisible}
      onBackButtonPress={onToggleModal}
      onSwipeComplete={onToggleModal}
      swipeDirection={['down']}>
      <TouchableWithoutFeedback onPress={onToggleModal}>
        <View
          style={css`
            flex: 1;
          `}
        />
      </TouchableWithoutFeedback>
      <View
        style={css`
          background-color: white;
        `}>
        <View
          style={css`
            height: 180px;
            justify-content: center;
            align-items: center;
            border-bottom-width: 0.5px;
            border-color: gray;
          `}>
          <TouchableOpacity
            onPress={onChangeTeamStatusToReady}
            style={css`
              flex: 1;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}>
            <Text
              style={css`
                font-size: 16px;
                font-family: AntDesign;
              `}>
              준비 완료
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
            onPress={onChangeTeamStatusToWatching}
            style={css`
              flex: 1;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}>
            <Text
              style={css`
                font-size: 16px;
                font-family: AntDesign;
              `}>
              탐색중
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
            onPress={onAskBackFinishMatching}
            style={css`
              flex: 1;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}>
            <Text
              style={css`
                font-size: 16px;
                font-family: AntDesign;
              `}>
              매칭 끝내기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TeamListItemModal;
