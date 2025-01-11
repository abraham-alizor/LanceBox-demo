import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

// import { loginBackground } from "@/mybank/assets/image";
import logo from "@/shared/assets/image/logo.png";

import { Text } from "@/shared/components/Typography";
import { palette } from "@/shared/theme/palette";

import { ImageBackground } from "./ImageBackground";
import RfValue from "@/helpers/RfValue";
import { SafeAreaViewProps } from "./SafeAreaView";
import { Box } from "./Box";

import { Image } from "./Image";
import { IconVector } from "@/assets/IconVector";

export type LayoutComponentProps = SafeAreaViewProps & {
  isIcon?: boolean;
  label: string;
  isCancel?: boolean;
  labelMarginLeftsmallLarge?: boolean;
  isBackArrow?: boolean;
  children?: JSX.Element | JSX.Element[];
  otherbackground?: number;
  backgroundColor?: string;
};

const styles = StyleSheet.create({
  iconImg: {
    height: RfValue(50),
    width: RfValue(45),
  },
});

const { height } = Dimensions.get("window");

function LayoutComponent({
  label,
  labelMarginLeftsmallLarge,
  isIcon = false,
  isBackArrow = true,
  children,
  isCancel = false,
  backgroundColor = "primary",
}: LayoutComponentProps) {
  const navigation = useNavigation();
  return (
    <Box backgroundColor={backgroundColor} flex={1}>
      <SafeAreaView style={{ flex: 1, marginTop: RfValue(20) }}>
        <StatusBar
          backgroundColor={palette.primary}
          style="light"
          translucent
        />
        <ImageBackground
          height={height}
          resizeMode="cover"
          source={loginBackground}>
          <Box
            alignItems="center"
            flexDirection="row"
            marginBottom="sm"
            marginTop="md"
            paddingHorizontal="md">
            {isBackArrow && (
              <Pressable onPress={navigation.goBack}>
                <IconVector name="back" size="sm" />
              </Pressable>
            )}
            <Box
              alignItems={isBackArrow ? "center" : "flex-start"}
              flex={1}
              justifyContent="center">
              <Text
                color="whiteColor"
                marginLeft={labelMarginLeftsmallLarge ? "xl" : "sml"}
                textAlign="center"
                textTransform="uppercase"
                variant="bold14">
                {label}
              </Text>
            </Box>
            {isIcon ? (
              <Image source={logo} style={styles.iconImg} />
            ) : (
              <Box style={styles.iconImg} />
            )}
            {!isIcon && isCancel ? (
              <Pressable
                onPress={() => navigation.dispatch(StackActions.popToTop())}>
                <IconVector name="close" size="md" />
              </Pressable>
            ) : (
              <Box style={styles.iconImg} />
            )}
          </Box>
          <Box
            backgroundColor="whiteColor"
            borderTopLeftRadius="sm"
            borderTopRightRadius="sm"
            flex={1}
            overflow="hidden">
            {children}
          </Box>
        </ImageBackground>
      </SafeAreaView>
    </Box>
  );
}

export { LayoutComponent };
