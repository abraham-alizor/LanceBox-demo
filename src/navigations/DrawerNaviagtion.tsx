import * as React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';
import CustomDrawerContent from '@/shared/components/DrawerNav';
import {SvgIcon} from '@/assets/SvgIcon';
import DashboardScreen from '@/screens/Dashboard';
import ProfileScreen from '@/screens/Profile/Index';
import ReceiptScreen from '@/screens/Receipt';
import SettingScreen from '@/screens/settings';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />} // Use the custom drawer content
      screenOptions={{
        headerShown: false,
        drawerContentContainerStyle: {
          borderRadius: 2,
        },

        drawerItemStyle: {
          marginVertical: 5,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: '#FFF',
        },

        drawerActiveBackgroundColor: '#D9ECFF0D',
      }}>
      <Drawer.Screen
        name="Invoice"
        component={DashboardScreen}
        options={{
          drawerIcon: () => (
            <SvgIcon name="invoice" color="transparent" size="sm" /> // Add icon for Home
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: () => (
            <SvgIcon name="userSquare" color="transparent" size="sm" /> // Add icon for Notifications
          ),
        }}
      />
      <Drawer.Screen
        name="Receipts"
        component={ReceiptScreen}
        options={{
          drawerIcon: () => (
            <SvgIcon name="receipts" color="transparent" size="sm" /> // Add icon for Home
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: () => (
            <SvgIcon name="settings" color="transparent" size="sm" /> // Add icon for Notifications
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
