import type { TicketType, Tools } from 'types/types';

import { findRootDir, getRootSrcPath, getToolDir } from '@/lib/paths';
import process from 'node:process';
import OpenAI from 'openai';

// OpenAI
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_PROJECT_ID = process.env.OPENAI_PROJECT_ID;
export const CHAT_MODEL: OpenAI.Chat.ChatModel = 'gpt-4';

// Paths to command executables
export const CMD_PATH: Record<Tools, `${string}/${string}`> = {
  git: 'cmd/git',
  ticket: 'cmd/ticket',
};

// Resolved paths for tools
export const resolvedPath = {
  root: findRootDir(),
  current: process.cwd(),
  commitMessageFile: getRootSrcPath('..', '.git', 'COMMIT_MESSAGE.txt'),
  ticket: {
    config: getToolDir('ticket', 'config.json'),
  },
  modules: {
    components: getRootSrcPath('shared-components'),
    front: getRootSrcPath('shared-front'),
    types: getRootSrcPath('shared-types'),
    web: getRootSrcPath('shared-web'),
  },
};

export const TASK_TYPES: TicketType[] = [
  {
    name: 'fix',
    icon: ':bug:',
    emoji: '🐛',
    description: 'fix a bug',
  },
  {
    name: 'feature',
    icon: ':sparkles:',
    emoji: '✨',
    description: 'new feature',
  },
  {
    name: 'hotfix',
    icon: ':ambulance:',
    emoji: '🚑',
    description: 'urgent fix',
  },
  {
    name: 'improvement',
    icon: ':chart_with_upwards_trend:',
    emoji: '📈',
    description: 'enhance feature',
  },
  {
    name: 'perf',
    icon: ':zap:',
    emoji: '⚡️',
    description: 'improve performance',
  },
  {
    name: 'refactor',
    icon: ':recycle:',
    emoji: '♻️',
    description: 'refactor code',
  },
  {
    name: 'style',
    icon: ':art:',
    emoji: '🎨',
    description: 'improve code style',
  },
];
