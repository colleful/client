import React from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import TeamInfoModalList from '../TeamInfoModalList/index';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import * as S from './style';

const TeamInfoModal = ({
  team,
  isTeamListModalVisible,
  onToggleTeamListModal,
}) => {
  const onGetSendMatching = async () => {
    try {
      await authAPI.sendMatching(
        {teamId: team.id},
        {
          headers: {
            Authorization: await AsyncStorage.getItem('authorization'),
          },
        },
      );
      Alert.alert('완료', `${team.teamName}팀에게 매칭 요청을 보냈습니다.`, [
        {
          text: '확인',
          onPress: () => console.log('완료'),
        },
      ]);
    } catch (error) {
      Alert.alert('에러발생', `${error.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({error});
    }
  };

  return (
    <Modal
      isVisible={isTeamListModalVisible}
      onBackButtonPress={onToggleTeamListModal}>
      <S.Wrapper>
        <S.WrapperInner>
          <S.TeamInfoContainer>
            <TeamInfoModalList team={team} />
          </S.TeamInfoContainer>
          <S.ButtonContainer>
            <S.Button onPress={onGetSendMatching}>
              <S.ButtonText>매칭 신청하기</S.ButtonText>
            </S.Button>
          </S.ButtonContainer>
        </S.WrapperInner>
      </S.Wrapper>
    </Modal>
  );
};

export default TeamInfoModal;
