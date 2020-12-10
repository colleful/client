import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import MyPageNavList from './MyPageNavList';
import MyPageInfo from './MyPageInfo';

const MyPageScreen = ({navigation, myInfoData}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          backgroundColor: 'white',
          borderBottomColor: '#f0f0f0',
          padding: 20,
        }}>
        <Image
          source={require('../../images/1.png')}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <MyPageInfo myInfoData={myInfoData} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              borderColor: '#f0f0f0',
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 8,
              paddingHorizontal: 13,
            }}
            onPress={() => {
              navigation.navigate('프로필');
            }}>
            <Text>프로필 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{maxHeight: 475}} showsVerticalScrollIndicator={false}>
        {/* maxHeight 대신 기기들마다 크기가 다르니까 tabbar의 크기를 변수화 시켜서 (폰의 높이 - tabbar의 크기) 로 바꾸기 */}
        <MyPageNavList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;
