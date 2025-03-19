import { spawn } from 'node:child_process';
import process from 'node:process';
import { exec as execChildProcess } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(execChildProcess);

/**
 * Main function to run command in child process (spawn)
 * @param command
 * @param cwd - working directory (default: current directory / process.cwd())
 * @param silent - if true, hides all stdout
 */
export async function run(command: string, cwd: string = process.cwd(), silent: boolean = false): Promise<void> {
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: silent ? 'ignore' : 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed. Exit code ${code}: ${command}`));
      }
    });
  });
}

/**
 * Run multiple commands using run fn
 */
export async function runBulk(commands: string[], cwd: string = process.cwd(), silent: boolean = false) {
  for (const command of commands) {
    await run(command, cwd, silent);
  }
}

/**
 * Run command in child process (spawn) with stdout and stderr
 */
export async function $(command: string, cwd: string = process.cwd()): Promise<{ stdout: string; stderr: string }> {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    return { stdout, stderr };
  } catch (error) {
    throw error;
  }
}

async function promptCommands(promptFn: () => Promise<{ cmd: string }>) {
  try {
    const answers = await promptFn();
    const { cmd } = answers;
    await run(cmd);
  } catch (e) {
    console.error(e);
  }
}

export { promptCommands };
