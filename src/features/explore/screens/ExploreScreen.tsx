import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { COLORS, FONTS, IMAGES } from '@/constants/theme';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyIconContainer}>
        <Image 
          source={IMAGES.EMPTY_BOOKING} 
          style={{ width: 306, height: 186 }} 
          contentFit="contain" 
        />
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
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 20,
    color: COLORS.TEXT,
    textAlign: 'center',
  },
});
