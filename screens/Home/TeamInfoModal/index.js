import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import TeamInfoModalList from '../TeamInfoModalList/index';
import {useSelector, useDispatch} from 'react-redux';
import {
  INITAILIZE_STATE,
  SEND_MATCHING_REQUEST,
} from '../../../reducers/matching';
import * as S from './style';

const TeamInfoModal = ({
  team,
  isTeamListModalVisible,
  onToggleTeamListModal,
}) => {
  const dispatch = useDispatch();
  const {
    sendMatchingLoading,
    sendMatchingDone,
    matchingData,
    sendMatchingError,
  } = useSelector(({matching}) => matching);

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, [dispatch]);

  useEffect(() => {
    if (sendMatchingDone && matchingData?.sentTeam.id === team.id) {
      Alert.alert(
        '완료',
        `${matchingData?.receivedTeam.teamName}팀에게 매칭 요청을 보냈습니다.`,
        [
          {
            text: '확인',
          },
        ],
      );
    }
    if (sendMatchingError) {
      Alert.alert('에러발생', `${sendMatchingError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({sendMatchingError});
    }
  }, [
    sendMatchingLoading,
    sendMatchingDone,
    sendMatchingError,
    team.id,
    matchingData,
    matchingData?.sentTeam.id,
    matchingData?.receivedTeam.teamName,
  ]);

  const onGetSendMatching = useCallback(() => {
    dispatch({type: SEND_MATCHING_REQUEST, data: {teamId: team.id}});
  }, [dispatch, team.id]);

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
