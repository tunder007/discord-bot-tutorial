// features/joke.js
// A simple slash command that chooses one random joke from an array.

import { SlashCommandBuilder } from 'discord.js';

const jokes = [
  'Why did the developer go broke? Because they used up all their cache.',
  'Why do JavaScript developers wear glasses? Because they cannot C#.',
  'Why did the function return early? It had commitment issues.',
  'How do bots stay in shape? They run commands.',
];

export const data = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Tells a random programming joke.');

export async function execute(interaction) {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];

  await interaction.reply(randomJoke);
}
