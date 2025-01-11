import {BackgroundColorProps} from '@shopify/restyle';
import React, {ReactNode} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import { IconProps, IconVector } from "../assets/icons/IconVector";
import {height, Theme, verticalScale} from '../theme';
import {PaletteType} from '../theme/palette';
import {Box} from '../components/Box';
import {landingpagebackground} from '@/assets/pngImagePack';
import {Image} from '../components/Image';
import {IconVector} from '@/assets/IconVector';

interface Style {
  children: ReactNode;

  backgroundColor?: BackgroundColorProps<Theme>['backgroundColor'];

  transparentInner?: boolean;
  bgColorInner?: PaletteType;
  extended?: boolean;
}
const BlurLayoutContainer = ({
  children,

  backgroundColor = 'white',

  extended = false,
  bgColorInner = 'white',
  transparentInner = false,
}: Style) => {
  const insets = useSafeAreaInsets();

  return (
    // <ImageBackground resizeMode="cover" source={imageName} style={{ flex: 1 }}>
    <Box backgroundColor={backgroundColor} flex={1}>
      <Box
        flex={1}
        height={height / 2}
        left={0}
        position="absolute"
        right={0}
        top={0}>
        <Image source={landingpagebackground} height={'180%'} width="100%" />
      </Box>
      <SafeAreaView style={{flex: 1}}>
        <Box
          backgroundColor="transparent"
          height={Platform.OS === 'android' ? insets.top + 12 : 5}>
          <StatusBar
            animated
            backgroundColor="transparent"
            barStyle="light-content"
            translucent
          />
        </Box>

        <Box height={verticalScale(100)} />

        <Box flex={1}>
          <Box
            backgroundColor={transparentInner ? 'transparent' : bgColorInner}
            borderTopLeftRadius={extended ? 'none' : 'md'}
            borderTopRightRadius={extended ? 'none' : 'md'}
            flex={1}
            position="relative"
            paddingHorizontal={'md'}
            paddingVertical={'lg'}>
            {children}
            {/* {hasBottomButton && (
              <Box
                backgroundColor={transparentInner ? 'transparent' : 'white'}
                bottom={0}
                left={0}
                pb="sm"
                position="absolute"
                pt="xs"
                px="md"
                right={0}>
                <BaseButton
                  justifyContent="center"
                  onPress={bottomButtonPress}
                  size="md"
                  {...bottomButtonProps}>
                  {bottomButtonProps?.isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text
                      color="white"
                      variant="medium14"
                      {...bottomButtonTextProps}>
                      {bottomButtonText}
                    </Text>
                  )}
                </BaseButton>
                <Box height={insets.bottom} />
              </Box>
            )} */}
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default BlurLayoutContainer;
