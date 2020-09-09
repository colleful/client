import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

import {Picker} from '@react-native-community/picker';

import Modal from 'react-native-modal';

const ModalFilter = ({
  team,
  onToggleModal,
  isModalVisible,
  selectItem,
  setSelectItem,
}) => {
  const [filterList, setfilterList] = useState([
    {
      label: '모두보기',
      value: 'all',
    },
    {
      label: '남자만',
      value: 'male',
    },
    {
      label: '여자만',
      value: 'female',
    },
    {
      label: '매칭 가능한 팀만',
      value: 'matchable',
    },
  ]);

  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 250,
            height: 250,
            borderRadius: 10,
          }}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              borderColor: 'gray',
            }}>
            <Text style={{fontSize: 18}}>필터 설정</Text>
          </View>
          <View style={{flex:1, justifyContent: "space-between", paddingBottom:20}}>
            <Picker 
              // react-native-community/picker 말고 react-native-picker-select를 사용하려했는데 최근에 릴리즈된 8.0.0버전부터
              // react-native-community/picker를 사용하라고 공홈에서 공지했다 (select가 더 nice하지만 까라면 까야지)
              // picker가 너무 구리면 react-native-picker-select를 다운그레이드해서 사용할 예정
              selectedValue={selectItem.selectedFilter}
              onValueChange={(value) => setSelectItem({selectedFilter: value})}
              mode="dialog">
              {filterList.map((filterLists, index) => {
                return (
                  <Picker.Item
                    label={filterLists.label}
                    value={filterLists.value}
                    key={index}
                  />
                );
              })}
            </Picker>
            <View style={{alignItems:"center", }}>
              <View style={{width: 60 }}>
                <Button title="적용" onPress={onToggleModal} color="#00C831" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
