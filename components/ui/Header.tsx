import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, onBackPress, rightAction }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.content}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.light.text}
            />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
        </View>
        
        <View style={styles.rightAction}>
          {rightAction}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  placeholder: {
    width: 40,
    marginRight: spacing.xs,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    marginTop: 2,
  },
  rightAction: {
    width: 40,
    marginLeft: spacing.xs,
  },
});
