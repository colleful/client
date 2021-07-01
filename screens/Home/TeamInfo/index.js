import React, {useState, useCallback} from 'react';
import GetTimeFromNow from '../../../utils/GetTimeFromNow';
import TeamInfoModal from '../../../screens/Home/TeamInfoModal/index';
import * as S from './style';

const TeamInfo = ({team}) => {
  const [isTeamListModalVisible, setTeamListModalVisible] = useState(false);
  const {teamName, headcount, gender, updatedAt} = team;
  const onToggleTeamListModal = useCallback(() => {
    setTeamListModalVisible((prev) => !prev);
  }, []);

  return (
    <S.Wrapper onPress={onToggleTeamListModal}>
      <S.WrapperInner>
        <S.StyledGravatar
          options={{
            email: teamName,
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
            팀이름 : {teamName}
            {'\n'}
            팀인원 : {headcount}명{'  '}
            {gender === 'MALE' ? '💪' : '👗'}
            {'\n'}
            <S.UpdatedAtText>{GetTimeFromNow(updatedAt)}</S.UpdatedAtText>
          </S.Content>
        </S.ContentContainer>
      </S.WrapperInner>
    </S.Wrapper>
  );
};

export default React.memo(TeamInfo);
