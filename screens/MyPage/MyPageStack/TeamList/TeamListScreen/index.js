import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import TeamListItemScreen from '../TeamListItemScreen/index';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../../../../Config';
import useSWR from 'swr';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../../components/LoadingScreen';
import * as S from './style';

const TeamListScreen = ({navigation, teamId, userId}) => {
  const [isLoading, setLoading] = useState(false);
  const {deleteTeamLoading, exitTeamLoading} = useSelector(({team}) => team);

  useEffect(() => {
    console.log('teamInfo', teamInfo);
  }, [teamInfo]);

  const fetcher = async (url) => {
    setLoading((prev) => !prev);
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    setLoading((prev) => !prev);
    return response.data;
  };

  const {data: teamInfo = {}, error} = useSWR(
    teamId === null ? null : `${Config.baseUrl}/api/teams/${teamId}`,
    fetcher,
  );
  // if (!error && !teamInfo.hasOwnProperty('id') && isLoading) {
  //   return <LoadingScreen />;
  // }
  if (error) console.log({error});

  return (
    <S.Wrapper>
      <S.ExplainContainer>
        <S.ExplainText mb5>
          ※ 멤버초대 및 팀 상태변경은{'\n\t\t\t\t\t'}팀의 리더만 할수있습니다
        </S.ExplainText>
        <S.ExplainText>※ 팀 생성한 사람이 리더 입니다</S.ExplainText>
      </S.ExplainContainer>
      <S.Title>내 팀 정보</S.Title>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!teamInfo.hasOwnProperty('id') ? (
          <>
            <S.BorderLine />
            <S.ContentText>등록된 팀이 없습니다</S.ContentText>
          </>
        ) : (
          <TeamListItemScreen
            navigation={navigation}
            teamInfo={teamInfo}
            userId={userId}
            teamId={teamId}
          />
        )}
      </ScrollView>
      {(deleteTeamLoading || exitTeamLoading) && <LoadingScreen />}
    </S.Wrapper>
  );
};

export default TeamListScreen;
