import { FONTS } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import { BulletListProps } from '../../@types/booking.type';

export default function BulletList({ items }: BulletListProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 18,
    lineHeight: 22,
    color: '#666',
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
});
