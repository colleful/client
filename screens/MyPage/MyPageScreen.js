import React from 'react';
import {View, Text, Image} from 'react-native';

import MyPageNavList from './MyPageNavList';

const MyPageScreen = ({navigation}) => {
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
          <View>
            <Text style={{fontSize: 18, marginBottom: 5}}>박상범</Text>
            <Text style={{fontSize: 14, color: 'gray', opacity: 0.7}}>
              남 {'/'} 25 공과대학
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 13,
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: 'gray',
              borderWidth: 1,
              opacity: 0.4,
              backgroundColor: 'gray',
            }}>
            <Text onPress={() => navigation.navigate('계정')}>정보수정</Text>
          </View>
        </View>
      </View>
      <MyPageNavList navigation={navigation} />
    </View>
  );
};

export default MyPageScreen;
