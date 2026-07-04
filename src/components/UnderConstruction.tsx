import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Construction } from 'lucide-react-native';
import { COLORS, FONTS } from '@/constants/theme';
import { scale, fontScale } from '@/utils/responsive';

interface UnderConstructionProps {
  style?: ViewStyle;
}

export default function UnderConstruction({ style }: UnderConstructionProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Construction size={64} color={COLORS.PRIMARY} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>Under construction</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  iconContainer: {
    marginBottom: scale(24),
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(20),
    color: COLORS.TEXT,
    textAlign: 'center',
  },
});
