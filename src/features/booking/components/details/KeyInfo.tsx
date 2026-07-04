import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock, Ticket } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';

export default function KeyInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Clock size={20} color={COLORS.TEXT} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Duration</Text>
          <Text style={styles.title}>11 Hours</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Ticket size={20} color={COLORS.TEXT} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Group size ( Up to 4 guests per session )</Text>
          <Text style={styles.title}>Snack included</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.FOUR,
    gap: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
});
