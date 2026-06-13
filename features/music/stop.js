// features/music/stop.js
// Stops the audio player, clears the queue, and leaves the voice channel.

export async function execute(interaction, musicState) {
  if (musicState.queue.length === 0 && !musicState.connection) {
    await interaction.reply('The queue is already empty and I am not in a voice channel.');
    return;
  }

  musicState.queue.length = 0;
  musicState.isPlaying = false;
  musicState.player.stop();

  if (musicState.connection) {
    musicState.connection.destroy();
    musicState.connection = null;
  }

  await interaction.reply('Stopped the music, cleared the queue, and left the voice channel.');
}
