import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { COLORS, FONTS, IMAGES, SPACING } from '@/constants/theme';
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
    <View style={styles.emptyContent}>
      <View style={styles.emptyIconContainer}>
        <Image 
          source={IMAGES.EMPTY_BOOKING} 
          style={{ width: 306, height: 186 }} 
          contentFit="contain" 
        />
      </View>

      <Text style={[styles.emptyTitle, { color: COLORS.TEXT }]}>{activeTab} booking empty</Text>
      <Text style={[styles.emptySubtitle, { color: COLORS.TEXT }]}>
        You didn't have any {activeTab.toLowerCase()} booking story here, please start your booking
      </Text>

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
        <Pressable
          style={[
            styles.segmentTab,
            activeTab === 'Upcoming' && [styles.segmentTabActive, { backgroundColor: COLORS.PRIMARY }],
          ]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Upcoming' ? [styles.segmentTextActive, { color: COLORS.BACKGROUND }] : { color: COLORS.TEXT },
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.segmentTab,
            activeTab === 'Completed' && [styles.segmentTabActive, { backgroundColor: COLORS.PRIMARY }],
          ]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Completed' ? [styles.segmentTextActive, { color: COLORS.BACKGROUND }] : { color: COLORS.TEXT },
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
          renderItem={({ item }) => (
            <BookingCard 
              booking={item} 
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
          // TODO: dispatch cancel action or handle via RTK Query mutation
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
    height: 56,
  },
  headerTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 20,
    lineHeight: 24,
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.THREE,
    borderRadius: 44,
    height: 53,
    padding: 4,
    marginBottom: SPACING.THREE,
  },
  segmentTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26.5,
  },
  segmentTabActive: {
  },
  segmentText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 15.4,
  },
  segmentTextActive: {
    fontFamily: FONTS.SEMI_BOLD,
  },
  listContent: {
    paddingHorizontal: SPACING.THREE,
    paddingBottom: SPACING.FIVE,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.THREE,
    marginTop: -80, // visual adjustment to match figma layout centering
  },
  emptyIconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 28,
    lineHeight: 30.8,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 44,
    paddingHorizontal: SPACING.TWO,
  },
  ctaButton: {
    height: 56,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ctaButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
  },
});
