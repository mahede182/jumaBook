import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { REVIEWS_DATA } from '@/constants/data';
import { scale, fontScale } from '@/utils/responsive';

export default function Reviews() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rating & reviews ({REVIEWS_DATA.count})</Text>
      </View>

      <View style={styles.scoreRow}>
        <Star size={24} color={COLORS.STAR} fill={COLORS.STAR} />
        <Text style={styles.scoreText}>{REVIEWS_DATA.score} ({REVIEWS_DATA.count})</Text>
      </View>

      <View style={styles.barsContainer}>
        {REVIEWS_DATA.ratings.map((r) => (
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
              <View style={[styles.barFill, { width: r.pct as any }]} />
            </View>
            <Text style={styles.pctText}>{r.pct}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reviewCard}>
        <View style={styles.reviewerRow}>
          <Image source={{ uri: REVIEWS_DATA.featured.avatar }} style={styles.reviewerAvatar} />
          <View>
            <Text style={styles.reviewerName}>{REVIEWS_DATA.featured.name} S.</Text>
            <View style={styles.reviewStars}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  color={i < REVIEWS_DATA.featured.rating ? COLORS.STAR : '#DDD'} 
                  fill={i < REVIEWS_DATA.featured.rating ? COLORS.STAR : 'transparent'} 
                />
              ))}
              <Text style={styles.reviewTime}> • 4 weeks ago</Text>
            </View>
          </View>
        </View>
        <Text style={styles.reviewText}>
          {REVIEWS_DATA.featured.comment}
        </Text>
        
        <View style={styles.photosRow}>
          {REVIEWS_DATA.featured.photos.map((p, idx) => (
            <Image key={idx} source={{ uri: p }} style={styles.photo} />
          ))}
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
    marginBottom: scale(16),
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(18),
    color: COLORS.TEXT,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  scoreText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(24),
    color: COLORS.TEXT,
    marginLeft: scale(8),
  },
  barsContainer: {
    marginBottom: scale(24),
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  starsLeft: {
    flexDirection: 'row',
    width: scale(70),
  },
  barTrack: {
    flex: 1,
    height: scale(6),
    backgroundColor: '#EEEEEE',
    borderRadius: scale(3),
    marginHorizontal: scale(12),
  },
  barFill: {
    height: scale(6),
    backgroundColor: COLORS.STAR,
    borderRadius: scale(3),
  },
  pctText: {
    width: scale(32),
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.TEXT,
    textAlign: 'right',
  },
  reviewCard: {
    marginBottom: scale(24),
  },
  reviewerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  reviewerAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(12),
  },
  reviewerName: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(15),
    color: COLORS.TEXT,
    marginBottom: scale(2),
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTime: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(12),
    color: '#666',
    marginLeft: scale(4),
  },
  reviewText: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#444',
    lineHeight: fontScale(22),
    marginBottom: scale(16),
  },
  photosRow: {
    flexDirection: 'row',
    gap: scale(8),
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: scale(8),
  },
  showMoreBtn: {
    width: '100%',
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'rgba(5, 59, 41, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(15),
    color: COLORS.PRIMARY,
  },
});
