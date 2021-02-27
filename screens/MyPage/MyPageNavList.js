import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import MyPageNavListItem from './MyPageNavListItem';
import {css} from '@emotion/native';

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
        iconName: 'file-tray-full-outline',
        navName: '받은초대목록',
      },
      {
        iconName: 'file-tray-outline',
        navName: '보낸초대목록',
      },
      {
        iconName: 'enter-outline',
        navName: '받은매칭요청',
      },
      {
        iconName: 'exit-outline',
        navName: '보낸매칭요청',
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
    <View style={[index === 0 && css`margin-top: 10px`, styles.item]} key={index}>
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
