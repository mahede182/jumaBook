import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, LayoutAnimation } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function Accordion({ title, children, defaultExpanded = false }: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        {expanded ? (
          <ChevronUp size={20} color={COLORS.TEXT} />
        ) : (
          <ChevronDown size={20} color={COLORS.TEXT} />
        )}
      </Pressable>
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: SPACING.FOUR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    color: COLORS.TEXT,
  },
  content: {
    paddingTop: SPACING.THREE,
  },
});
