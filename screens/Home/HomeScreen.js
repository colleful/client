import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, RefreshControl, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import * as authAPI from '../../lib/api';
import ModalFilter from './ModalFilter';
import TeamList from '../../components/TeamList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onGetReadyTeam();
    });
  }, []);

  useEffect(() => {
    onGetReadyTeam();
  }, []);

  useEffect(() => {
    setNewTeam(team.filter((t) => t.teamName.indexOf(keyword) > -1));
  }, [team, keyword]);

  const onGetReadyTeam = async () => {
    try {
      const response = await authAPI.getReadyTeam({
        headers: {
          'Access-Token': await AsyncStorage.getItem('token'),
        },
      });
      setTeam(response.data.content);
      setImmutableTeam(response.data.content);
    } catch (error) {
      console.log({error});
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
        <Text style={{fontFamily: 'AntDesign'}}>
          {keyword === '' ? team.length : newTeam.length}개의 결과
        </Text>

        <ModalFilter
          setTeam={setTeam}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          immutableTeam={immutableTeam}
        />
      </View>
      <View style={{backgroundColor: '#fafafa'}}>
        <ScrollView
          style={{ height: 400}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {keyword === '' ? (
            <TeamList team={team} />
          ) : (
            <TeamList team={newTeam} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
