import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKINGS, MONTHS, WEEKDAYS, FULL_WEEKDAYS } from '@/constants/data';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import BookingCard from '@/features/booking/components/BookingCard';
import { scale, fontScale } from '@/shared/utils/responsive';

const formatMonthYear = (date: Date) => `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
const formatDayOfWeek = (date: Date) => WEEKDAYS[date.getDay()];
const isSameDate = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
};

export default function RescheduleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [windowStart, setWindowStart] = useState(new Date(2025, 7, 11));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 7, 13));

  const handleNextWindow = () => {
    const nextStart = new Date(windowStart);
    nextStart.setDate(nextStart.getDate() + 6);
    setWindowStart(nextStart);
  };

  const handlePrevWindow = () => {
    const prevStart = new Date(windowStart);
    prevStart.setDate(prevStart.getDate() - 6);
    setWindowStart(prevStart);
  };

  const currentWindowDays = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(windowStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const bottomBarDateStr = `${FULL_WEEKDAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;

  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  const renderHeader = () => (
    <View style={[styles.header, { marginTop: insets.top + SPACING.THREE }]}>
      <Pressable
        onPress={() => {
          router.push('/(tabs)/bookings');
        }}
        style={styles.backButton}
        hitSlop={8}
      >
        <ChevronLeft color={COLORS.TEXT} size={24} />
      </Pressable>
      <Text style={styles.headerTitle}>Reschedule</Text>
      <View style={styles.placeholder} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bookingWrapper}>
          <BookingCard booking={booking} style={styles.bookingCard} />
        </View>

        <View style={styles.currentDatePill}>
          <Text style={styles.currentDateText}>
            Current date: <Text style={styles.currentDateBold}>10/09/2025</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a new available date</Text>
          <Text style={styles.sectionSubtitle}>All prices are in SAR ($568,00)</Text>

          <View style={styles.monthRow}>
            <View style={styles.monthTextRow}>
              <Text style={styles.monthText}>{formatMonthYear(windowStart)}</Text>
              <ChevronRight size={16} color={COLORS.TEXT} />
            </View>
            <View style={styles.arrowsRow}>
              <Pressable onPress={handlePrevWindow} hitSlop={10}>
                <ChevronLeft size={16} color="#CCCCCC" style={styles.arrowSpacing} />
              </Pressable>
              <Pressable onPress={handleNextWindow} hitSlop={10}>
                <ChevronRight size={16} color={COLORS.TEXT} />
              </Pressable>
            </View>
          </View>

          <View style={styles.calendarRow}>
            {currentWindowDays.map((day, idx) => {
              const isActive = isSameDate(day, selectedDate);

              if (isActive) {
                return (
                  <Animated.View layout={LinearTransition.springify()} key={idx} style={styles.calendarDayActiveWrapper}>
                    <View style={styles.calendarDayActive}>
                      <Text style={styles.dayLabelActive}>{formatDayOfWeek(day)}</Text>
                      <View style={styles.dateCircle}>
                        <Text style={styles.dateLabelActive}>{day.getDate()}</Text>
                      </View>
                    </View>
                    <View style={styles.dotGroup}><View style={styles.dotDark} /></View>
                  </Animated.View>
                );
              }

              return (
                <Animated.View layout={LinearTransition.springify()} key={idx}>
                  <Pressable style={styles.calendarDay} onPress={() => setSelectedDate(day)}>
                    <Text style={styles.dayLabel}>{formatDayOfWeek(day)}</Text>
                    <Text style={styles.dateLabelInactive}>{day.getDate()}</Text>
                    <View style={styles.dotGroup}>
                      {idx % 2 === 0 ? (
                        <><View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} /></>
                      ) : (
                        <><View style={styles.dot} /><View style={styles.dot} /></>
                      )}
                    </View>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start time</Text>
          <View style={styles.timeSlotBox}>
            <Text style={styles.timeSlotLabel}>Only one time slot available:</Text>
            <View style={styles.timeSlotRow}>
              <Clock size={16} color={COLORS.TEXT} />
              <Text style={styles.timeSlotValue}>07:00 am</Text>
              <Text style={styles.timeSlotWarning}>(Arrive by 6:45 AM for check-in)</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.bottomBarLeft}>
          <Text style={styles.bottomBarDate}>{bottomBarDateStr}</Text>
          <Text style={styles.bottomBarTime}>07:00 am</Text>
        </View>
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit to admin</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.FOUR,
    paddingBottom: SPACING.THREE,
  },
  backButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(18),
    color: COLORS.TEXT,
  },
  placeholder: {
    width: scale(44),
  },
  scrollContent: {
    paddingBottom: scale(120),
  },
  bookingWrapper: {
    backgroundColor: '#F9F9F9',
    padding: SPACING.FOUR,
    paddingVertical: SPACING.FIVE,
    marginBottom: SPACING.FOUR,
  },
  bookingCard: {
    marginBottom: 0,
  },
  currentDatePill: {
    backgroundColor: '#FFF1F2',
    marginHorizontal: SPACING.FOUR,
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: SPACING.FIVE,
  },
  currentDateText: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#E11D48',
  },
  currentDateBold: {
    fontFamily: FONTS.SEMI_BOLD,
  },
  section: {
    paddingHorizontal: SPACING.FOUR,
    marginBottom: SPACING.FIVE,
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(20),
    color: COLORS.TEXT,
    marginBottom: scale(4),
  },
  sectionSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#666',
    marginBottom: scale(24),
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  monthTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(16),
    color: COLORS.TEXT,
    marginRight: scale(4),
  },
  arrowsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowSpacing: {
    marginRight: scale(16),
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scale(8),
  },
  calendarDay: {
    alignItems: 'center',
    paddingTop: scale(8),
  },
  calendarDayActiveWrapper: {
    alignItems: 'center',
  },
  calendarDayActive: {
    backgroundColor: '#157E4B',
    borderRadius: scale(22),
    paddingTop: scale(10),
    paddingBottom: scale(4),
    alignItems: 'center',
    width: scale(44),
  },
  dayLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: COLORS.TEXT,
    marginBottom: scale(12),
  },
  dayLabelActive: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(12),
    color: COLORS.BACKGROUND,
    marginBottom: scale(8),
  },
  dateLabelInactive: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#999',
    marginBottom: scale(8),
  },
  dateCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabelActive: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(14),
    color: '#157E4B',
  },
  dotGroup: {
    flexDirection: 'row',
    gap: scale(4),
    marginTop: scale(8),
  },
  dot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: '#E5E5E5',
  },
  dotDark: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: COLORS.TEXT,
  },
  timeSlotBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: scale(12),
    paddingVertical: SPACING.THREE,
    paddingHorizontal: SPACING.FOUR,
  },
  timeSlotLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(16),
    color: '#666',
    marginBottom: scale(8),
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  timeSlotValue: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.TEXT,
  },
  timeSlotWarning: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(12),
    color: '#E11D48',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.FOUR,
    paddingTop: SPACING.THREE,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  bottomBarLeft: {
    flex: 1,
  },
  bottomBarDate: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(14),
    color: COLORS.TEXT,
    marginBottom: scale(2),
  },
  bottomBarTime: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#666',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: scale(24),
    paddingVertical: scale(14),
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.BACKGROUND,
  },
});
