import React from 'react';
import {Picker} from '@react-native-community/picker';

const ModalFilterPicker = ({selectItem, setSelectItem, filterList}) => {
  return (
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
  );
};

export default React.memo(ModalFilterPicker);
