import { resolvedPath } from '@/config/const';
import { $ } from '@/process';
import chalk from 'chalk';

const excludeShared = (output: string) => output.split('\n').filter((file) => file && !file.startsWith('src/shared-'));

export const getChangedFiles = async () => {
  const { stdout: diffOutput } = await $('git diff --name-only', resolvedPath.root);
  const { stdout: untrackedOutput } = await $('git ls-files --others --exclude-standard', resolvedPath.root);
  const { stdout: stagedOutput } = await $('git diff --cached --name-only', resolvedPath.root);

  const changedFiles = excludeShared(diffOutput);
  const untrackedFiles = excludeShared(untrackedOutput);
  const stagedFiles = excludeShared(stagedOutput);

  const allFiles = [...new Set([...changedFiles, ...untrackedFiles, ...stagedFiles])];

  return allFiles.map((file) => ({
    name: file,
    value: file,
    checked: stagedFiles.includes(file),
  }));
};

export const findDirtyFiles = async () => {
  const files = await getChangedFiles();
  const fileList = files.map(({ name }) => chalk.green(`  ${name}`)).join('\n');

  console.log(chalk.blue(`✏️ Changed files (${files.length}): `), fileList, '\n');

  if (!files.length) console.log('No changed files to select.');

  return files;
};
