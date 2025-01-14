import {SvgIcon} from '@/assets/SvgIcon';
import {AppNavigationProps} from '@/navigations/types';
import {Box} from '@/shared/components/Box';
import {ScrollBox} from '@/shared/components/ScrollBox';
import {Text} from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import React, {FC, useState} from 'react';
import {PrimaryButton} from '@/shared/components/Buttons/PrimaryButton';
import {WebView} from 'react-native-webview';
import {htmlReceipt} from './Receipt';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const PreviewScreen: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const createPDF = async () => {
    setIsLoading(true);

    const options = {
      html: htmlReceipt,
      fileName: `Transaction-Invoice`,
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);

      if (file) {
        setIsLoading(false);
        console.log(file, '==me');

        const shareOptions = {
          title: `Share Invoice`,
          message: '',
          url: `file://${file?.filePath}`, // Use file:// prefix
          failOnCancel: false,
        };
        Share.open(shareOptions);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout activityLoading={isLoading} HeaderTitle={'Dashboard'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <Box>
          <Text variant={'bold16'}>Preview</Text>
          <Box
            marginHorizontal={'sm'}
            marginTop={'md'}
            columnGap={'md'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Box maxWidth={'15%'}>
              <Text variant={'regular10'} color={'gray400'}>
                Invoice Details
              </Text>
            </Box>
            <Box maxWidth={'4%'}>
              <Text variant={'regular12'} color={'gray400'}>
                {'>'}
              </Text>
            </Box>
            <Box maxWidth={'15%'}>
              <Text variant={'regular10'} color={'gray400'}>
                Bank Details
              </Text>
            </Box>
            <Box maxWidth={'4%'}>
              <Text variant={'regular12'} color={'gray400'}>
                {'>'}
              </Text>
            </Box>
            <Box maxWidth={'15%'}>
              <Text variant={'regular10'}>Preview Invoice</Text>
            </Box>
            <Box maxWidth={'4%'}>
              <Text variant={'regular12'}>{'>'}</Text>
            </Box>
            <Box maxWidth={'15%'}>
              <Text variant={'regular10'} color={'gray400'}>
                Download Invoice
              </Text>
            </Box>
            <Box maxWidth={'4%'}>
              <Text variant={'regular12'} color={'gray400'}>
                {'>'}
              </Text>
            </Box>
            <Box maxWidth={'4%'}>
              <SvgIcon name="checkCircle" size="mm" />
            </Box>
          </Box>

          <WebView
            source={{html: htmlReceipt}}
            onContentProcessDidTerminate={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.warn(
                'Content process terminated, reloading',
                nativeEvent,
              );
              //   this.refs.webview.reload();
            }}
            style={{height: 500, width: '100%'}}
          />

          <Box>
            <PrimaryButton
              borderRadius={'lg'}
              alignItems="center"
              backgroundColor="primary"
              isLoading={isLoading}
              justifyContent="center"
              label={'Download PDF'}
              labelProps={{color: 'black'}}
              labelVariant="medium14"
              loadingIconColor="black"
              marginBottom="sm"
              marginTop="lg"
              onPress={createPDF}
              paddingVertical="mmd"
            />
            <PrimaryButton
              borderRadius={'lg'}
              borderWidth={2}
              borderColor={'primary'}
              alignItems="center"
              backgroundColor="white"
              isLoading={isLoading}
              justifyContent="center"
              label={'Share Invoice'}
              labelProps={{color: 'primary'}}
              labelVariant="medium14"
              loadingIconColor="black"
              marginBottom="sml"
              marginTop="sm"
              onPress={createPDF}
              paddingVertical="mmd"
            />
          </Box>
        </Box>
      </ScrollBox>
    </MainLayout>
  );
};

export default PreviewScreen;
