import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { MessageBubble, ModeSelector } from '@/components/chat';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { sendChatQuery, type QueryMode, type ChatMessage } from '@/services/chatService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  citations?: any[];
  mode?: QueryMode;
  timestamp: Date;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [mode, setMode] = useState<QueryMode>('Seeker');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Namaste! I am your Śāstra Scholar, trained exclusively on authentic Hindu scriptures and sampradāya traditions. Ask me about Vedas, Upaniṣads, Purāṇas, Darśanas, or any concept from Sanātana Dharma.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: query.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    // Send query to backend
    const { data, error } = await sendChatQuery(query.trim(), mode);

    setLoading(false);

    if (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    if (data) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        citations: data.citations,
        mode: data.mode,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Ask Scholar"
        subtitle="Śāstra-based Knowledge Assistant"
        rightAction={
          <Pressable onPress={() => {}} style={styles.iconButton}>
            <MaterialCommunityIcons name="information" size={24} color={colors.light.primary} />
          </Pressable>
        }
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: spacing.md },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <ModeSelector selectedMode={mode} onModeChange={setMode} />

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              citations={message.citations}
              mode={message.mode}
            />
          ))}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.light.primary} />
              <Text style={styles.loadingText}>Consulting śāstra database...</Text>
            </View>
          )}
        </ScrollView>

        <View
          style={[
            styles.inputContainer,
            { paddingBottom: Math.max(insets.bottom, spacing.md) },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder={`Ask in ${mode} mode...`}
            placeholderTextColor={colors.light.textTertiary}
            value={query}
            onChangeText={setQuery}
            multiline
            maxLength={500}
            editable={!loading}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              (!query.trim() || loading) && styles.sendButtonDisabled,
              pressed && styles.sendButtonPressed,
            ]}
            onPress={handleSend}
            disabled={!query.trim() || loading}
          >
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={query.trim() && !loading ? colors.light.surface : colors.light.textTertiary}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  content: {
    flex: 1,
  },
  iconButton: {
    padding: spacing.xs,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.borderLight,
  },
  loadingText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.textSecondary,
    marginLeft: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.light.background,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.light.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.text,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.light.border,
  },
  sendButtonPressed: {
    opacity: 0.7,
  },
});
