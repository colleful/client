import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styled, {css} from '@emotion/native';
import TeamInfoModalList from './TeamInfoModalList';

const TeamInfoModal = ({
  team,
  isTeamListModalVisible,
  onToggleTeamListModal,
}) => {
  return (
    <Modal
      isVisible={isTeamListModalVisible}
      onBackButtonPress={onToggleTeamListModal}>
      <View
        style={css`
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <View
          style={css`
            background-color: white;
            width: 90%;
            flex: 0.8;
            border-radius: 10px;
          `}>
          <View
            style={css`
              flex: 0.85;
              flex-flow: row wrap;
              align-items: stretch;
            `}>
            <TeamInfoModalList team={team} />
          </View>
          <View
            style={css`
              flex: 0.15;
              align-items: center;
              justify-content: center;
            `}>
            <TouchableOpacity
              style={css`
                background-color: #5e5e5e;
                border-radius: 5px;
                padding: 12px 16px;
                width: 110px;
              `}>
              <Text
                style={css`
                  color: #fff;
                `}>
                매칭 신청하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TeamInfoModal;
