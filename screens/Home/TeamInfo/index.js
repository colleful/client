import React, {useState, useCallback} from 'react';
import GetTimeFromNow from '../../../utils/GetTimeFromNow';
import TeamInfoModal from '../../../screens/Home/TeamInfoModal/index';
import * as S from './style';

const TeamInfo = ({team}) => {
  const [isTeamListModalVisible, setTeamListModalVisible] = useState(false);

  const onToggleTeamListModal = useCallback(() => {
    setTeamListModalVisible((prev) => !prev);
  }, []);

  return (
    <S.Wrapper onPress={onToggleTeamListModal}>
      <S.WrapperInner>
        <S.StyledGravatar
          options={{
            email: team.teamName,
            parameters: {s: '50', d: 'retro'},
            secure: true,
          }}
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
