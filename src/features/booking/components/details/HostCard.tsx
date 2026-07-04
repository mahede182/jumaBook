import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { HostCardProps } from '../../@types/booking.type';
import { scale, fontScale } from '@/utils/responsive';

export default function HostCard({ host }: HostCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{host.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color={COLORS.STAR} fill={COLORS.STAR} />
            <Text style={styles.ratingText}>{host.rating} (657)</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Experience: {host.yearsHosting} years
        </Text>
        <Text style={styles.languageText}>Languages: English (Fluent) Arabic (Fluent)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.THREE,
    backgroundColor: '#FAFAFA',
    borderRadius: scale(16),
    marginBottom: SPACING.FOUR,
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    marginRight: scale(12),
  },
  content: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.TEXT,
    marginRight: scale(8),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(12),
    color: '#666',
    marginLeft: scale(4),
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(13),
    color: '#666',
    marginBottom: scale(2),
  },
  languageText: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(12),
    color: '#666',
  },
});
