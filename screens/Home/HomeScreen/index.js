import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, RefreshControl, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFilter from '../ModalFilter/index';
import TeamInfo from '../TeamInfo/index';
import LoadingScreen from '../../../components/LoadingScreen';
import {Config} from '../../../Config';
import useSWR, {trigger} from 'swr';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as S from './style';
import {GET_READY_TEAM_REQUEST} from '../../../reducers/team';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = ({}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [immutableTeam, setImmutableTeam] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const dispatch = useDispatch();
  const {getReadyTeamDone, readyTeamList, getReadyTeamError} = useSelector(
    ({team}) => team,
  );

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return response.data;
  };

  const {data: readyTeamData = [], error} = useSWR(
    `${Config.baseUrl}/api/teams?page=${pageIndex}`,
    fetcher,
  );

  // useEffect(() => {
  //   console.log('team', team);
  //   setNewTeam(team?.filter((teams) => teams.teamName.indexOf(keyword) > -1));
  // }, [team, keyword]);

  useEffect(() => {
    if (!keyword && !keyword.trim()) {
      return;
    }
    dispatch({type: GET_READY_TEAM_REQUEST, data: keyword});
  }, [keyword]);

  useEffect(() => {
    if (getReadyTeamDone) {
      setNewTeam(readyTeamList.content);
    }
    if (getReadyTeamError) {
      Alert.alert('에러', `${getReadyTeamError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({getReadyTeamError});
    }
  }, [getReadyTeamDone]);

  useEffect(() => {
    if (!readyTeamData.length) {
      console.log('readyTeamData', readyTeamData);
      setTeam(readyTeamData.content);
      setImmutableTeam(readyTeamData.content);
    }
  }, [readyTeamData]);

  const onRefresh = useCallback(() => {
    setRefreshing((prev) => !prev);
    wait(1000).then(() => {
      setRefreshing((prev) => !prev);
      trigger(`${Config.baseUrl}/api/teams?page=0`);
    });
  }, [pageIndex]);

  const onToggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  if (error) console.log({error});

  return (
    <S.Wrapper>
      <S.WrapperInner>
        <S.Header>
          <S.Search>
            <Ionicons name="search-outline" size={18} />
            <S.SearchInput
              placeholder="팀 검색"
              onChangeText={(text) => setKeyword(text)}
              value={keyword}
            />
          </S.Search>
          <S.Filter>
            <Ionicons name="funnel-outline" size={20} onPress={onToggleModal} />
            {isModalVisible && (
              <ModalFilter
                setTeam={setTeam}
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                immutableTeam={immutableTeam}
              />
            )}
          </S.Filter>
        </S.Header>
        <S.Result>
          <Text>{!keyword && !keyword.trim() ? team?.length : newTeam.length}개의 결과</Text>
        </S.Result>
      </S.WrapperInner>

      <S.FlatList
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd >= 0 && readyTeamData.content !== []) {
            setPageIndex((prev) => prev + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        disableVirtualization={false} //비정상적인 스크롤 동작을 방지
        keyExtractor={(_, index) => index.toString()}
        data={!keyword && !keyword.trim() ? team : newTeam}
        renderItem={({item, index}) => (
          <View
            style={[index === 0 && styles.firstItem, styles.item]}
            key={index}>
            <TeamInfo team={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </S.Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    height: 100,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: '#f0f0f0',
    borderBottomWidth: 2,
  },
  firstItem: {
    marginTop: 12,
  },
});
