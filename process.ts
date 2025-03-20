import chalk from 'chalk';
import { exec as execChildProcess } from 'child_process';
import { spawn } from 'node:child_process';
import process from 'node:process';
import { promisify } from 'util';

const execAsync = promisify(execChildProcess);

/**
 * Main function to run command in child process (spawn)
 * NOTE:
 *    In bash/zsh snippets, $ indicates a shell prompt, showing commands to run in a terminal.
 *    It’s a convention to distinguish commands from output.
 *    That’s why I use $ for all functions that run commands.
 *    It's not related with jQuery :)
 * @param command
 * @param cwd - working directory (default: current directory / process.cwd())
 * @param silent - if true, hides all stdout
 */
export async function $run(command: string, cwd: string = process.cwd(), silent: boolean = false): Promise<void> {
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve, _reject) => {
    const child = spawn(cmd, args, { cwd, stdio: silent ? 'ignore' : 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        // reject(`Failed [${command}]. Exit code ${code}`); <- for debugging purposes...
        console.log(chalk.redBright('⚑ Failed command:'), '$ ' + command, chalk.gray(cwd));
      }
    });
  });
}

/**
 * Run multiple commands using run fn
 */
export async function runBulk(commands: string[], cwd: string = process.cwd(), silent: boolean = false) {
  for (const command of commands.filter(Boolean)) {
    await $run(command, cwd, silent);
  }
}

/**
 * Run command in child process (spawn) with stdout and stderr
 */
export async function $(command: string, cwd: string = process.cwd()): Promise<{ stdout: string; stderr: string }> {
  // eslint-disable-next-line no-useless-catch
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    return { stdout, stderr };
  } catch (error) {
    throw error;
  }
}

/**
 * Show prompt dialog and run standard commands
 * @param promptFn - inquirer prompt function
 */
async function promptCommands(promptFn: () => Promise<{ cmd: string }>) {
  try {
    const answers = await promptFn();
    const { cmd } = answers;
    console.clear();
    await $run(cmd);
  } catch (e) {
    console.error(e);
  }
}

export { promptCommands };
