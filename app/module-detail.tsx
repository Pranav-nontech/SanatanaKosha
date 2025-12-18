import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, ContentCard } from '@/components';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { getModuleById } from '@/services/contentService';

export default function ModuleDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  
  const module = getModuleById(moduleId);

  if (!module) {
    return (
      <View style={styles.container}>
        <Header title="Error" onBackPress={() => router.back()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Module not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={module.name}
        subtitle={module.nameEn}
        onBackPress={() => router.back()}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.lg }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Text style={styles.sanskrit}>{module.nameSanskrit}</Text>
          <Text style={styles.description}>{module.description}</Text>
        </View>

        {module.subModules?.map((subModule) => (
          <View key={subModule.id} style={styles.subModuleSection}>
            <View style={styles.subModuleHeader}>
              <Text style={styles.subModuleSanskrit}>{subModule.nameSanskrit}</Text>
              <Text style={styles.subModuleTitle}>{subModule.name}</Text>
              <Text style={styles.subModuleDescription}>{subModule.description}</Text>
            </View>

            {subModule.content?.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  headerCard: {
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
  },
  sanskrit: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.primary,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  subModuleSection: {
    marginBottom: spacing.xl,
  },
  subModuleHeader: {
    marginBottom: spacing.md,
  },
  subModuleSanskrit: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.primary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  subModuleTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  subModuleDescription: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.md * 1.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.error,
  },
});
