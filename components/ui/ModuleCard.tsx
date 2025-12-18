import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import type { Module } from '@/services/contentService';

interface ModuleCardProps {
  module: Module;
  onPress: () => void;
}

export function ModuleCard({ module, onPress }: ModuleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={module.icon as any}
          size={32}
          color={colors.light.primary}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sanskrit}>{module.nameSanskrit}</Text>
        <Text style={styles.title}>{module.name}</Text>
        <Text style={styles.subtitle}>{module.nameEn}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {module.description}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={colors.light.textTertiary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    ...shadows.sm,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.light.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  sanskrit: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textTertiary,
    lineHeight: typography.fontSize.sm * 1.4,
  },
});
