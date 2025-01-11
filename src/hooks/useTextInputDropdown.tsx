import React from 'react';
import {PaletteType} from '@/shared/theme/palette';

import SelectDropdownComponent, {
  SelectType,
} from '@/shared/components/SelectInput/SelectDropdownComponent';
import useBottomSheetContext from '@/contexts/BottomSheet/hooks';

interface SelectInputDropdownProps {
  searchable?: boolean;
  list: SelectType[];
  handleItemPress: (listElement: SelectType) => void;
  selected: string | number;
  selectedTextColor: PaletteType;
  unselectedTextColor: PaletteType;
  noBankBranch: boolean;
  nodataList: string;
  dismissBottomSheet?: () => void;
  placeholder?: string;
}

const useTextInputDropdown = () => {
  const {createBottomSheet, dismissBottomSheet} = useBottomSheetContext();

  const openSelectInputDropdown = (props: SelectInputDropdownProps) => {
    createBottomSheet({
      _content: () => (
        <SelectDropdownComponent
          {...props}
          dismissBottomSheet={dismissBottomSheet}
        />
      ),
      _snapPoints: props.list.length < 3 ? ['30%', '30%'] : ['70%', '70%'],
      _title: props.placeholder ? props.placeholder : 'Select Option',
    });
  };

  return {
    openSelectInputDropdown,
  };
};

export default useTextInputDropdown;
