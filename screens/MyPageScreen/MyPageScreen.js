import React from 'react';
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyPageScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: "#fafafa" }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          backgroundColor:"white",
          borderBottomColor: "#f0f0f0",
          padding: 20
        }}>
        <Image
          source={require('../../images/1.png')}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
        <View style={{flex: 1, marginLeft: 20, alignItems:'center', justifyContent:'space-between', flexDirection:"row"}}>
          <View>
            <Text style={{fontSize: 18, marginBottom: 5}}>박상범</Text>
            <Text style={{fontSize: 14, color:"gray", opacity:0.7 }}>남 {'/'} 25  공과대학</Text>
          </View>
          <View style={{justifyContent:'center', paddingHorizontal: 13, paddingVertical:5, borderRadius: 5, borderColor: "gray", borderWidth: 1, opacity: 0.4, backgroundColor: "gray"}}>
            <Text onPress={() => navigation.navigate('계정')}>정보수정</Text>
          </View>
        </View>
      </View>
      <View style={{marginVertical: 10, paddingVertical:10, paddingHorizontal:20, backgroundColor: "white", borderBottomColor: "#f0f0f0", borderBottomWidth: 1}}>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 100}}>
          <Ionicons name="person-circle-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('계정')}>계정</Text>
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 100}}>
          <Ionicons name="mail-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('쪽지함')}>쪽지함</Text>
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 100}}>
          <Ionicons name="person-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('친구목록')}>친구목록</Text>
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 100}}>
          <Ionicons name="people-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('팀목록')}>팀목록</Text>
        </View>
      </View>
      <View style={{paddingVertical:10, paddingHorizontal:20, backgroundColor: "white", borderBottomColor: "#f0f0f0", borderBottomWidth: 1}}>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 150}}>
          <Ionicons name="megaphone-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('공지사항')}>공지사항</Text>
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 150}}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('건의사항')}>건의사항</Text>
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 150}}>
          <Ionicons name="git-branch-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}}>앱 공유</Text>
          {/* 앱 공유는 추후에 공유방식 생각 해 볼 예정 */}
        </View>
        <View style={{flexDirection: "row",padding: 5, paddingVertical:10, width: 150}}>
          <Ionicons name="cog-outline" size={22} />
          <Text style={{paddingLeft: 10, fontSize: 15}} onPress={() => navigation.navigate('설정')}>앱 설정</Text>
        </View>
      </View>
    </View>
  );
};

export default MyPageScreen;