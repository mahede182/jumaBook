import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions, Platform } from 'react-native';
import { BookingOptionsModalProps } from '../@types/booking.type';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function BookingOptionsModal({
  visible,
  position,
  onClose,
  onCancelPress,
  onReschedulePress,
}: BookingOptionsModalProps) {
  
  // Calculate absolute position
  const getPopoverStyle = () => {
    if (!position) return {};
    
    // Standard margin from the edge of the screen
    const edgeMargin = SPACING.THREE;
    
    // Position it below the button
    const top = position.y + position.height + (Platform.OS === 'ios' ? 0 : 8); // adjustments for platform measurement differences
    
    // Align to the right side, giving it comfortable spacing from the edge
    const right = Math.max(SPACING.FIVE, SCREEN_WIDTH - (position.x + position.width - 8));

    return {
      position: 'absolute' as const,
      top,
      right,
      minWidth: 150,
    };
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.popover, getPopoverStyle()]}>
              <Pressable
                style={({ pressed }) => [styles.optionRow, pressed && styles.optionPressed]}
                onPress={() => {
                  onClose();
                  onCancelPress?.();
                }}
              >
                <Text style={styles.optionText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.optionRow, pressed && styles.optionPressed]}
                onPress={() => {
                  onClose();
                  onReschedulePress?.();
                }}
              >
                <Text style={styles.optionText}>Reschedule</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // No background color for a cleaner popover look, or a very light shadow
    // We'll keep a completely transparent overlay to just capture outside taps
  },
  popover: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    paddingVertical: SPACING.ONE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  optionRow: {
    paddingVertical: 10,
    paddingHorizontal: SPACING.FOUR,
  },
  optionPressed: {
    backgroundColor: COLORS.BACKGROUND_ELEMENT,
  },
  optionText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
    color: COLORS.TEXT,
    textAlign: 'left', // Aligned left per typical popover design
  },
});
