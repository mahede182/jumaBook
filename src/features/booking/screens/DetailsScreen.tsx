import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { COLORS, FONTS } from '@/constants/theme';
import { BOOKINGS } from '@/constants/data';
import DetailsHero from '@/features/booking/components/details/DetailsHero';
import KeyInfo from '@/features/booking/components/details/KeyInfo';
import HostCard from '@/features/booking/components/details/HostCard';
import Accordion from '@/features/booking/components/details/Accordion';
import Itinerary from '@/features/booking/components/details/Itinerary';
import Reviews from '@/features/booking/components/details/Reviews';
import MeetingPoint from '@/features/booking/components/details/MeetingPoint';
import BottomBar from '@/features/booking/components/details/BottomBar';
import BulletList from '@/features/booking/components/details/BulletList';
import KnowBeforeYouGo from '@/features/booking/components/details/KnowBeforeYouGo';

const highlightsData = [
  'Begin your day from Sydney on a relaxed, small-group tour to Hunter Valley, savor boutique wine tastings, and enjoy expert commentary on local vineyards.',
  'Enjoy a gourmet lunch at Cypress Lakes with artisan baguettes, crisp salads, hearty pies & a local cheese platter that perfectly complements every bite.',
  'Ride comfortably in an air-conditioned minibus with curated Sydney pick-up & drop-off points for a truly seamless, memorable full-day wine tour experience.'
];

const inclusionData = [
  'Full-day wine-tasting tour in Hunter Valley',
  'Small group of up to 14 people',
  'Wine tastings at 3-4 boutique wineries',
  'Lunch options at Cypress Lakes: choice of baguettes, salads, pies, fish, chicken, burgers, and chips; served with coffee, tea, or soft drink',
  'Local produce cheese-tasting platter'
];

const exclusionsData = [
  'Beverages and snacks not indicated within inclusions',
  'Additional wine purchases'
];

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  const host = {
    name: 'Juma Khamas',
    rating: parseFloat(booking.rating) || 4.95,
    isSuperhost: true,
    yearsHosting: 5,
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
            <BulletList items={highlightsData} />
          </Accordion>

          <Accordion title="Inclusion" defaultExpanded>
            <BulletList items={inclusionData} />
          </Accordion>

          <Accordion title="Itinerary" defaultExpanded>
            <Itinerary />
          </Accordion>

          <Accordion title="Exclusions" defaultExpanded>
            <BulletList items={exclusionsData} />
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
