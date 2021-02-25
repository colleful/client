import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {css} from '@emotion/native';
import GetTimeFromNow from '../../utils/GetTimeFromNow';
import TeamInfoModal from '../../screens/Home/TeamInfoModal';
import {Gravatar} from 'react-native-gravatar';

const TeamInfo = ({team}) => {
  const [isTeamListModalVisible, setTeamListModalVisible] = useState(false);

  const onToggleTeamListModal = useCallback(() => {
    setTeamListModalVisible((prev) => !prev);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onToggleTeamListModal}>
      <View
        style={css`
          flex: 1;
          padding: 18px 0px;
        `}>
        <View
          style={css`
            flex-direction: row;
            align-items: center;
            margin-left: 20px;
          `}>
          <Gravatar
            options={{
              email: team.teamName + '@naver.com',
              parameters: {s: '50', d: 'retro'},
              secure: true,
            }}
            style={{borderRadius: 30, width: 60, height: 60}}
          />
          <View
            style={css`
              flex-direction: column;
            `}>
            <TeamInfoModal
              team={team}
              isTeamListModalVisible={isTeamListModalVisible}
              onToggleTeamListModal={onToggleTeamListModal}
            />
            <Text
              style={css`
                font-size: 15px;
                margin-left: 25px;
                line-height: 21px;
              `}>
              팀이름 : {team.teamName}
              {'\n'}
              팀인원 : {team.headcount}명{'  '}
              {team.gender === 'MALE' ? `💪` : `👗`}
              {'\n'}
              <Text
                style={css`
                  font-size: 14px;
                  color: #c4c4c4;
                  font-weight: 100;
                `}>
                {GetTimeFromNow(team.updatedAt)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TeamInfo;
