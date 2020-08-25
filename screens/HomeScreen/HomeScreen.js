import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Button,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TeamList from '../../components/TeamList';
import ModalFilter from './ModalFilter';
import axios from 'axios';
import {Config} from '../../Config';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false), getTeamInfo());
  }, []);

  const [team, setTeam] = useState([]);

  const getTeamInfo = async () => {
    try {
    const response = await axios.get(`${Config.baseUrl}/api/team`);
      setTeam(response.data);
      setImmutableTeam(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamInfo();
  }, []);

  console.log('team:', team);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({
    selectedFilter: '',
  });
  const [immutableTeam, setImmutableTeam] = useState([]);
  const [keyword, setKeyword] = useState('');

  const setFilter = useCallback(() => {
    // 컴포넌트가 리렌더링 되고 selectItem.selectedFilter 가 바뀌었을 때만 함수 생성하도록 하기위해
    if (
      selectItem.selectedFilter === 'male' ||
      selectItem.selectedFilter === 'female'
    ) {
      setTeam(
        immutableTeam.filter(
          (teams) => teams.gender === selectItem.selectedFilter,
        ),
      );
    } else if (selectItem.selectedFilter === 'all') {
      setTeam(immutableTeam);
    } else if (selectItem.selectedFilter === 'matchable') {
      // 팀 정보를 가져와야 구현 가능, 내 팀 인원과 동일하고 성별이 반대인 팀을 필터링하면됨
    }
  }, [selectItem.selectedFilter]);

  const onToggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setFilter();
  };

  const [newTeam, setNewTeam] = useState([]);

  useEffect(() => {
    setNewTeam(team.filter((t) => t.teamName.indexOf(keyword) > -1));
  }, [team, keyword]);
  console.log(keyword);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderColor: '#D8D8D8',
          borderBottomWidth: 0.5,
          height: 115,
        }}></View>
      <View
        style={{borderColor: '#D8D8D8', borderBottomWidth: 0.5, height: 35}}>
        <TextInput
          style={{marginLeft: 20, height: 40}}
          placeholder="검색 할 팀이름 입력"
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
        />
      </View>
      <View
        style={{
          borderColor: '#D8D8D8',
          borderBottomWidth: 0.5,
          height: 35,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
        }}>
        <Text>{keyword === '' ? team.length : newTeam.length}개의 결과</Text>
        <Ionicons name="funnel-outline" size={20} onPress={onToggleModal} />

        <ModalFilter
          team={team}
          onToggleModal={onToggleModal}
          isModalVisible={isModalVisible}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView
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
