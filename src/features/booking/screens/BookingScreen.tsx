import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import Animated, { LinearTransition, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { COLORS, FONTS, IMAGES, SPACING } from '@/constants/theme';
import { scale, fontScale } from '@/utils/responsive';
import { BOOKINGS, BookingData } from '@/constants/data';
import BookingCard from '@/features/booking/components/BookingCard';
import BookingOptionsModal from '@/features/booking/components/BookingOptionsModal';
import CancelBookingModal from '@/features/booking/components/CancelBookingModal';

let globalHasStartedBooking = false;

export default function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedBookingPosition, setSelectedBookingPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [hasStartedBooking, setHasStartedBooking] = useState(globalHasStartedBooking);

  const startBooking = () => {
    globalHasStartedBooking = true;
    setHasStartedBooking(true);
  };
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  const activeBookings = hasStartedBooking ? BOOKINGS.filter(b => b.status === activeTab) : [];
  const isEmpty = activeBookings.length === 0;

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.emptyIconContainer}>
          <Image 
            source={IMAGES.EMPTY_BOOKING} 
            style={{ width: scale(220), height: scale(134) }} 
            contentFit="contain" 
          />
        </View>

        <Text style={[styles.emptyTitle, { color: COLORS.TEXT }]}>{activeTab} booking empty</Text>
        <Text style={[styles.emptySubtitle, { color: '#666666' }]}>
          You didn't have any {activeTab.toLowerCase()} booking story here, please start your booking
        </Text>
      </View>

      <Animated.View entering={FadeInUp.duration(600).delay(200).springify()} style={styles.buttonWrapper}>
        <Pressable
          onPress={startBooking}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: COLORS.PRIMARY, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={[styles.ctaButtonText, { color: COLORS.BACKGROUND }]}>
            Start booking now
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.BACKGROUND }]}>
      <View style={[styles.header, { marginTop: insets.top + SPACING.THREE }]}>
        <Pressable
          onPress={startBooking}
          style={({ pressed }) => [
            styles.plusButton,
            { borderColor: COLORS.BORDER, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Plus color={COLORS.TEXT} size={24} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: COLORS.TEXT }]}>Booking</Text>
        <View style={{ width: 56 }} />
      </View>

      <View style={[styles.segmentContainer, { backgroundColor: COLORS.BORDER }]}>
        <Animated.View 
          layout={LinearTransition.springify()} 
          style={[
            styles.segmentTabActive, 
            { 
              backgroundColor: COLORS.PRIMARY, 
              position: 'absolute', 
              top: scale(4),
              bottom: scale(4),
              left: activeTab === 'Upcoming' ? scale(4) : '50%',
              right: activeTab === 'Upcoming' ? '50%' : scale(4),
              borderRadius: scale(22)
            }
          ]} 
        />
        <Pressable
          style={styles.segmentTab}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Upcoming' ? [styles.segmentTextActive, { color: COLORS.BACKGROUND }] : { color: COLORS.PRIMARY },
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={styles.segmentTab}
          onPress={() => setActiveTab('Completed')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Completed' ? [styles.segmentTextActive, { color: COLORS.BACKGROUND }] : { color: COLORS.PRIMARY },
            ]}
          >
            Completed
          </Text>
        </Pressable>
      </View>

      {isEmpty ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={activeBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <BookingCard 
              booking={item} 
              index={index}
              onOptionsPress={(position) => {
                setSelectedBookingId(item.id);
                setSelectedBookingPosition(position);
              }} 
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BookingOptionsModal
        visible={!!selectedBookingId}
        position={selectedBookingPosition}
        onClose={() => {
          setSelectedBookingId(null);
          setSelectedBookingPosition(null);
        }}
        onCancelPress={() => {
          setBookingToCancel(selectedBookingId);
          setSelectedBookingId(null);
          setSelectedBookingPosition(null);
          setIsCancelModalVisible(true);
        }}
        onReschedulePress={() => {
          if (selectedBookingId) {
            router.push(`/booking/reschedule/${selectedBookingId}`);
            setSelectedBookingId(null);
            setSelectedBookingPosition(null);
          }
        }}
      />

      <CancelBookingModal
        visible={isCancelModalVisible}
        onClose={() => {
          setIsCancelModalVisible(false);
          setBookingToCancel(null);
        }}
        onConfirm={() => {
          console.log('Confirmed Cancellation for', bookingToCancel);
          setIsCancelModalVisible(false);
          setBookingToCancel(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.THREE,
    marginBottom: SPACING.THREE,
    height: scale(56),
  },
  headerTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(20),
    lineHeight: fontScale(24),
  },
  plusButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.THREE,
    borderRadius: scale(44),
    height: scale(53),
    padding: scale(4),
    marginBottom: SPACING.THREE,
  },
  segmentTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(26.5),
  },
  segmentTabActive: {
  },
  segmentText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: fontScale(15.4),
  },
  segmentTextActive: {
    fontFamily: FONTS.SEMI_BOLD,
  },
  listContent: {
    paddingHorizontal: SPACING.THREE,
    paddingBottom: SPACING.FIVE,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.THREE,
    paddingBottom: SPACING.FOUR,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(-40),
  },
  emptyIconContainer: {
    marginBottom: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(22),
    textAlign: 'center',
    marginBottom: scale(12),
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
    textAlign: 'center',
    paddingHorizontal: SPACING.TWO,
  },
  buttonWrapper: {
    width: '100%',
    paddingBottom: scale(16),
  },
  ctaButton: {
    height: scale(52),
    borderRadius: scale(26),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ctaButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
  },
});
