import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import MyPageNavListItem from './MyPageNavListItem';

const MyPageNavList = ({navigation}) => {
  const [navInfo, setNavInfo] = useState([
    [
      {
        iconName: 'person-circle-outline',
        navName: '계정',
      },
      {
        iconName: 'mail-outline',
        navName: '쪽지함',
      },
      {
        iconName: 'add-outline',
        navName: '팀생성',
      },
      {
        iconName: 'list-outline',
        navName: '팀목록',
      },
      {
        iconName: 'albums-outline',
        navName: '받은초대목록',
      },
      {
        iconName: 'people-outline',
        navName: '친구목록',
      },
    ],
    [
      {
        iconName: 'megaphone-outline',
        navName: '공지사항',
      },
      {
        iconName: 'chatbubble-ellipses-outline',
        navName: '건의사항',
      },
      {
        iconName: 'cog-outline',
        navName: '설정',
      },
    ],
  ]);
  return navInfo.map((navinfos, index) => (
    <View style={[index === 0 && {marginTop: 10}, styles.item]} key={index}>
      <MyPageNavListItem navigation={navigation} navInfo={navinfos} />
    </View>
  ));
};

export default MyPageNavList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
});
