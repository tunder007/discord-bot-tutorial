// index.js
// This is the main file for the Discord bot.
// It creates the Discord client, registers slash commands, and sends each
// command interaction to the correct feature file.

import 'dotenv/config';
import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import { features } from './feature_portal.js';

// dotenv loads these values from your .env file.
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// A small beginner-friendly check so missing setup values are easy to spot.
if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error('Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in your .env file.');
  process.exit(1);
}

// Create the bot client.
// Guilds lets the bot receive slash commands.
// GuildVoiceStates lets the bot see voice channel information so it can join.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Store commands in a Collection so we can quickly find them by name later.
client.commands = new Collection();

for (const feature of features) {
  client.commands.set(feature.data.name, feature);
}

// Convert each SlashCommandBuilder into plain JSON for Discord's API.
const commandsForDiscord = features.map((feature) => feature.data.toJSON());

// Register the slash commands for one guild.
// Guild commands update quickly, which is perfect while learning.
async function registerSlashCommands() {
  const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

  console.log('Registering slash commands...');

  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commandsForDiscord,
  });

  console.log('Slash commands registered.');
}

// This event runs once when the bot logs in successfully.
client.once('ready', (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

// This event runs every time Discord sends the bot an interaction.
client.on('interactionCreate', async (interaction) => {
  // This tutorial only handles chat input slash commands.
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    await interaction.reply({
      content: 'I do not know that command yet.',
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    // If something goes wrong, send a friendly message to Discord.
    const errorMessage = {
      content: 'Something went wrong while running this command.',
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Start the bot.
await registerSlashCommands();
await client.login(DISCORD_TOKEN);
