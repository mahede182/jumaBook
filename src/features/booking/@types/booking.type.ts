import { ViewStyle } from 'react-native';
import { BookingData } from '@/constants/data';

export interface BookingCardProps {
  booking: BookingData;
  onOptionsPress?: (position: { x: number; y: number; width: number; height: number }) => void;
  style?: ViewStyle;
}

export interface BookingOptionsModalProps {
  visible: boolean;
  position: { x: number; y: number; width: number; height: number } | null;
  onClose: () => void;
  onCancelPress?: () => void;
  onReschedulePress?: () => void;
}
