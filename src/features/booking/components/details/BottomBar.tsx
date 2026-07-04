import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, FONTS, IMAGES, SPACING } from '@/constants/theme';
import { BottomBarProps } from '../../@types/booking.type';
import { scale, fontScale } from '@/shared/utils/responsive';

export default function BottomBar({ price, onEditPress }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, scale(24));

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
        shadowOffset: { width: 0, height: scale(-2) },
        shadowOpacity: 0.05,
        shadowRadius: scale(8),
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
    fontSize: fontScale(12),
    color: '#666',
    marginBottom: scale(2),
  },
  priceText: {
    fontFamily: FONTS.BOLD,
    fontSize: fontScale(24),
    color: COLORS.TEXT,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  currencyIcon: {
    width: scale(20),
    height: scale(20),
  },
  bookButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: scale(32),
    paddingVertical: scale(14),
    borderRadius: scale(28),
    minWidth: scale(140),
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.BACKGROUND,
  },
});
