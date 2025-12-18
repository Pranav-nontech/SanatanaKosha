import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { searchContent, type SearchResult } from '@/services/contentService';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length > 0) {
      const searchResults = searchContent(text.trim());
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'module':
        return 'bookshelf';
      case 'submodule':
        return 'book-open-variant';
      case 'content':
        return 'text-box';
      default:
        return 'file-document';
    }
  };

  const handleResultPress = (result: SearchResult) => {
    if (result.type === 'module' && 'category' in result.item) {
      router.push({
        pathname: '/module-detail',
        params: { moduleId: result.item.id }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Search" subtitle="Find knowledge across all modules" />
      
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={colors.light.textTertiary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search scriptures, concepts, terms..."
          placeholderTextColor={colors.light.textTertiary}
          value={query}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <Pressable onPress={() => handleSearch('')} style={styles.clearButton}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.light.textTertiary}
            />
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.lg }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {query.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="magnify"
              size={64}
              color={colors.light.borderLight}
            />
            <Text style={styles.emptyTitle}>Search the Knowledge Base</Text>
            <Text style={styles.emptyDescription}>
              Search across Vedas, Upaniṣads, Purāṇas, Darśanas, and all scriptural content
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="file-search"
              size={64}
              color={colors.light.borderLight}
            />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptyDescription}>
              Try different keywords or browse modules directly
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </Text>
            {results.map((result, index) => (
              <Pressable
                key={`${result.type}-${index}`}
                style={({ pressed }) => [
                  styles.resultCard,
                  pressed && styles.resultCardPressed,
                ]}
                onPress={() => handleResultPress(result)}
              >
                <View style={styles.resultIcon}>
                  <MaterialCommunityIcons
                    name={getResultIcon(result.type) as any}
                    size={24}
                    color={colors.light.primary}
                  />
                </View>
                <View style={styles.resultContent}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultType}>{result.type.toUpperCase()}</Text>
                    <Text style={styles.resultModule}>{result.moduleName}</Text>
                  </View>
                  {'name' in result.item && (
                    <Text style={styles.resultTitle}>{result.item.name}</Text>
                  )}
                  {'title' in result.item && (
                    <Text style={styles.resultTitle}>{result.item.title}</Text>
                  )}
                  {'titleSanskrit' in result.item && result.item.titleSanskrit && (
                    <Text style={styles.resultSanskrit}>{result.item.titleSanskrit}</Text>
                  )}
                  {'nameSanskrit' in result.item && (
                    <Text style={styles.resultSanskrit}>{result.item.nameSanskrit}</Text>
                  )}
                  {'description' in result.item && (
                    <Text style={styles.resultDescription} numberOfLines={2}>
                      {result.item.description}
                    </Text>
                  )}
                  {'definition' in result.item && (
                    <Text style={styles.resultDescription} numberOfLines={2}>
                      {result.item.definition}
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.light.border,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.text,
    paddingVertical: spacing.md,
  },
  clearButton: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.md * 1.5,
    paddingHorizontal: spacing.xl,
  },
  resultCount: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.textSecondary,
    marginBottom: spacing.md,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
    ...shadows.sm,
  },
  resultCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.light.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  resultType: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.primary,
    backgroundColor: colors.light.accentLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  resultModule: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textTertiary,
  },
  resultTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: 2,
  },
  resultSanskrit: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.primary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  resultDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.textSecondary,
    lineHeight: typography.fontSize.sm * 1.4,
  },
});
