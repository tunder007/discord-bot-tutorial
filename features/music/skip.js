// features/music/skip.js
// Skips the current song.
// The audio player will become idle, and music_portal.js will start the next song.

import { AudioPlayerStatus } from '@discordjs/voice';

export async function execute(interaction, musicState) {
  if (musicState.queue.length === 0) {
    await interaction.reply('The queue is empty, so there is nothing to skip.');
    return;
  }

  const skippedSong = musicState.queue[0];

  if (musicState.player.state.status !== AudioPlayerStatus.Idle) {
    musicState.player.stop();
  } else {
    musicState.queue.shift();
  }

  await interaction.reply(`Skipped: ${skippedSong.title}`);
}
