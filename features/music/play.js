// features/music/play.js
// Finds a song, joins the user's voice channel, adds the song to the queue,
// and starts playback if nothing is already playing.

export async function execute(interaction, musicState, musicTools) {
  const query = interaction.options.getString('query');

  await interaction.deferReply();

  try {
    await musicTools.joinUserVoiceChannel(interaction);

    const song = await musicTools.findSong(query, interaction.user.username);
    musicState.queue.push(song);

    await musicTools.playNextSong();

    await interaction.editReply(`Added to the queue: ${song.title}`);
  } catch (error) {
    console.error(error);
    await interaction.editReply(error.message);
  }
}
