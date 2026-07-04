import { COLORS, FONTS } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import { KNOW_BEFORE_YOU_GO_DATA } from '@/constants/data';
import BulletList from './BulletList';

export default function KnowBeforeYouGo() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>What to bring</Text>
      <BulletList items={KNOW_BEFORE_YOU_GO_DATA.bring} />

      <Text style={[styles.sectionHeader, { marginTop: 16 }]}>What's not allowed</Text>
      <BulletList items={KNOW_BEFORE_YOU_GO_DATA.notAllowed} />

      <Text style={[styles.sectionHeader, { marginTop: 16 }]}>Additional information</Text>
      <BulletList items={KNOW_BEFORE_YOU_GO_DATA.additional} />
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
