import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, FONTS, SPACING, IMAGES } from '@/constants/theme';
import { Image } from 'react-native';

interface BottomBarProps {
  price: string;
  onEditPress?: () => void;
}

export default function BottomBar({ price, onEditPress }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, 24);

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <View style={styles.priceContainer}>
        <Text style={styles.fromText}>from</Text>
        <View style={styles.priceRow}>
          <Image 
            source={IMAGES.CURRENCY} 
            style={[styles.currencyIcon, { tintColor: COLORS.TEXT }]}
            resizeMode="contain"
          />
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
      <Pressable style={styles.bookButton} onPress={onEditPress}>
        <Text style={styles.bookButtonText}>Edit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.FOUR,
    paddingTop: SPACING.THREE,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  fromText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  priceText: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    color: COLORS.TEXT,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencyIcon: {
    width: 20,
    height: 20,
  },
  bookButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    minWidth: 140,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.BACKGROUND,
  },
});
