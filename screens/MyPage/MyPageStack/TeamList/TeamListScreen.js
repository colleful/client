import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TeamListItemScreen from './TeamListItemScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../../../Config';
import {css} from '@emotion/native';
import useSWR from 'swr';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../../../components/LoadingScreen';

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
  if (!error && !teamInfo.hasOwnProperty('id') && isLoading) {
    return <LoadingScreen />;
  }
  if (error) console.log({error});

  return (
    <>
      <View
        style={css`
          flex: 1;
          padding-vertical: 50px;
          padding-horizontal: 40px;
          background-color: #fff;
        `}>
        <View
          style={css`
            margin-bottom: 30px;
          `}>
          <Text
            style={css`
              font-size: 19px;
              color: #2e89de;
              line-height: 26px;
              margin-bottom: 5px;
            `}>
            ※ 멤버초대 및 팀 상태변경은{'\n\t\t\t\t\t'}팀의 리더만 할수있습니다
          </Text>
          <Text
            style={css`
              font-size: 19px;
              color: #2e89de;
            `}>
            ※ 팀 생성한 사람이 리더 입니다
          </Text>
        </View>
        <Text
          style={css`
            font-size: 32px;
            font-weight: 500;
          `}>
          내 팀 정보
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!teamInfo.hasOwnProperty('id') ? (
            <>
              <View
                style={css`
                  border-bottom-width: 1px;
                  margin-vertical: 15px;
                `}
              />
              <Text
                style={css`
                  font-size: 20px;
                `}>
                등록된 팀이 없습니다
              </Text>
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
      </View>
      {(deleteTeamLoading || exitTeamLoading) && <LoadingScreen />}
    </>
  );
};

export default TeamListScreen;
