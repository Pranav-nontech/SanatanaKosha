import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import type { ContentItem } from '@/services/contentService';

interface ContentCardProps {
  content: ContentItem;
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <View style={styles.card}>
      {content.titleSanskrit && (
        <Text style={styles.sanskrit}>{content.titleSanskrit}</Text>
      )}
      <Text style={styles.title}>{content.title}</Text>
      
      {content.category && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{content.category}</Text>
        </View>
      )}
      
      <Text style={styles.definition}>{content.definition}</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.metaSection}>
        <Text style={styles.metaLabel}>Scriptural Reference:</Text>
        <Text style={styles.metaValue}>{content.scripturalReference}</Text>
      </View>
      
      {content.darsanaView && (
        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>Darśana View:</Text>
          <Text style={styles.metaValue}>{content.darsanaView}</Text>
        </View>
      )}
      
      {content.implication && (
        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>Implication:</Text>
          <Text style={styles.metaValue}>{content.implication}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    ...shadows.sm,
  },
  sanskrit: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.light.accentLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.secondary,
    textTransform: 'uppercase',
  },
  definition: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.text,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light.border,
    marginVertical: spacing.md,
  },
  metaSection: {
    marginBottom: spacing.sm,
  },
  metaLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.secondary,
    marginBottom: spacing.xs,
  },
  metaValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
});
