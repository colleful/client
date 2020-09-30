import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
} from 'react-native';
import MyPageNavList from './MyPageNavList';
import MyPageInfo from './MyPageInfo';

const MyPageScreen = ({navigation, myInfoData}) => {
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    setMyInfo(myInfoData);
  }, []);

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
          <MyPageInfo myInfo={myInfoData} />
        </View>
      </View>
      <ScrollView style={{maxHeight: 475}} showsVerticalScrollIndicator={false} > 
      {/* maxHeight 대신 기기들마다 크기가 다르니까 tabbar의 크기를 변수화 시켜서 (폰의 높이 - tabbar의 크기) 로 바꾸기 */}
        <MyPageNavList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;
