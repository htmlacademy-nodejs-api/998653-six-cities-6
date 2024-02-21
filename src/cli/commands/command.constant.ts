export const DIR_PATH = 'src/cli/commands';
export const FILE_EXTENSION = '.command.ts';
export const DEFAULT_DB_PORT = '27020';
export const DEFAULT_USER_PASSWORD = 'test';

export const Command = {
  DoubleDash: '--',
  Help: '--help',
  Version: '--version',
  Import: '--import',
  Generate: '--generate',
} as const;
