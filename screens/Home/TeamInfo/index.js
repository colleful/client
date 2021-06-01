import React, {useState, useCallback} from 'react';
import {css} from '@emotion/native';
import GetTimeFromNow from '../../../utils/GetTimeFromNow';
import TeamInfoModal from '../../../screens/Home/TeamInfoModal/index';
import {Gravatar} from 'react-native-gravatar';
import * as S from './style';

const TeamInfo = ({team}) => {
  const [isTeamListModalVisible, setTeamListModalVisible] = useState(false);

  const onToggleTeamListModal = useCallback(() => {
    setTeamListModalVisible((prev) => !prev);
  }, []);

  return (
    <S.Wrapper onPress={onToggleTeamListModal}>
      <S.WrapperInner>
        <Gravatar
          options={{
            email: team.teamName,
            parameters: {s: '50', d: 'retro'},
            secure: true,
          }}
          style={css`
            border-radius: 50px;
            width: 60px;
            height: 100%;
          `}
        />
        <S.ContentContainer>
          <TeamInfoModal
            team={team}
            isTeamListModalVisible={isTeamListModalVisible}
            onToggleTeamListModal={onToggleTeamListModal}
          />
          <S.Content>
            팀이름 : {team.teamName}
            {'\n'}
            팀인원 : {team.headcount}명{'  '}
            {team.gender === 'MALE' ? `💪` : `👗`}
            {'\n'}
            <S.UpdatedAtText>{GetTimeFromNow(team.updatedAt)}</S.UpdatedAtText>
          </S.Content>
        </S.ContentContainer>
      </S.WrapperInner>
    </S.Wrapper>
  );
};

export default React.memo(TeamInfo);
