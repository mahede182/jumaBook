import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Share2, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '@/constants/theme';
import { removeNewlines } from '@/utils/string';
import { DETAILS_CAROUSEL_IMAGES } from '@/constants/data';
import { DetailsHeroProps } from '../../@types/booking.type';
import { scale, fontScale } from '@/utils/responsive';

export default function DetailsHero({ title, rating, reviewsCount, imageUrl }: DetailsHeroProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const images = [
    imageUrl || DETAILS_CAROUSEL_IMAGES[0],
    DETAILS_CAROUSEL_IMAGES[1],
    DETAILS_CAROUSEL_IMAGES[2],
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={StyleSheet.absoluteFill}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.carouselImage, { width }]}
            contentFit="cover"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={[styles.overlay, { paddingTop: Math.max(insets.top, 24) }]} pointerEvents="box-none">
        <View style={styles.headerRow} pointerEvents="box-none">
          <Pressable style={styles.iconButton} onPress={() => {
            router.back();
          }}>
            <ChevronLeft size={24} color={COLORS.BACKGROUND} />
          </Pressable>

          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Heart size={20} color={COLORS.BACKGROUND} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Share2 size={20} color={COLORS.BACKGROUND} />
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomOverlay}>
          <View style={styles.ratingAndIndicatorRow}>
            <View style={styles.ratingRow}>
              <View style={[styles.tag, { marginRight: 8 }]}>
                <Text style={styles.tagText}>Nature & Hiking</Text>
              </View>
              <Star size={16} color={COLORS.STAR} fill={COLORS.STAR} />
              <Text style={styles.ratingText}>
                {rating} <Text style={styles.reviewsText}>({reviewsCount})</Text>
              </Text>
            </View>

            <View style={styles.indicatorContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    activeIndex === index && styles.indicatorDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>{removeNewlines(title)}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsRow}
          >
            <View style={styles.tag}>
              <Text style={styles.tagText}>Transfers included</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Instant confirmation</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Duration 11hours</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(380),
    backgroundColor: '#333',
  },
  carouselImage: {
    height: scale(380),
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    paddingTop: scale(50),
    paddingBottom: scale(24),
    paddingLeft: scale(16),
    paddingRight: scale(4),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerRight: {
    flexDirection: 'column',
    gap: scale(12),
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  ratingAndIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  indicatorDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorDotActive: {
    backgroundColor: COLORS.BACKGROUND,
    width: scale(16),
  },
  bottomOverlay: {
    width: '100%',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: scale(16),
  },
  tag: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(16),
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  tagText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.BACKGROUND,
  },
  title: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(26),
    color: COLORS.BACKGROUND,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(14),
    color: COLORS.BACKGROUND,
    marginLeft: 4,
  },
  reviewsText: {
    fontFamily: FONTS.REGULAR,
    color: 'rgba(255,255,255,0.8)',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: scale(8),
  },
  locationText: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: 'rgba(255,255,255,0.9)',
  },
});
