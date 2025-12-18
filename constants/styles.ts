import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from './theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardDark: {
    backgroundColor: colors.dark.surface,
  },
  
  // Text styles
  heading1: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
  },
  heading2: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
  },
  heading3: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  body: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.text,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  bodySecondary: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textTertiary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  // Sanskrit text
  sanskrit: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
    fontStyle: 'italic' as const,
    lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
  },
});
