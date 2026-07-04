import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock, Ticket } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { KEY_INFO_DATA } from '@/constants/data';
import { scale, fontScale } from '@/utils/responsive';

export default function KeyInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Clock size={20} color={COLORS.TEXT} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Duration</Text>
          <Text style={styles.title}>{KEY_INFO_DATA.duration}</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Ticket size={20} color={COLORS.TEXT} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{KEY_INFO_DATA.groupSizeLabel}</Text>
          <Text style={styles.title}>{KEY_INFO_DATA.groupSizeValue}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.FOUR,
    gap: scale(24),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(40),
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: fontScale(16),
    color: COLORS.TEXT,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(13),
    color: '#666',
    marginBottom: scale(4),
  },
});
