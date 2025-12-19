import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { queryModes, type QueryMode } from '@/services/chatService';

interface ModeSelectorProps {
  selectedMode: QueryMode;
  onModeChange: (mode: QueryMode) => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Query Mode:</Text>
      <View style={styles.modesContainer}>
        {queryModes.map((mode) => (
          <Pressable
            key={mode.value}
            style={({ pressed }) => [
              styles.modeButton,
              selectedMode === mode.value && styles.modeButtonActive,
              pressed && styles.modeButtonPressed,
            ]}
            onPress={() => onModeChange(mode.value)}
          >
            <Text
              style={[
                styles.modeButtonText,
                selectedMode === mode.value && styles.modeButtonTextActive,
              ]}
            >
              {mode.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.description}>
        {queryModes.find((m) => m.value === selectedMode)?.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.sm,
  },
  modesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  modeButton: {
    backgroundColor: colors.light.background,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    margin: spacing.xs,
  },
  modeButtonActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  modeButtonPressed: {
    opacity: 0.7,
  },
  modeButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.text,
  },
  modeButtonTextActive: {
    color: colors.light.surface,
  },
  description: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    marginTop: spacing.sm,
    lineHeight: typography.fontSize.xs * 1.5,
  },
});
