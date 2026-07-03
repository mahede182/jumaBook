import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { COLORS, FONTS, IMAGES } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.TEXT,
        tabBarInactiveTintColor: COLORS.TAB_INACTIVE,
        tabBarStyle: {
          height: 94,
          backgroundColor: COLORS.BACKGROUND,
          borderTopColor: COLORS.TAB_BORDER,
          borderTopWidth: 1,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.MEDIUM,
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          marginBottom: 16, // Extra bottom padding for iOS home indicator
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => (
            <Image source={IMAGES.TAB_EXPLORE} style={{ width: 28, height: 28 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: () => (
            <Image source={IMAGES.TAB_CHAT} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: () => (
            <Image source={IMAGES.TAB_BOOKINGS} style={{ width: 24, height: 24 }} />
          ),
          tabBarLabelStyle: {
            fontFamily: FONTS.BOLD,
            fontSize: 12,
            marginTop: 4,
            marginBottom: 16,
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: () => (
            <Image source={IMAGES.TAB_ACCOUNT} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
    </Tabs>
  );
}
