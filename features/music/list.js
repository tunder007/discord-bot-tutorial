// features/music/list.js
// Shows the songs currently waiting in the in-memory music queue.

export async function execute(interaction, musicState) {
  if (musicState.queue.length === 0) {
    await interaction.reply('The music queue is empty.');
    return;
  }

  const queueText = musicState.queue
    .map((song, index) => `${index + 1}. ${song.title} - requested by ${song.requestedBy}`)
    .join('\n');

  await interaction.reply(`Current music queue:\n${queueText}`);
}
