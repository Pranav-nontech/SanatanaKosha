import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import type { Citation } from '@/services/chatService';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  citations?: Citation[];
  mode?: string;
}

export function MessageBubble({ message, isUser, citations, mode }: MessageBubbleProps) {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      {!isUser && (
        <View style={styles.botHeader}>
          <MaterialCommunityIcons name="robot" size={20} color={colors.light.primary} />
          <Text style={styles.botLabel}>Śāstra Scholar</Text>
          {mode && (
            <View style={styles.modeBadge}>
              <Text style={styles.modeText}>{mode}</Text>
            </View>
          )}
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
          {message.replace(/🔹 \*\*Source: Database\*\*\n\n|🔸 \*\*Source: AI Training\*\*\n\n/g, '')}
        </Text>
      </View>

      {!isUser && (message.includes('🔹') || message.includes('🔸')) && (
        <View style={styles.sourceIndicator}>
          <MaterialCommunityIcons
            name={message.includes('🔹') ? 'database' : 'brain'}
            size={12}
            color={message.includes('🔹') ? colors.light.success : colors.light.accent}
          />
          <Text style={styles.sourceText}>
            {message.includes('🔹') ? 'From Śāstra Database' : 'From AI Training'}
          </Text>
        </View>
      )}

      {citations && citations.length > 0 && (
        <View style={styles.citationsContainer}>
          <Text style={styles.citationsTitle}>Citations:</Text>
          {citations.map((citation, index) => (
            <View key={index} style={styles.citationItem}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={14}
                color={colors.light.secondary}
                style={styles.citationIcon}
              />
              <View style={styles.citationContent}>
                <Text style={styles.citationText}>{citation.text}</Text>
                <Text style={styles.citationReference}>{citation.reference}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  botHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  botLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.primary,
    marginLeft: spacing.xs,
  },
  modeBadge: {
    backgroundColor: colors.light.accentLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  modeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.secondary,
  },
  bubble: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  userBubble: {
    backgroundColor: colors.light.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.light.surface,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  userText: {
    color: colors.light.surface,
  },
  botText: {
    color: colors.light.text,
  },
  citationsContainer: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  citationsTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.textTertiary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  citationItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  citationIcon: {
    marginRight: spacing.xs,
    marginTop: 2,
  },
  citationContent: {
    flex: 1,
  },
  citationText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.text,
  },
  citationReference: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    fontStyle: 'italic',
  },
  sourceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  sourceText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.textTertiary,
    marginLeft: spacing.xs,
  },
});
