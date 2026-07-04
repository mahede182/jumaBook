import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Map } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';

export default function MeetingPoint() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meeting point</Text>
      <Text style={styles.subtitle}>07:00 am</Text>
      
      <View style={styles.addressRow}>
        <Map size={16} color={COLORS.TEXT} style={styles.icon} />
        <Text style={styles.addressText}>
          Hassan Spring, Al Khobar, Saudi Arabia, 1290, Saudi Arabia
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={{ color: '#888' }}>Map Snippet Placeholder</Text>
          <View style={styles.pin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.FOUR,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginBottom: 40,
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  addressText: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  mapContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5F3FF',
  },
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.STAR,
    position: 'absolute',
    opacity: 0.5,
  }
});
