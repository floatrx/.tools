import { OPENAI_API_KEY } from '@/config/const';
import { fixGrammar } from '@/lib/openai/grammar';
import inquirer from 'inquirer';

const main = async () => {
  if (!OPENAI_API_KEY) {
    console.log('Please set OPENAI_API_KEY in your environment variables');
    return;
  }
  const { prompt } = await inquirer.prompt([
    {
      type: 'input',
      name: 'prompt',
      message: 'Enter your prompt:\n',
    },
  ]);
  console.clear();

  const response = await fixGrammar(prompt);
  console.log('Response:', response);
};

main();
