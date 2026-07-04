import '@/global.css';

import { Platform } from 'react-native';

export const COLORS = {
  TEXT: '#000000',
  BACKGROUND: '#ffffff',
  BACKGROUND_ELEMENT: '#f6f6f6',
  PRIMARY: '#053b29',
  INACTIVE: '#a8a8a8',
  TAB_INACTIVE: 'rgba(0,0,0,0.34)',
  BORDER: 'rgba(5, 59, 41, 0.06)',
  TAB_BORDER: 'rgba(0,0,0,0.08)',
  ACCENT: '#ff5930',
} as const;

export type ThemeColor = keyof typeof COLORS;

export const FONTS = {
  REGULAR: 'IBMPlexSans_400Regular',
  MEDIUM: 'IBMPlexSans_500Medium',
  SEMI_BOLD: 'IBMPlexSans_600SemiBold',
  BOLD: 'IBMPlexSans_700Bold',
} as const;

export const SPACING = {
  HALF: 2,
  ONE: 4,
  TWO: 8,
  THREE: 16,
  FOUR: 24,
  FIVE: 32,
  SIX: 64,
} as const;

export const BOTTOM_TAB_INSET = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MAX_CONTENT_WIDTH = 800;

export const IMAGES = {
  TAB_EXPLORE: require('../assets/images/tab_explore_inactive.png'),
  TAB_EXPLORE_ACTIVE: require('../assets/images/tab_explorer_active.png'),
  TAB_CHAT: require('../assets/images/tab_chat_inactive.png'),
  TAB_CHAT_ACTIVE: require('../assets/images/tab_chat_active.png'),
  TAB_BOOKINGS: require('../assets/images/tab_booking_inactive.png'),
  TAB_BOOKINGS_ACTIVE: require('../assets/images/tab_bookings_active.png'),
  TAB_ACCOUNT: require('../assets/images/tab_account_inactive.png'),
  TAB_ACCOUNT_ACTIVE: require('../assets/images/tab_account_active.png'),
  EMPTY_BOOKING: require('../../assets/images/empty_booking.png'),
} as const;
