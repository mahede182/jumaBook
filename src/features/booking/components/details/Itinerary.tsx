import { Bus, MapPin, Flag, ChevronRight } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, IMAGES } from '@/constants/theme';

const itineraryData = [
  { id: 1, title: 'Madina munawara', subtitle: 'Start point', type: 'start' },
  { id: 2, title: 'Al-Masjid an-Nabawi', subtitle: '', type: 'stop', stopNumber: 1 },
  { id: 3, title: 'Jannat al-Baqi (Baqi Cemetery)', subtitle: 'Tickets included', type: 'stop', stopNumber: 2 },
  { id: 4, title: 'Masjid Quba', subtitle: '', type: 'stop', stopNumber: 3 },
  { id: 5, title: 'Masjid Qiblatain', subtitle: '', type: 'stop', stopNumber: 4 },
  { id: 6, title: 'Dar Al-Madina Museum', subtitle: 'End point (Ending point would be start point)', type: 'end' },
];

export default function Itinerary() {
  return (
    <View style={styles.container}>
      {/* Top Banner */}
      <View style={styles.bannerRow}>
        <View style={styles.bannerItem}>
          <View style={styles.bannerIcon}>
            <MapPin size={16} color={COLORS.PRIMARY} />
          </View>
          <View>
            <Text style={styles.bannerLabel}>Total duration</Text>
            <Text style={styles.bannerValue}>5 Hours</Text>
          </View>
        </View>
        <View style={styles.bannerItem}>
          <View style={styles.bannerIcon}>
            <Bus size={16} color={COLORS.PRIMARY} />
          </View>
          <View>
            <Text style={styles.bannerLabel}>Transport provided</Text>
            <Text style={styles.bannerValue}>AC Minibus</Text>
          </View>
        </View>
      </View>

      <View style={styles.mapSnippet}>
        <Image
          source={IMAGES.ITERNITY_BANNER}
          style={styles.mapImage}
          resizeMode="center"
        />
      </View>

      {/* Timeline Steps */}
      <View style={styles.timelineContainer}>
        {itineraryData.map((item, index) => (
          <View key={item.id} style={styles.timelineRow}>
            {/* Left side: line and dot */}
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot}>
                {item.type === 'start' && <MapPin size={12} color={COLORS.BACKGROUND} />}
                {item.type === 'stop' && <Text style={styles.dotText}>{item.stopNumber}</Text>}
                {item.type === 'end' && <Flag size={12} color={COLORS.BACKGROUND} />}
              </View>
              {index !== itineraryData.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>
            {/* Right side: content */}
            <View style={styles.timelineContentRow}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                {!!item.subtitle && (
                  <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <ChevronRight size={18} color="#CCCCCC" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bannerRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 24,
  },
  bannerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(5, 59, 41, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: '#666',
  },
  bannerValue: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.TEXT,
  },
  mapSnippet: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
    marginRight: 16,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.TEXT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dotText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 11,
    color: COLORS.BACKGROUND,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 4,
  },
  timelineContentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  timelineContent: {
    flex: 1,
    paddingRight: 8,
  },
  timelineTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: '#666',
  },
});
