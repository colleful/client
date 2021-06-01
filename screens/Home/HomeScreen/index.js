import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, RefreshControl, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../../lib/api';
import ModalFilter from '../ModalFilter/index';
import TeamInfo from '../TeamInfo/index';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../../reducers/auth';
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
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    onGetReadyTeam();
  }, []);

  useEffect(() => {
    setNewTeam(team.filter((teams) => teams.teamName.indexOf(keyword) > -1));
  }, [team, keyword]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onGetReadyTeam();
      setPageNumber(0);
    });
  }, []);

  const onGetReadyTeam = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getReadyTeam(pageNumber, {
        headers: {
          Authorization: await AsyncStorage.getItem('authorization'),
        },
      });
      if (response.data.content === []) {
        setPageNumber(pageNumber);
      } else {
        setPageNumber(pageNumber + 1);
      }
      console.log('준비된 팀 data', response.data);
      setTeam(team.concat(response.data.content));
      setImmutableTeam(team.concat(response.data.content));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.status === 403) {
        // 토큰 유효기간 지났을때
        console.log('토큰 유효기간 지남');
        AsyncStorage.removeItem('authorization');
        AsyncStorage.removeItem('userPassword');
        dispatch(setLoginState(false));
      }
    }
  };

  const onEndReachedHandler = useCallback(() => {
    if (loading) {
      return;
    }
    onGetReadyTeam();
  }, [loading]);

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
