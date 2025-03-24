import type { ChatCompletionMessageParam } from '@/types/openai';

import { OPENAI_API_KEY, OPENAI_CHAT_MODEL } from '@/config/const';
import OpenAI from 'openai';

/**
 * Primary instruction is to fix commit message grammar.
 * TODO: move instructions to a separate config file + create wrapper fixGrammar function + rename this function to sendPrompt
 * @param prompt
 * @param params
 */
export const fixGrammar = async (prompt: string, params?: string[]): Promise<string> => {
  if (!OPENAI_API_KEY) return prompt;

  const extraParams: ChatCompletionMessageParam[] = params?.map((param) => ({ role: 'system', content: param })) || [];

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: "you're a developer assistant and your primary instruction is to fix commit message grammar",
    },
    { role: 'system', content: 'generate fixed grammar according to best commit message practices' },
    { role: 'system', content: 'make minor changes if commit grammar is already good' },
    { role: 'system', content: 'output only fixed text without explanations' },
    { role: 'system', content: 'respect original structure with new lines (\\n)' },
    { role: 'system', content: 'you can skip dot "." in last sentence - it is useless' },
    ...extraParams,
    { role: 'user', content: prompt },
  ];

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: OPENAI_CHAT_MODEL,
    messages,
  });

  // Always return original text if no response
  return response.choices[0]?.message?.content || prompt;
};
