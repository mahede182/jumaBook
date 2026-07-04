import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BOOKINGS, BOOKING_DETAILS_MOCK } from '@/constants/data';
import { COLORS, FONTS } from '@/constants/theme';
import Accordion from '@/features/booking/components/details/Accordion';
import BottomBar from '@/features/booking/components/details/BottomBar';
import BulletList from '@/features/booking/components/details/BulletList';
import DetailsHero from '@/features/booking/components/details/DetailsHero';
import HostCard from '@/features/booking/components/details/HostCard';
import Itinerary from '@/features/booking/components/details/Itinerary';
import KeyInfo from '@/features/booking/components/details/KeyInfo';
import KnowBeforeYouGo from '@/features/booking/components/details/KnowBeforeYouGo';
import MeetingPoint from '@/features/booking/components/details/MeetingPoint';
import Reviews from '@/features/booking/components/details/Reviews';

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  const host = {
    ...BOOKING_DETAILS_MOCK.host,
    rating: parseFloat(booking.rating) || 4.95,
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <DetailsHero
          title={booking.title}
          rating={parseFloat(booking.rating) || 4.95}
          reviewsCount={parseInt(booking.reviewsCount.replace(/,/g, '')) || 617}
          imageUrl={booking.imageUrl}
        />

        <View style={styles.contentPadding}>
          <KeyInfo />
          <HostCard host={host} />

          <Accordion title="Highlights" defaultExpanded>
            <BulletList items={BOOKING_DETAILS_MOCK.highlights} />
          </Accordion>

          <Accordion title="Inclusion" defaultExpanded>
            <BulletList items={BOOKING_DETAILS_MOCK.inclusions} />
          </Accordion>

          <Accordion title="Itinerary" defaultExpanded>
            <Itinerary />
          </Accordion>

          <Accordion title="Exclusions" defaultExpanded>
            <BulletList items={BOOKING_DETAILS_MOCK.exclusions} />
          </Accordion>

          <Accordion title="Cancellation policy" defaultExpanded>
            <Text style={styles.policyText}>
              These tickets can't be cancelled. However, they can be rescheduled up to 24 hours before the experience begins.
            </Text>
          </Accordion>

          <Accordion title="Know before you go" defaultExpanded>
            <KnowBeforeYouGo />
          </Accordion>

          <Reviews />

          <MeetingPoint />
        </View>

      </ScrollView>

      <BottomBar
        price={booking.discountedPrice}
        onEditPress={() => router.push(`/booking/reschedule/${booking.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  policyText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
});
