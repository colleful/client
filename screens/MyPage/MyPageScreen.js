import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import MyPageNavList from './MyPageNavList';
import MyPageInfo from './MyPageInfo';
import {css} from '@emotion/native';
import {Gravatar} from 'react-native-gravatar';

const MyPageScreen = ({navigation, myInfoData}) => {
  return (
    <View
      style={css`
        flex: 1;
        background-color: #fafafa;
      `}>
      <View
        style={css`
          flex-direction: row;
          border-bottom-width: 1px;
          background-color: #fff;
          border-bottom-color: #f0f0f0;
          padding: 20px;
        `}>
        <Gravatar
          options={{
            email: myInfoData.email,
            parameters: {s: '50', d: 'retro'},
            secure: true,
          }}
          style={{borderRadius: 30, width: 60, height: 60}}
        />
        <View
          style={css`
            flex: 1;
            margin-left: 15px;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
          `}>
          <MyPageInfo myInfoData={myInfoData} />
        </View>
        <View
          style={css`
            justify-content: center;
          `}>
          <TouchableOpacity
            style={css`
              border-color: #f0f0f0;
              border-width: 1px;
              border-radius: 5px;
              padding-vertical: 8px;
              padding-horizontal: 13px;
            `}
            onPress={() => {
              navigation.navigate('프로필');
            }}>
            <Text>프로필 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={css`
          max-height: 465px;
        `}
        showsVerticalScrollIndicator={false}>
        {/* maxHeight 대신 기기들마다 크기가 다르니까 tabbar의 크기를 변수화 시켜서 (폰의 높이 - tabbar의 크기) 로 바꾸기 */}
        <MyPageNavList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;
