// features/ping.js
// A tiny command used to check if the bot is online and responding.

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction) {
  await interaction.reply('Pong!');
}
