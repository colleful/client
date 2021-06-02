import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, RefreshControl, StyleSheet,Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFilter from '../ModalFilter/index';
import TeamInfo from '../TeamInfo/index';
import {useDispatch, useSelector} from 'react-redux';
import {GET_READY_TEAM_REQUEST} from '../../../reducers/team';
import LoadingScreen from '../../../components/LoadingScreen';
import * as S from './style';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = ({}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [immutableTeam, setImmutableTeam] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    getReadyTeamLoading,
    getReadyTeamDone,
    getReadyTeamError,
    ReadyTeamData,
  } = useSelector(({team}) => team);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_READY_TEAM_REQUEST, data: pageNumber});
  }, []);

  useEffect(() => {
    setNewTeam(team.filter((teams) => teams.teamName.indexOf(keyword) > -1));
  }, [team, keyword]);

  useEffect(() => {
    if (getReadyTeamDone) {
      if (ReadyTeamData.content === []) {
        setPageNumber(pageNumber);
      } else {
        setPageNumber(pageNumber + 1);
      }
      setTeam(team.concat(ReadyTeamData.content));
      setImmutableTeam(team.concat(ReadyTeamData.content));
    }

    if (getReadyTeamError) {
      Alert.alert('에러', `${getReadyTeamError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({getReadyTeamError});
    }
  }, [getReadyTeamDone, getReadyTeamError]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      dispatch({type: GET_READY_TEAM_REQUEST, data: pageNumber});
      setPageNumber(0);
    });
  }, []);

  // const onGetReadyTeam = async () => {
  //   try {
  //     // setLoading(true);
  //     // const response = await authAPI.getReadyTeam(pageNumber, {
  //     //   headers: {
  //     //     Authorization: await AsyncStorage.getItem('authorization'),
  //     //   },
  //     // });
  //     if (response.data.content === []) {
  //       setPageNumber(pageNumber);
  //     } else {
  //       setPageNumber(pageNumber + 1);
  //     }
  //     setTeam(team.concat(response.data.content));
  //     setImmutableTeam(team.concat(response.data.content));
  //   } catch (error) {}
  // };

  const onEndReachedHandler = useCallback(() => {
    if (getReadyTeamLoading) {
      return;
    }
    dispatch({type: GET_READY_TEAM_REQUEST, data: pageNumber});
  }, [getReadyTeamLoading]);

  const onToggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

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
          <Text>{keyword === '' ? team.length : newTeam.length}개의 결과</Text>
        </S.Result>
      </S.WrapperInner>

      <S.FlatList
        // onEndReached={onEndReachedHandler}
        // onEndReachedThreshold={0.3}
        disableVirtualization={false} //비정상적인 스크롤 동작을 방지
        keyExtractor={(_, index) => index.toString()}
        data={keyword === '' ? team : newTeam}
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
      {getReadyTeamLoading && <LoadingScreen />}
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
