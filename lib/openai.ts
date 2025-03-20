import { OPENAI_API_KEY, OPENAI_PROJECT_ID } from '@/config/const';
import OpenAI from 'openai';

/**
 * Create a new OpenAI client instance (singleton).
 */
export const createOpenAIClient = (() => {
  let instance: OpenAI | null = null;

  return () => {
    if (!instance) {
      instance = new OpenAI({
        project: OPENAI_PROJECT_ID,
        apiKey: OPENAI_API_KEY,
      });
    }

    return instance;
  };
})();

export const openai = createOpenAIClient();
