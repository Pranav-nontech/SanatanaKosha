import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const ONSPACE_AI_API_KEY = Deno.env.get('ONSPACE_AI_API_KEY') ?? '';
const ONSPACE_AI_BASE_URL = Deno.env.get('ONSPACE_AI_BASE_URL') ?? '';

interface ChatRequest {
  query: string;
  mode: 'Seeker' | 'Scholar' | 'Practitioner' | 'Comparative';
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user from JWT
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    const { query, mode = 'Seeker' }: ChatRequest = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[Shastra Chat] User: ${user?.id}, Mode: ${mode}, Query: ${query}`);

    // Step 1: Retrieve relevant context from database
    const context = await retrieveRelevantContext(supabaseClient, query);

    const hasDbContext = context.sections.length > 0 || context.concepts.length > 0;
    const source = hasDbContext ? 'database' : 'ai_training';

    // Step 2: Build prompt (hybrid: database context OR AI knowledge fallback)
    const prompt = buildPrompt(query, mode, context, hasDbContext);

    console.log(`[Shastra Chat] Source: ${source}, Retrieved ${context.sections.length} sections, ${context.concepts.length} concepts`);

    // Step 3: Call OnSpace AI
    const aiResponse = await callOnSpaceAI(prompt);

    // Step 4: Extract citations and add source indicator
    const citations = extractCitations(context);
    const sourceIndicator = hasDbContext ? '🔹 **Source: Database**' : '🔸 **Source: AI Training**';
    const responseWithSource = `${sourceIndicator}\n\n${aiResponse}`;

    const result = {
      response: responseWithSource,
      citations,
      mode,
      source,
    };

    // Step 5: Save to chat history
    if (user) {
      await supabaseClient.from('chat_messages').insert({
        user_id: user.id,
        query_mode: mode,
        user_query: query,
        bot_response: responseWithSource,
        citations,
        retrieved_sources: { ...context, source },
      });
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[Shastra Chat] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function retrieveRelevantContext(supabase: any, query: string) {
  const queryLower = query.toLowerCase();
  const searchTerms = extractKeyTerms(queryLower);

  // Search text sections
  const { data: sections } = await supabase
    .from('text_sections')
    .select(`
      *,
      texts (
        name,
        name_iast,
        category,
        authority_level
      ),
      commentaries (
        acharya,
        sampradaya,
        interpretation_summary
      )
    `)
    .or(`sanskrit_original.ilike.%${searchTerms[0]}%,transliteration.ilike.%${searchTerms[0]}%,translation_english.ilike.%${searchTerms[0]}%`)
    .order('texts(authority_level)', { ascending: true })
    .limit(5);

  // Search concepts
  const { data: concepts } = await supabase
    .from('concepts')
    .select(`
      *,
      concept_text_links (
        text_section_id,
        interpretation_type,
        text_sections (
          sanskrit_original,
          translation_english,
          texts (
            name,
            name_iast
          )
        )
      )
    `)
    .or(`sanskrit_term.ilike.%${searchTerms[0]}%,iast.ilike.%${searchTerms[0]}%,short_definition.ilike.%${searchTerms[0]}%`)
    .limit(3);

  return {
    sections: sections || [],
    concepts: concepts || [],
  };
}

function extractKeyTerms(query: string): string[] {
  // Remove common words
  const stopWords = ['what', 'is', 'the', 'according', 'to', 'how', 'does', 'in', 'of', 'and', 'or'];
  const words = query.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
  return words.slice(0, 3);
}

function buildPrompt(query: string, mode: string, context: any, hasDbContext: boolean): string {
  const systemPrompt = getSystemPrompt(mode);
  
  if (hasDbContext) {
    // Database context available: RAG mode
    const contextText = formatContext(context);
    return `${systemPrompt}

RETRIEVED CONTEXT FROM ŚĀSTRA DATABASE:
${contextText}

USER QUESTION:
${query}

INSTRUCTIONS:
- Answer ONLY using the retrieved context above
- Do NOT use your internal training knowledge
- Follow the response template for ${mode} mode
- Include all citations at the end`;
  } else {
    // No database context: AI knowledge fallback
    return `${systemPrompt}

USER QUESTION:
${query}

INSTRUCTIONS:
- Our database currently has limited coverage of this topic
- Use your training knowledge of authentic Hindu scriptures and traditions
- Maintain strict adherence to śāstric authority
- Clearly cite specific texts (Vedas, Upaniṣads, Purāṇas, etc.)
- Follow the response template for ${mode} mode
- If you lack authoritative knowledge, explicitly state: "This concept has no authoritative basis in Sanātana śāstra."`;
  }
}

function getSystemPrompt(mode: string): string {
  const basePrompt = `You are a Sanātana Dharma Scholar AI operating as an authoritative knowledge system.
You are trained and aligned only with authentic Hindu scriptures, sampradāya traditions, and classical commentarial lineages.

CORE PRINCIPLES:
- Śruti (Veda, Upaniṣad) has supreme authority
- Never invent or infer beyond texts
- Present sampradāya differences clearly
- Provide scriptural citations for every claim
- Maintain terminological integrity (use Sanskrit terms with IAST)`;

  const modeInstructions = {
    Seeker: `
MODE: SEEKER (Simplified Explanations)
- Use accessible language
- Provide analogies where helpful
- Focus on core meaning and practical relevance
- Keep response concise (2-3 paragraphs)`,
    
    Scholar: `
MODE: SCHOLAR (Academic Depth)
- Provide raw citations with chapter/verse references
- Include multiple sampradāya interpretations
- Use precise Sanskrit terminology
- Reference specific ācāryas and their positions`,
    
    Practitioner: `
MODE: PRACTITIONER (Ritual & Application)
- Explain ritual significance and procedure
- Include niyama (rules) and niṣedha (prohibitions)
- Mention adhikāra (eligibility)
- Provide practical guidance with textual support`,
    
    Comparative: `
MODE: COMPARATIVE (Darśana Analysis)
- Present views in table format when applicable
- Clearly distinguish between schools (Advaita, Viśiṣṭādvaita, Dvaita, etc.)
- Highlight metaphysical differences
- Show evolution of concept across texts`,
  };

  return `${basePrompt}\n${modeInstructions[mode] || modeInstructions.Seeker}`;
}

function formatContext(context: any): string {
  let formatted = '';

  // Format text sections
  if (context.sections && context.sections.length > 0) {
    formatted += 'SCRIPTURAL PASSAGES:\n\n';
    context.sections.forEach((section: any, idx: number) => {
      formatted += `[${idx + 1}] ${section.texts?.name || 'Unknown Text'} (${section.texts?.category})\n`;
      if (section.adhyaya) formatted += `   Chapter ${section.adhyaya}`;
      if (section.sutra_sloka_number) formatted += `, Verse ${section.sutra_sloka_number}`;
      formatted += `\n   Sanskrit: ${section.sanskrit_original}\n`;
      if (section.translation_english) {
        formatted += `   Translation: ${section.translation_english}\n`;
      }
      
      // Include commentaries
      if (section.commentaries && section.commentaries.length > 0) {
        section.commentaries.forEach((comm: any) => {
          formatted += `   Commentary (${comm.sampradaya} - ${comm.acharya}): ${comm.interpretation_summary}\n`;
        });
      }
      formatted += '\n';
    });
  }

  // Format concepts
  if (context.concepts && context.concepts.length > 0) {
    formatted += 'RELEVANT CONCEPTS:\n\n';
    context.concepts.forEach((concept: any) => {
      formatted += `• ${concept.sanskrit_term} (${concept.iast})\n`;
      formatted += `  Definition: ${concept.short_definition}\n`;
      formatted += `  Category: ${concept.category}\n`;
      if (concept.detailed_explanation) {
        formatted += `  Details: ${concept.detailed_explanation}\n`;
      }
      formatted += '\n';
    });
  }

  return formatted;
}

async function callOnSpaceAI(prompt: string): Promise<string> {
  const response = await fetch(`${ONSPACE_AI_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ONSPACE_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OnSpace AI Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

function extractCitations(context: any): any[] {
  const citations: any[] = [];

  if (context.sections) {
    context.sections.forEach((section: any) => {
      citations.push({
        text: section.texts?.name || 'Unknown',
        reference: section.sutra_sloka_number 
          ? `Chapter ${section.adhyaya || ''}, Verse ${section.sutra_sloka_number}`
          : `Chapter ${section.adhyaya || 'N/A'}`,
        category: section.texts?.category || 'Śāstra',
      });
    });
  }

  return citations;
}
