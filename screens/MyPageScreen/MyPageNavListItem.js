import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const MyPageNavListItem = ({navigation, navInfo}) => {
  return navInfo.map((navInfos,index) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(navInfos.navName)}
      key={index}
      style={{
        flexDirection: 'row',
        padding: 5,
        paddingVertical: 10,
        width: 100,
      }}>
      <Ionicons name={navInfos.iconName} size={22} />
      <Text style={{paddingLeft: 10, fontSize: 15}}>{navInfos.navName}</Text>
    </TouchableOpacity>
  ));
};

export default MyPageNavListItem;
