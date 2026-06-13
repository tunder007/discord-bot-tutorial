// features/music_portal.js
// This file creates one /music command and groups the music subcommands under it.
// It also owns the simple music player state used by the subcommand files.
//
// The subcommands are:
// /music play query:<text>
// /music list
// /music skip
// /music stop

import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import play from 'play-dl';
import { execute as executePlay } from './music/play.js';
import { execute as executeSkip } from './music/skip.js';
import { execute as executeStop } from './music/stop.js';
import { execute as executeList } from './music/list.js';

// This is a small in-memory music state.
// It resets whenever the bot restarts, which keeps the tutorial simple.
export const musicState = {
  queue: [],
  player: createAudioPlayer(),
  connection: null,
  isPlaying: false,
};

// When one song ends, remove it from the queue and try the next one.
musicState.player.on(AudioPlayerStatus.Idle, () => {
  musicState.queue.shift();
  musicState.isPlaying = false;
  playNextSong();
});

// If the audio player has an error, log it and move on to the next song.
musicState.player.on('error', (error) => {
  console.error('Audio player error:', error);
  musicState.queue.shift();
  musicState.isPlaying = false;
  playNextSong();
});

export const data = new SlashCommandBuilder()
  .setName('music')
  .setDescription('Music commands that play audio in a voice channel.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('play')
      .setDescription('Adds a song to the queue and starts playing.')
      .addStringOption((option) =>
        option
          .setName('query')
          .setDescription('A YouTube search or YouTube URL.')
          .setRequired(true),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('list')
      .setDescription('Shows the current music queue.'),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('skip')
      .setDescription('Skips the current song.'),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('stop')
      .setDescription('Stops the music and clears the queue.'),
  );

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'play') {
    await executePlay(interaction, musicState, {
      findSong,
      joinUserVoiceChannel,
      playNextSong,
    });
    return;
  }

  if (subcommand === 'list') {
    await executeList(interaction, musicState);
    return;
  }

  if (subcommand === 'skip') {
    await executeSkip(interaction, musicState);
    return;
  }

  if (subcommand === 'stop') {
    await executeStop(interaction, musicState);
    return;
  }

  await interaction.reply({
    content: 'Unknown music subcommand.',
    ephemeral: true,
  });
}

export async function joinUserVoiceChannel(interaction) {
  const voiceChannel = interaction.member.voice.channel;

  if (!voiceChannel) {
    throw new Error('You must join a voice channel first.');
  }

  // Reuse the existing voice connection if the bot is already connected.
  const existingConnection = getVoiceConnection(interaction.guildId);

  if (existingConnection) {
    musicState.connection = existingConnection;
    return existingConnection;
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  // Subscribe the voice connection to the audio player.
  connection.subscribe(musicState.player);

  // Wait until Discord says the voice connection is ready.
  await entersState(connection, VoiceConnectionStatus.Ready, 20_000);

  musicState.connection = connection;
  return connection;
}

export async function findSong(query, requestedBy) {
  // If the user pasted a supported URL, play-dl can read it directly.
  if (play.yt_validate(query) === 'video') {
    const videoInfo = await play.video_info(query);
    const videoDetails = videoInfo.video_details;

    return {
      title: videoDetails.title,
      url: videoDetails.url,
      requestedBy,
    };
  }

  // Otherwise, treat the text as a YouTube search.
  const searchResults = await play.search(query, {
    limit: 1,
    source: { youtube: 'video' },
  });

  if (searchResults.length === 0) {
    throw new Error('No song found for that search.');
  }

  const song = searchResults[0];

  return {
    title: song.title,
    url: song.url,
    requestedBy,
  };
}

export async function playNextSong() {
  if (musicState.isPlaying) return;

  const nextSong = musicState.queue[0];

  if (!nextSong) {
    return;
  }

  musicState.isPlaying = true;

  const stream = await play.stream(nextSong.url);
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  musicState.player.play(resource);
}
