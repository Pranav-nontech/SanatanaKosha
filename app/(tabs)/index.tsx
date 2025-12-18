import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { getAllModules } from '@/services/contentService';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const modules = getAllModules();

  const categoryGroups = [
    { id: 'sruti', name: 'Śruti', icon: 'book-open-variant' },
    { id: 'smriti', name: 'Smṛti', icon: 'bookshelf' },
    { id: 'darsana', name: 'Darśana', icon: 'lightbulb-on' },
    { id: 'yoga', name: 'Yoga', icon: 'meditation' },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="om"
            size={40}
            color={colors.light.primary}
          />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Sanātana Kośa</Text>
            <Text style={styles.headerSubtitle}>सनातन कोश</Text>
          </View>
        </View>
        <Text style={styles.tagline}>
          The Traditional Knowledge Encyclopedia
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <View style={styles.categoryGrid}>
            {categoryGroups.map((category) => {
              const moduleCount = modules.filter(m => m.category === category.id).length;
              return (
                <Pressable
                  key={category.id}
                  style={({ pressed }) => [
                    styles.categoryCard,
                    pressed && styles.categoryCardPressed,
                  ]}
                  onPress={() => router.push('/modules')}
                >
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={32}
                    color={colors.light.primary}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{moduleCount} module{moduleCount !== 1 ? 's' : ''}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.featuredCard,
              pressed && styles.featuredCardPressed,
            ]}
            onPress={() => router.push({
              pathname: '/module-detail',
              params: { moduleId: 'sruti' }
            })}
          >
            <View style={styles.featuredIcon}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={28}
                color={colors.light.surface}
              />
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredSanskrit}>श्रुति</Text>
              <Text style={styles.featuredTitle}>Śruti - Revealed Scripture</Text>
              <Text style={styles.featuredDescription}>
                Explore the eternal Vedas and Upaniṣads, the foundation of Sanātana Dharma
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.featuredCard,
              pressed && styles.featuredCardPressed,
            ]}
            onPress={() => router.push({
              pathname: '/module-detail',
              params: { moduleId: 'darsana' }
            })}
          >
            <View style={styles.featuredIcon}>
              <MaterialCommunityIcons
                name="lightbulb-on"
                size={28}
                color={colors.light.surface}
              />
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredSanskrit}>दर्शन</Text>
              <Text style={styles.featuredTitle}>Darśana - Six Philosophies</Text>
              <Text style={styles.featuredDescription}>
                Discover the classical schools of Hindu philosophy and their profound insights
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.infoSection}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color={colors.light.primary}
            style={styles.infoIcon}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Śāstra-Anchored Knowledge</Text>
            <Text style={styles.infoText}>
              All content is sourced from authentic scriptures, traditional commentaries, and established sampradāya lineages.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    backgroundColor: colors.light.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerText: {
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
  },
  tagline: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    margin: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    ...shadows.sm,
  },
  categoryCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  categoryName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textTertiary,
    marginTop: spacing.xs,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    ...shadows.md,
  },
  featuredCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  featuredIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featuredContent: {
    flex: 1,
  },
  featuredSanskrit: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
    marginBottom: spacing.xs,
  },
  featuredTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  featuredDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.sm * 1.5,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: colors.light.accentLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.accent,
  },
  infoIcon: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.sm * 1.5,
  },
});
