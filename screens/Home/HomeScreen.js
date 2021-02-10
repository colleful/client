import React, {useState, useCallback, useEffect, useMemo} from 'react';
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

  const onEndReachedHandler = () => {
    if (loading) {
      return;
    } else {
      onGetReadyTeam();
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          margin: 20,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 4, //android
          shadowColor: '#000', //ios
          shadowOpacity: 0.3,
          shadowOffset: {width: 2, height: 2},
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="search-outline" size={18} />
          <TextInput
            style={{
              width: '100%',
              height: 40,
            }}
            placeholder="팀 검색"
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#cccccc',
          }}
        />
        <View style={{marginTop: 10}}>
          <Ionicons
            name="funnel-outline"
            size={20}
            onPress={() => setModalVisible(!isModalVisible)}
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
        style={{
          borderColor: '#D8D8D8',
          height: 35,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
        }}>
        <Text>
          {keyword === '' ? team.length : newTeam.length}개의 결과
        </Text>
      </View>
      <View style={{backgroundColor: '#fafafa'}}>
        <FlatList
          disableVirtualization={false} //비정상적인 스크롤 동작을 방지하려고
          style={{height: 400}}
          keyExtractor={(item, index) => index.toString()}
          data={keyword === '' ? team : newTeam}
          renderItem={({item, index}) => (
            <View
              style={[index === 0 && {marginTop: 12}, styles.item]}
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
