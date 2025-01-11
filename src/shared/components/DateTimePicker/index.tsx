import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {PaletteType} from '@/shared/theme/palette';

import {Text} from '../Typography/Text';
import {SvgIconPackType} from '@/assets/svgIconPack';
import useDateInputModal from '@/hooks/useDateInputModal';
import {Box} from '../Box';
import {SvgIcon} from '@/assets/SvgIcon';
import {IconVector} from '@/assets/IconVector';
import {TouchableOpacity} from '../TouchableOpacity';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: RFValue(8),
    // height: RFValue(45),
    marginTop: 5,
    paddingHorizontal: RFValue(10),
    borderWidth: 0.75,
    borderColor: '#E3E6EA',
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: RFValue(24),
    height: RFValue(48),
    justifyContent: 'center',
    width: RFValue(48),
  },
  rotate: {
    marginLeft: 5,
  },
});

export type DateInputProps = {
  editable?: boolean;
  value?: string | Date;
  showDateIcon?: boolean;
  getSelectedDate: (inputValue: Date) => void;
  rightIconName?: SvgIconPackType;
  innerlabel?: string;
  primaryColor?: PaletteType;
  maximumDate?: Date;
  minimumDate?: Date;
  placeholderTextColor?: PaletteType;
  display?: string | Date;
  errorMessage?: string;
  label?: string;
  simpleView?: boolean;
  moduleColorCode?: string;
  modulePalette?: PaletteType;
  backgroundColor?: PaletteType;
  borderColor?: PaletteType;
  displayType?:
    | 'calendar'
    | 'spinner'
    | 'default'
    | 'compact'
    | 'inline'
    | 'clock'
    | undefined;
};

export const DateInput = ({
  value = '',

  getSelectedDate,

  maximumDate = new Date(2030, 10, 20),
  minimumDate = new Date(1950, 10, 20),
  errorMessage,
  label,
  moduleColorCode = '#0033AA',
  modulePalette = 'primary',
  rightIconName,
  backgroundColor = 'white',
  borderColor = 'gray200',
  displayType = 'default',
}: DateInputProps) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {openDateInputModal} = useDateInputModal();

  useEffect(() => {
    if (value) {
      const validDate = moment(value, 'YYYY-MM-DD', true).isValid();
      if (validDate) {
        setSelectedDate(new Date(value));
      } else {
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowCalendar(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDate) {
      setSelectedDate(selectedDate);
      getSelectedDate(selectedDate);
    } else if (event.type === 'dismissed') {
      setShowCalendar(false);
    }
  };

  const handleOpenDatePicker = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
      setTimeout(() => {
        openDateInputModal({
          displayType,
          value: selectedDate || new Date(),
          onConfirm: (date: Date) => {
            setSelectedDate(date);
            getSelectedDate(date);
          },
          onCancel: () => {},
          maximumDate,
          minimumDate,
          modulePalette,
        });
      }, 50);
    } else {
      setShowCalendar(true);
    }
  };

  return (
    <>
      <Box
        backgroundColor={backgroundColor}
        borderColor={errorMessage ? 'errorColor' : borderColor}
        style={{
          borderRadius: RFValue(5),
        }}>
        <TouchableOpacity
          paddingBottom={'md'}
          activeOpacity={0.75}
          onPress={handleOpenDatePicker}
          style={styles.container}>
          <Text color="black" variant="medium14">
            {label}
          </Text>
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text color={selectedDate ? 'black' : 'gray200'} variant="medium14">
              {selectedDate && displayType === 'clock'
                ? moment(selectedDate).format('HH:MM A')
                : selectedDate
                ? moment(selectedDate).format('DD/MM/YYYY')
                : 'DD/MM/YYYY'}
            </Text>
            {rightIconName ? (
              <SvgIcon
                color="primary"
                name={rightIconName}
                size="md"
                style={styles.rotate}
              />
            ) : (
              <IconVector
                color="primary"
                name="calender"
                size="md"
                style={styles.rotate}
              />
            )}
          </Box>
        </TouchableOpacity>
      </Box>

      {errorMessage && (
        <Text color="errorColor" marginTop="xs" variant="regular12">
          {errorMessage}
        </Text>
      )}

      {Platform.OS === 'android' && showCalendar && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={displayType}
          onChange={onChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          positiveButton={{label: 'OK', textColor: moduleColorCode}}
          negativeButton={{label: 'Cancel', textColor: 'red'}}
        />
      )}
    </>
  );
};
