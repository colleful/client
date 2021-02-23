import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../lib/api';
import ModalFilter from './ModalFilter';
import TeamListItem from '../../components/TeamListItem';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../modules/auth';
import { css } from '@emotion/native';

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onGetReadyTeam();
      setPageNumber(0);
    });
  }, []);

  useEffect(() => {
    onGetReadyTeam();
  }, []);

  useEffect(() => {
    setNewTeam(team.filter((teams) => teams.teamName.indexOf(keyword) > -1));
  }, [team, keyword]);

  const onGetReadyTeam = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getReadyTeam(pageNumber, {
        headers: {
          'Authorization': await AsyncStorage.getItem('authorization'),
        },
      });
      if (response.data.content === []) {
        setPageNumber(pageNumber);
      } else {
        setPageNumber(pageNumber + 1);
      }
      setTeam(team.concat(response.data.content));
      setImmutableTeam(team.concat(response.data.content));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error.response.data.status === 403){ // 토큰 유효기간 지났을때
        console.log("토큰 유효기간 지남");
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
  },[loading]);

  const onToggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  },[]);

  return (
    <View style={{flex: 1}}>
      <View
        style={css`
          margin: 20px;
          padding-bottom: 20px;
          padding-horizontal: 20px;
          background-color: #fff;
          border-radius: 10px;
          elevation: 4; //android
          shadow-color: #000; //ios
          shadow-opacity: 0.3;
          shadow-offset: 2px 2px;
        `}>
        <View style={css`flex-direction: row; align-items: center`}>
          <Ionicons name="search-outline" size={18} />
          <TextInput
            style={css`
              width: 100%;
              height: 40px;
            `}
            placeholder="팀 검색"
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
          />
        </View>
        <View
          style={css`
            border-bottom-width: 0.5px;
            border-bottom-color: #cccccc;
          `}
        />
        <View style={{marginTop: 10}}>
          <Ionicons
            name="funnel-outline"
            size={20}
            onPress={onToggleModal}
          />
          <ModalFilter
            setTeam={setTeam}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            immutableTeam={immutableTeam}
          />
        </View>
      </View>

      <View
        style={css`
          border-color: #D8D8D8;
          height: 35px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding-horizontal: 25px;
        `}>
        <Text>
          {keyword === '' ? team.length : newTeam.length}개의 결과
        </Text>
      </View>
      <View style={css`background-color: #fafafa`}>
        <FlatList
          disableVirtualization={false} //비정상적인 스크롤 동작을 방지하려고
          style={css`height: 400px`}
          keyExtractor={(item, index) => index.toString()}
          data={keyword === '' ? team : newTeam}
          renderItem={({item, index}) => (
            <View
              style={[index === 0 && css`margin-top: 12px`, styles.item]}
              key={index}>
              <TeamListItem team={item} />
            </View>
          )}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }></FlatList>
      </View>
    </View>
  );
};

export default React.memo(HomeScreen);

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
});
