import { Image as ExpoImage } from 'expo-image';
import { Heart, MoreVertical, Share2, Star } from 'lucide-react-native';
import { useRef } from 'react';
import { Pressable, Image as RNImage, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import Animated, { FadeInDown } from 'react-native-reanimated';

import { COLORS, FONTS, IMAGES, SPACING } from '@/constants/theme';
import { BookingCardProps } from '../@types/booking.type';
import { scale, fontScale } from '@/utils/responsive';

export default function BookingCard({ booking, onOptionsPress, style, index = 0 }: BookingCardProps) {
  const optionsRef = useRef<View>(null);
  const router = useRouter();

  const handleOptionsPress = () => {
    optionsRef.current?.measureInWindow((x, y, width, height) => {
      onOptionsPress?.({ x, y, width, height });
    });
  };

  return (
    <Animated.View entering={FadeInDown.duration(600).delay(index * 150).springify()}>
      <Pressable style={[styles.card, style]} onPress={() => router.push(`/booking/${booking.id}`)}>
      <View style={styles.imageContainer}>
        <RNImage
          source={{ uri: booking.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Pressable style={styles.heartButton} hitSlop={8}>
          <Heart size={scale(20)} color={COLORS.BACKGROUND} />
        </Pressable>
        <Pressable style={styles.shareButton} hitSlop={8}>
          <Share2 size={scale(20)} color={COLORS.BACKGROUND} />
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <View style={styles.ratingContainer}>
            <Star size={16} color={COLORS.STAR} fill={COLORS.STAR} />
            <Text style={styles.ratingText}>
              {booking.rating} ({booking.reviewsCount})
            </Text>
          </View>
          {booking.status !== 'Completed' && (
            <View style={styles.datePill}>
              <Text style={styles.dateText}>{booking.date}</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={3}>
          {booking.title}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceBlock}>
            <View style={styles.priceRow}>
              <RNImage
                source={IMAGES.CURRENCY}
                style={[styles.currencyOriginal, { tintColor: COLORS.ACCENT }]}
                resizeMode="contain"
              />
              <Text style={styles.originalPrice}>{booking.originalPrice}</Text>
            </View>
            <View style={styles.priceRow}>
              <RNImage
                source={IMAGES.CURRENCY}
                style={[styles.currencyDiscounted, { tintColor: COLORS.TEXT }]}
                resizeMode="contain"
              />
              <Text style={styles.discountedPrice}>{booking.discountedPrice}</Text>
            </View>
          </View>

          {!!booking.discountTag && (
            <View style={styles.discountTagWrapper}>
              <View style={styles.discountTagArrow} />
              <View style={styles.discountTagBody}>
                <Text style={styles.discountTagText}>{booking.discountTag}</Text>
              </View>
            </View>
          )}

          <View ref={optionsRef} collapsable={false}>
            <Pressable
              style={styles.optionsButton}
              onPress={handleOptionsPress}
              hitSlop={8}
            >
              <MoreVertical size={scale(16)} color={COLORS.TEXT} />
            </Pressable>
          </View>
        </View>
      </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: SPACING.THREE,
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(144),
    height: scale(136),
    marginRight: scale(12),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
  },
  heartButton: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    padding: scale(4),
  },
  shareButton: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    padding: scale(4),
  },
  contentContainer: {
    flex: 1,
    height: scale(136),
    justifyContent: 'space-between',
    paddingVertical: scale(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.TEXT,
  },
  datePill: {
    backgroundColor: COLORS.ACCENT,
    paddingHorizontal: SPACING.TWO,
    borderRadius: scale(24),
    height: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(10),
    color: COLORS.BACKGROUND,
    includeFontPadding: false,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: fontScale(15),
    lineHeight: fontScale(20),
    color: COLORS.TEXT,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceBlock: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  currencyOriginal: {
    width: scale(12),
    height: scale(12),
  },
  currencyDiscounted: {
    width: scale(16),
    height: scale(16),
  },
  originalPrice: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.ACCENT,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontFamily: FONTS.BOLD,
    fontSize: fontScale(20),
    color: COLORS.TEXT,
    lineHeight: fontScale(22),
  },
  discountTagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  discountTagArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightColor: COLORS.DISCOUNT_BG,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  discountTagBody: {
    backgroundColor: COLORS.DISCOUNT_BG,
    height: 20,
    paddingRight: 6,
    paddingLeft: 2,
    justifyContent: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  discountTagText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.BACKGROUND,
  },
  optionsButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: COLORS.BACKGROUND_ELEMENT,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});
