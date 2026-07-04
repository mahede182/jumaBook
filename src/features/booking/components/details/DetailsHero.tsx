import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Share2, Star } from 'lucide-react-native';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS } from '@/constants/theme';
import { removeNewlines } from '@/utils/string';

interface DetailsHeroProps {
  title: string;
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
}

const { width } = Dimensions.get('window');

export default function DetailsHero({ title, rating, reviewsCount, imageUrl }: DetailsHeroProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const images = [
    imageUrl || 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=800&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=8',
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
            style={styles.carouselImage}
            contentFit="cover"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Overlay controls */}
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Top Header Buttons */}
        <View style={styles.headerRow} pointerEvents="box-none">
          <Pressable style={styles.iconButton} onPress={() => {
            router.push('/(tabs)/bookings');
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
          {/* Rating and Indicator Row */}
          <View style={styles.ratingAndIndicatorRow}>
            {/* Rating */}
            <View style={styles.ratingRow}>
              <View style={[styles.tag, { marginRight: 8 }]}>
                <Text style={styles.tagText}>Nature & Hiking</Text>
              </View>
              <Star size={16} color={COLORS.STAR} fill={COLORS.STAR} />
              <Text style={styles.ratingText}>
                {rating} <Text style={styles.reviewsText}>({reviewsCount})</Text>
              </Text>
            </View>

            {/* Carousel indicator on the right */}
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

          {/* Title */}
          <Text style={styles.title}>{removeNewlines(title)}</Text>

          {/* Tags (at the very bottom) */}
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
    width: width,
    height: 380,
    backgroundColor: '#333',
  },
  carouselImage: {
    width: width,
    height: 380,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerRight: {
    flexDirection: 'column',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingAndIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorDotActive: {
    backgroundColor: COLORS.BACKGROUND,
    width: 16,
  },
  bottomOverlay: {
    width: '100%',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  tagText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: COLORS.BACKGROUND,
  },
  title: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 26,
    color: COLORS.BACKGROUND,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
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
    marginHorizontal: 8,
  },
  locationText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
});
