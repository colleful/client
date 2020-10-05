import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Modal from 'react-native-modal';

const ModalFilter = ({
  setTeam,
  isModalVisible,
  setModalVisible,
  immutableTeam,
}) => {
  const [filterList] = useState([
    {
      label: '모두보기',
      value: 'ALL',
    },
    {
      label: '남자만',
      value: 'MALE',
    },
    {
      label: '여자만',
      value: 'FEMALE',
    },
    {
      label: '매칭 가능한 팀만',
      value: 'MATCHABLE',
    },
  ]);
  const [selectItem, setSelectItem] = useState({
    selectedFilter: '',
  });

  const setFilter = useCallback(() => {
    // 컴포넌트가 리렌더링 되고 selectItem.selectedFilter 가 바뀌었을 때만 함수 생성하도록 하기위해
    if (
      selectItem.selectedFilter === 'MALE' ||
      selectItem.selectedFilter === 'FEMALE'
    ) {
      setTeam(
        immutableTeam.filter(
          (teams) => teams.gender === selectItem.selectedFilter,
        ),
      );
    } else if (selectItem.selectedFilter === 'ALL') {
      setTeam(immutableTeam);
    } else if (selectItem.selectedFilter === 'MATCHABLE') {
      // 내 팀 선택하는 기능? 이있어야 비교가능할듯
    }
  }, [selectItem.selectedFilter]);

  const onToggleModal = () => {
    setModalVisible(!isModalVisible);
    setFilter();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={() => setModalVisible(!isModalVisible)}>
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
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <Picker
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
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={onToggleModal}
                style={{
                  backgroundColor: '#5e5e5e',
                  borderRadius: 5,
                  padding: 16,
                  paddingVertical: 10,
                  width: 56,
                }}>
                <Text style={{color: '#fff'}}>적용</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
