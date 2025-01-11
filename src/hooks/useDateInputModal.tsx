import React from 'react';
import {PaletteType} from '@/shared/theme/palette';
import DateInputModal from '@/shared/components/DateTimePicker/DateInputModal';
import useBottomSheetContext from '@/contexts/BottomSheet/hooks';

const useDateInputModal = () => {
  const {createBottomSheet, dismissBottomSheet} = useBottomSheetContext();

  const openDateInputModal = (props: {
    value: Date;
    onConfirm: (date: Date) => void;
    onCancel: () => void;
    maximumDate?: Date;
    minimumDate?: Date;
    modulePalette?: PaletteType;
    displayType?:
      | 'calendar'
      | 'spinner'
      | 'default'
      | 'compact'
      | 'inline'
      | 'clock'
      | undefined;
  }) => {
    createBottomSheet({
      _content: () => (
        <DateInputModal {...props} dismissBottomSheet={dismissBottomSheet} />
      ),
      _snapPoints: ['35%', '35%'],
      _title: 'Select Date',
      displayType: props.displayType,
    });
  };

  return {
    openDateInputModal,
  };
};

export default useDateInputModal;
