import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';

export default function Reviews() {
  const ratings = [
    { stars: 5, pct: '70%' },
    { stars: 4, pct: '12%' },
    { stars: 3, pct: '3%' },
    { stars: 2, pct: '2%' },
    { stars: 1, pct: '1%' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rating & reviews (617)</Text>
      </View>

      <View style={styles.scoreRow}>
        <Star size={24} color={COLORS.STAR} fill={COLORS.STAR} />
        <Text style={styles.scoreText}>4.95 (617)</Text>
      </View>

      {/* Bars */}
      <View style={styles.barsContainer}>
        {ratings.map((r) => (
          <View key={r.stars} style={styles.barRow}>
            <View style={styles.starsLeft}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  color={i < r.stars ? COLORS.STAR : '#DDD'} 
                  fill={i < r.stars ? COLORS.STAR : 'transparent'} 
                />
              ))}
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: r.pct }]} />
            </View>
            <Text style={styles.pctText}>{r.pct}</Text>
          </View>
        ))}
      </View>

      {/* Featured Review */}
      <View style={styles.reviewCard}>
        <View style={styles.reviewerRow}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=haydn' }} style={styles.reviewerAvatar} />
          <View>
            <Text style={styles.reviewerName}>Haydn S.</Text>
            <View style={styles.reviewStars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} color={COLORS.STAR} fill={COLORS.STAR} />
              ))}
              <Text style={styles.reviewTime}> • 4 weeks ago</Text>
            </View>
          </View>
        </View>
        <Text style={styles.reviewText}>
          Cruising up past the cliffs as the sun returns in the late afternoon is an experience in a place of absolute historical wonders that is truly awe inspiring.
        </Text>
        
        {/* Photos */}
        <View style={styles.photosRow}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=200&q=80' }} style={styles.photo} />
          <Image source={{ uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80' }} style={styles.photo} />
          <Image source={{ uri: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=200&q=80' }} style={styles.photo} />
        </View>
      </View>

      <Pressable style={styles.showMoreBtn}>
        <Text style={styles.showMoreText}>Show more reviews</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.FOUR,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  headerRow: {
    marginBottom: 16,
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    color: COLORS.TEXT,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 24,
    color: COLORS.TEXT,
    marginLeft: 8,
  },
  barsContainer: {
    marginBottom: 24,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsLeft: {
    flexDirection: 'row',
    width: 70,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    marginHorizontal: 12,
  },
  barFill: {
    height: 6,
    backgroundColor: COLORS.STAR,
    borderRadius: 3,
  },
  pctText: {
    width: 32,
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: COLORS.TEXT,
    textAlign: 'right',
  },
  reviewCard: {
    marginBottom: 24,
  },
  reviewerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerName: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 15,
    color: COLORS.TEXT,
    marginBottom: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTime: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  reviewText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  photosRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
  },
  showMoreBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(5, 59, 41, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 15,
    color: COLORS.PRIMARY,
  },
});
