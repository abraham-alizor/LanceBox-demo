import React from 'react';
import useBottomSheetContext from '@/contexts/BottomSheet/hooks';
import {Box} from '@/shared/components/Box';
import {PrimaryButton} from '@/shared/components/Buttons/PrimaryButton';
import {Text} from '@/shared/components/Typography';
import {horizontalScale} from '@/shared/theme';
import LottieView from 'lottie-react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

const useStatusModal = () => {
  const {createBottomSheet, dismissBottomSheet} = useBottomSheetContext();

  const openStatusModal = (props: {
    buttonLabel?: any;
    onProceed: (value: any) => void;
    status: String;
    message: String;
  }) => {
    createBottomSheet({
      _content: () => (
        <BottomSheetView style={styles.contentContainer}>
          <Box
            alignItems={'center'}
            justifyContent={'space-around'}
            flex={1}
            paddingBottom={'lg'}
            paddingHorizontal={'lg'}>
            <LottieView
              style={{
                width: props.status === 'success' ? 120 : 100,
                height: props.status === 'success' ? 120 : 100,
              }}
              source={
                props.status === 'success'
                  ? require('../assets/animations/success.json')
                  : require('../assets/animations/error.json')
              }
              autoPlay={true}
              loop={false}
            />
            <Text variant={'bold16'}>
              {props.status === 'success'
                ? 'Request successfully sent'
                : 'Request not successful'}
            </Text>
            <Text marginTop={'xs'} variant={'regular16'} textAlign={'center'}>
              {props.message}
            </Text>
            <PrimaryButton
              width={horizontalScale(323)}
              alignContent={'center'}
              alignItems="center"
              justifyContent="center"
              label={'CLOSE'}
              labelProps={{color: 'white', textAlign: 'center'}}
              labelVariant="medium14"
              loadingIconColor="black"
              marginTop="lg"
              onPress={() => {
                props.onProceed(null);
                dismissBottomSheet();
              }}
              paddingVertical="mmd"
            />
          </Box>
        </BottomSheetView>
      ),
      _snapPoints: ['40%', '40%'],
      _title: 'Beneficiaries',
    });
  };

  return {
    openStatusModal,
  };
};

export default useStatusModal;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
