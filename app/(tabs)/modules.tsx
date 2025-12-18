import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, ModuleCard } from '@/components';
import { colors, spacing } from '@/constants/theme';
import { getAllModules } from '@/services/contentService';

export default function ModulesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const modules = getAllModules();

  return (
    <View style={styles.container}>
      <Header title="All Modules" subtitle="Explore the Knowledge Base" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.lg }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onPress={() => router.push({
              pathname: '/module-detail',
              params: { moduleId: module.id }
            })}
          />
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
});
