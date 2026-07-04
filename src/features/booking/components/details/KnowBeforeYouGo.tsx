import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';
import BulletList from './BulletList';

export default function KnowBeforeYouGo() {
  const bringData = [
    'Bring a refillable water bottle, photo ID, sunscreen, hat, sunglasses, comfortable shoes, all-weather clothing, camera, spending money to buy local produce, and a small day pack of 5-7 kg.'
  ];

  const notAllowedData = [
    'Large luggage, outside food, and personal beverages are not allowed on this tour.'
  ];

  const additionalData = [
    'The full-day tour runs from 7am to 6:30pm and is not recommended for guests under 3 years old.',
    "Infants aged under 4 years may travel on an adult's lap; a child ticket is required; protective seats are available on request.",
    'Winery stops may change; enjoy 3 tastings from estates rotating between Irongate Estate, Savannah Estate, Constable, Tempus Two / Roche, Mount View, Tintilla Estate, Gun Dog, and Mistletoe.',
    'Lunch is provided; extra dining in Hunter Valley Village is at your expense.',
    'Hunter Valley Gardens entry is not included; the tour stops only near the village.',
    'Please inform of any dietary needs at the time of booking.',
    'Service may be refused if passengers appear intoxicated. No refunds if asked to leave the tour.'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>What to bring</Text>
      <BulletList items={bringData} />

      <Text style={[styles.sectionHeader, { marginTop: 16 }]}>What's not allowed</Text>
      <BulletList items={notAllowedData} />

      <Text style={[styles.sectionHeader, { marginTop: 16 }]}>Additional information</Text>
      <BulletList items={additionalData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionHeader: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
    color: COLORS.TEXT,
    marginBottom: 8,
  },
});
