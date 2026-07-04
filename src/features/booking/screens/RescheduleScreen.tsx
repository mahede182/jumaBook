import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { BOOKINGS } from '@/constants/data';
import BookingCard from '@/features/booking/components/BookingCard';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const FULL_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

          {/* Calendar row */}
          <View style={styles.calendarRow}>
            {currentWindowDays.map((day, idx) => {
              const isActive = isSameDate(day, selectedDate);
              
              if (isActive) {
                return (
                  <View key={idx} style={styles.calendarDayActiveWrapper}>
                    <View style={styles.calendarDayActive}>
                      <Text style={styles.dayLabelActive}>{formatDayOfWeek(day)}</Text>
                      <View style={styles.dateCircle}>
                        <Text style={styles.dateLabelActive}>{day.getDate()}</Text>
                      </View>
                    </View>
                    <View style={styles.dotGroup}><View style={styles.dotDark}/></View>
                  </View>
                );
              }

              return (
                <Pressable key={idx} style={styles.calendarDay} onPress={() => setSelectedDate(day)}>
                  <Text style={styles.dayLabel}>{formatDayOfWeek(day)}</Text>
                  <Text style={styles.dateLabelInactive}>{day.getDate()}</Text>
                  <View style={styles.dotGroup}>
                    {idx % 2 === 0 ? (
                      <><View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/></>
                    ) : (
                      <><View style={styles.dot}/><View style={styles.dot}/></>
                    )}
                  </View>
                </Pressable>
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

      {/* Bottom Sticky Bar */}
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
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    color: COLORS.TEXT,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingBottom: 120,
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
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.FIVE,
  },
  currentDateText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
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
    fontSize: 20,
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
    color: COLORS.TEXT,
    marginRight: 4,
  },
  arrowsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowSpacing: {
    marginRight: 16,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  calendarDay: {
    alignItems: 'center',
    paddingTop: 8,
  },
  calendarDayActiveWrapper: {
    alignItems: 'center',
  },
  calendarDayActive: {
    backgroundColor: '#157E4B',
    borderRadius: 22,
    paddingTop: 10,
    paddingBottom: 4,
    alignItems: 'center',
    width: 44,
  },
  dayLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.TEXT,
    marginBottom: 12,
  },
  dayLabelActive: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: COLORS.BACKGROUND,
    marginBottom: 8,
  },
  dateLabelInactive: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabelActive: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: '#157E4B',
  },
  dotGroup: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E5E5',
  },
  dotDark: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT,
  },
  timeSlotBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: SPACING.THREE,
    paddingHorizontal: SPACING.FOUR,
  },
  timeSlotLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeSlotValue: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  timeSlotWarning: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
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
    fontSize: 14,
    color: COLORS.TEXT,
    marginBottom: 2,
  },
  bottomBarTime: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.BACKGROUND,
  },
});
