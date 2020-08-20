import React from 'react';
import {View, Text} from 'react-native';

const MyPageScreen = ({navigation}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => navigation.navigate('쪽지함')}>쪽지함</Text>
      </View>
    );
  };

export default MyPageScreen;
