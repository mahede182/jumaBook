import { Stack } from 'expo-router';
import React from 'react';
import RescheduleScreen from '@/features/booking/screens/RescheduleScreen';

export default function RescheduleRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RescheduleScreen />
    </>
  );
}
