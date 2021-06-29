import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import TeamFilterPicker from '../TeamFilterPicker/index';
import * as S from './style';

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
    }
  }, [selectItem.selectedFilter, immutableTeam, setTeam]);

  const onToggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, [setModalVisible]);

  const onToggleModalAndSetFilter = useCallback(() => {
    onToggleModal();
    setFilter();
  }, [onToggleModal, setFilter]);

  return (
    <Modal isVisible={isModalVisible} onBackButtonPress={onToggleModal}>
      <S.Wrapper>
        <S.WrapperInner>
          <S.Header>
            <S.HeaderTitle>필터 설정</S.HeaderTitle>
          </S.Header>
          <S.Content>
            <TeamFilterPicker
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              filterList={filterList}
            />
            <S.ButtonContainer>
              <S.Button onPress={onToggleModalAndSetFilter}>
                <S.ButtonText>적용</S.ButtonText>
              </S.Button>
            </S.ButtonContainer>
          </S.Content>
        </S.WrapperInner>
      </S.Wrapper>
    </Modal>
  );
};

export default ModalFilter;
