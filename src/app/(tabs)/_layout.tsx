import { Image } from 'expo-image';
import { Tabs } from 'expo-router';

import { COLORS, FONTS, IMAGES } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="bookings"
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IMAGES.TAB_EXPLORE_ACTIVE : IMAGES.TAB_EXPLORE}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IMAGES.TAB_CHAT_ACTIVE : IMAGES.TAB_CHAT}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IMAGES.TAB_BOOKINGS_ACTIVE : IMAGES.TAB_BOOKINGS}
              style={{ width: 24, height: 24 }}
            />
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IMAGES.TAB_ACCOUNT_ACTIVE : IMAGES.TAB_ACCOUNT}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
