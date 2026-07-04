import React from 'react';
import { ViewStyle } from 'react-native';
import { BookingData } from '@/constants/data';

export interface BookingCardProps {
  booking: BookingData;
  onOptionsPress?: (position: { x: number; y: number; width: number; height: number }) => void;
  style?: ViewStyle;
  index?: number;
}

export interface BookingOptionsModalProps {
  visible: boolean;
  position: { x: number; y: number; width: number; height: number } | null;
  onClose: () => void;
  onCancelPress?: () => void;
  onReschedulePress?: () => void;
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export interface BottomBarProps {
  price: string;
  onEditPress?: () => void;
}

export interface DetailsHeroProps {
  title: string;
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
}

export interface HostCardProps {
  host: {
    name: string;
    rating: number;
    isSuperhost: boolean;
    yearsHosting: number;
  };
}

export interface BulletListProps {
  items: string[];
}

export interface CancelBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
