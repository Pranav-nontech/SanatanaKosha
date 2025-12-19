import { getSupabaseClient } from '@/template';

export type QueryMode = 'Seeker' | 'Scholar' | 'Practitioner' | 'Comparative';

export interface ChatMessage {
  id: string;
  user_id?: string;
  query_mode: QueryMode;
  user_query: string;
  bot_response: string;
  citations?: Citation[];
  created_at: string;
}

export interface Citation {
  text: string;
  reference: string;
  category: string;
}

export interface ChatResponse {
  response: string;
  citations: Citation[];
  mode: QueryMode;
}

export async function sendChatQuery(
  query: string,
  mode: QueryMode = 'Seeker'
): Promise<{ data: ChatResponse | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.functions.invoke('shastra-chat', {
      body: { query, mode },
    });

    if (error) {
      let errorMessage = error.message;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { data: null, error: errorMessage };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Failed to send query',
    };
  }
}

export async function getChatHistory(
  limit: number = 50
): Promise<{ data: ChatMessage[] | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Failed to fetch chat history',
    };
  }
}

export async function deleteChatHistory(): Promise<{ error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Not authenticated' };
    }

    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to delete chat history',
    };
  }
}

export const queryModes: { value: QueryMode; label: string; description: string }[] = [
  {
    value: 'Seeker',
    label: 'Seeker',
    description: 'Simplified explanations for general understanding',
  },
  {
    value: 'Scholar',
    label: 'Scholar',
    description: 'Academic depth with raw citations and cross-references',
  },
  {
    value: 'Practitioner',
    label: 'Practitioner',
    description: 'Ritual logic with niyama, niṣedha, and practice guidance',
  },
  {
    value: 'Comparative',
    label: 'Comparative',
    description: 'Darśana-wise comparison tables and philosophical analysis',
  },
];
