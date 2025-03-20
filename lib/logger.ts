import chalk from 'chalk';
import ora from 'ora';

export type LogProcessMsg = { task?: string; failed?: string; success?: string };

/**
 * Log a message with an icon (use instead of console.log)
 * NOTE:
 *    I'm not sure, maybe "process" should be separated
 *    into a different function...
 * @param msg - message
 * @param type - loading, done, info, process
 */
export function log(msg: string, type: 'loading' | 'done' | 'info') {
  const icons = { loading: chalk.yellow('⏳'), done: chalk.green('✔'), info: chalk.blue('ℹ') };
  console.log(icons[type], msg);
}

// Simple wait message with icon
log.wait = (msg: string) => log(chalk.yellow(msg) + '...', 'loading');

// Wait message with animation (using ora)
log.process = async (msg: LogProcessMsg, task: () => Promise<any>) => {
  const startTime = Date.now();
  const spinner = ora({
    text: chalk.yellow(msg.task || 'Processing...'),
    spinner: 'dots2',
    color: 'yellow',
    hideCursor: true,
  }).start();

  // Measure time (benchmark)
  const timer = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    spinner.text = chalk.yellow(`${msg.task || 'Processing...'} (${elapsedTime}s)`);
  }, 1000);

  try {
    await task();
    clearInterval(timer);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    spinner.succeed(chalk.green(`${msg.success || 'Completed'} in ${totalTime}s.`));
  } catch (error) {
    clearInterval(timer);
    spinner.fail(chalk.red(msg.failed || 'Failed'));
    console.log(error);
  }
  return spinner;
};

// Info message
log.info = (msg: string) => log(chalk.blue(msg), 'info');

// Task done message
log.done = (msg: string) => log(chalk.green(msg), 'done');
