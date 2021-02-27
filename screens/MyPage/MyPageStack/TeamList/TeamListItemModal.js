import React, {useCallback} from 'react';
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

const TeamListItemModal = ({isModalVisible, onToggleModal, teamId}) => {
  const teamInfoStatus = useCallback((status) => {
    if (status === 'PENDING') {
      return '멤버 구성중';
    } else if (status === 'READY') {
      return '준비 완료';
    } else if (status === 'WATCHING'){
      return '탐색중';
    } else {
      return '매칭 완료';
    }
  },[]);

  const onChangeTeamStatus = async (status) => {
    try {
      await authAPI.changeTeamStatus(
        {status: status},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      trigger(`${Config.baseUrl}/api/teams/${teamId}`);
      Alert.alert(
        '팀 상태변경',
        `팀 상태를 ${teamInfoStatus(status)}(으)로 변경했습니다`,
        [
          {
            text: '확인',
            onPress: onToggleModal,
          },
        ],
      );
    } catch (error) {
      console.log({error});
    }
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
            onPress={() => onChangeTeamStatus('PENDING')}
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
            onPress={() => onChangeTeamStatus('MATCHED')}
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
              매칭 완료
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
            onPress={() => onChangeTeamStatus('WATCHING')}
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
        </View>
      </View>
    </Modal>
  );
};

export default TeamListItemModal;
