import React,{useState,useCallback} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import TeamList from '../../components/TeamList';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [team, setTeam] = useState([
    {
      thumbnail: '',
      name: '어벤저스',
      player: 4,
      gender: 'male',
      school: '전북대학교',
      department: '컴퓨터공학부',
    },
    {
      thumbnail: '',
      name: '몰티저스',
      player: 3,
      gender: 'female',
      school: '전북대학교',
      department: '무용학과',
    },
    {
      thumbnail: '',
      name: '화공존잘남',
      player: 10,
      gender: 'male',
      school: '전북대학교',
      department: '화학공학부',
    },
    {
      thumbnail: '',
      name: '간호대 아이유',
      player: 2,
      gender: 'female',
      school: '전북대학교',
      department: '간호학과',
    },
    {
      thumbnail: '',
      name: '가짜사나이',
      player: 2,
      gender: 'male',
      school: '전북대학교',
      department: '기계공학과',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={{borderColor: '#D8D8D8', borderBottomWidth: 0.5, flex: 0.4}}></View>
      <View style={{borderColor: '#D8D8D8', borderBottomWidth: 0.5, flex: 0.1}}></View>
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <TeamList team={team} />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
