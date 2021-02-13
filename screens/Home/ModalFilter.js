import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Modal from 'react-native-modal';
import styled, {css} from '@emotion/native';

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
  };

  const onToggleModalAndSetFilter = () => {
    setModalVisible(!isModalVisible);
    setFilter();
  };

  return (
    <Modal isVisible={isModalVisible} onBackButtonPress={onToggleModal}>
      <View
        style={css`
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <View
          style={css`
            background-color: white;
            width: 250px;
            height: 250px;
            border-radius: 10px;
          `}>
          <View
            style={css`
              height: 50px;
              justify-content: center;
              align-items: center;
              border-bottom-width: 0.5px;
              border-color: gray;
            `}>
            <Text
              style={css`
                font-size: 18px;
              `}>
              필터 설정
            </Text>
          </View>
          <View
            style={css`
              flex: 1;
              justify-content: space-between;
              padding-bottom: 20px;
            `}>
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
            <View
              style={css`
                align-items: center;
              `}>
              <TouchableOpacity
                onPress={onToggleModalAndSetFilter}
                style={css`
                  background-color: #5e5e5e;
                  border-radius: 5px;
                  padding: 12px 16px;
                  width: 58px;
                `}>
                <Text
                  style={css`
                    color: #fff;
                  `}>
                  적용
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
