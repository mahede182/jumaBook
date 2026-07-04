import { Modal, Pressable, Image as RNImage, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { COLORS, FONTS, IMAGES } from '@/constants/theme';
import { CancelBookingModalProps } from '../@types/booking.type';
import { scale, fontScale } from '@/shared/utils/responsive';

export default function CancelBookingModal({ visible, onClose, onConfirm }: CancelBookingModalProps) {
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
            <View style={styles.modalContent}>

              <View style={styles.topSection}>
                <RNImage
                  source={IMAGES.ALERT}
                  style={styles.alertIcon}
                  resizeMode="contain"
                />

                <Text style={styles.title}>Cancellation policy</Text>
                <Text style={styles.subtitle}>
                  If you cancel this trips, you will need to maintain the Policy
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.bottomSection}>
                <Text style={styles.sectionTitle}>Requirement</Text>

                <View style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>
                    Full refund available if canceled within 2 days before the visiting date start.
                  </Text>
                </View>
                <View style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>
                    50% refund if canceled 3-4 days before the visiting date start.
                  </Text>
                </View>
                <View style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>
                    No refund for cancellations within 5 days before the visiting date start.
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { opacity: pressed ? 0.8 : 1 }
                  ]}
                  onPress={onConfirm}
                >
                  <Text style={styles.primaryButtonText}>Confirm to Cancel</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    { opacity: pressed ? 0.8 : 1 }
                  ]}
                  onPress={onClose}
                >
                  <Text style={styles.secondaryButtonText}>Go back</Text>
                </Pressable>
              </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    maxWidth: '90%',
    width: scale(345),
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: scale(24),
    overflow: 'hidden',
  },
  topSection: {
    paddingTop: scale(16),
    paddingBottom: scale(24),
    paddingHorizontal: scale(24),
    alignItems: 'center',
  },
  alertIcon: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(20),
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(20),
    color: COLORS.TEXT,
    marginBottom: scale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#666666',
    textAlign: 'center',
    lineHeight: fontScale(22),
    paddingHorizontal: scale(8),
  },
  divider: {
    height: 2,
    backgroundColor: '#f1f1f1',
    width: '100%',
  },
  bottomSection: {
    paddingTop: scale(24),
    paddingBottom: scale(24),
    paddingHorizontal: scale(24),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.TEXT,
    marginBottom: scale(16),
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: scale(12),
    paddingLeft: scale(12),
    paddingRight: scale(8),
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#777777',
    marginTop: 8,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: fontScale(14),
    color: '#777777',
    lineHeight: fontScale(20),
  },
  primaryButton: {
    width: '100%',
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(12),
  },
  primaryButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.BACKGROUND,
  },
  secondaryButton: {
    width: '100%',
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: COLORS.BACKGROUND_ELEMENT,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(12),
  },
  secondaryButtonText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: fontScale(16),
    color: COLORS.PRIMARY,
  },
});
