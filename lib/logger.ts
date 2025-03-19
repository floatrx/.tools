import chalk from 'chalk';

/**
 * Log a message with an icon (use instead of console.log)
 * @param msg - message
 * @param type - loading, done, info
 */
export function log(msg: string, type: 'loading' | 'done' | 'info') {
  const icons = { loading: chalk.yellow('⏳'), done: chalk.green('✅'), info: chalk.blue('ℹ️') };
  console.log(icons[type], msg);
}

// Wait message
log.wait = (msg: string) => log(chalk.yellow(msg) + '...', 'loading');
// Info message
log.info = (msg: string) => log(chalk.blue(msg), 'info');
// Task done message
log.done = (msg: string) => log(chalk.green(msg), 'done');
