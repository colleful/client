import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {css} from '@emotion/native';

const MyPageNavListItem = ({navigation, navInfo}) => {
  return navInfo.map((navInfos, index) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(navInfos.navName)}
      key={index}
      style={css`
        flex-direction: row;
        padding: 10px 5px;
        width: 120px;
      `}>
      <Ionicons name={navInfos.iconName} size={22} />
      <Text
        style={css`
          padding: 3px 0 0 10px;
          font-size: 15px;
        `}>
        {navInfos.navName}
      </Text>
    </TouchableOpacity>
  ));
};

export default React.memo(MyPageNavListItem);
