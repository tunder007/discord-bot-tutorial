# Beginner Discord.js v14 Music Bot

This project is a beginner-friendly Discord bot built with Node.js, Discord.js v14, ES Modules, slash commands, dotenv, and real voice playback.

The bot includes:

- `/ping` replies with `Pong!`
- `/joke` replies with one random joke
- `/music play query:<text>` joins your voice channel, searches YouTube, queues the song, and plays it
- `/music list` shows the current queue
- `/music skip` skips the current song
- `/music stop` stops playback, clears the queue, and leaves the voice channel

## Install

```bash
npm install
```

If you are starting from an empty folder, install the dependencies with:

```bash
npm install discord.js @discordjs/voice play-dl libsodium-wrappers dotenv
```

## Create Your .env File

Copy `.env.example` and name the copy `.env`.

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_client_id_here
GUILD_ID=your_test_server_id_here
```

Replace each value:

- `DISCORD_TOKEN` is your bot token from the Discord Developer Portal.
- `CLIENT_ID` is your application's client ID.
- `GUILD_ID` is the ID of the server where you want to test commands.

## Bot Permissions

When inviting the bot to your server, make sure it has these permissions:

- Use Slash Commands
- Connect
- Speak

You must also join a voice channel before using `/music play`.

## Run The Bot

```bash
npm start
```

When the bot starts, it registers slash commands for your test server and then logs in.

## Try It

Join a voice channel, then run:

```text
/music play query:never gonna give you up
```

You can also paste a YouTube video URL:

```text
/music play query:https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## File Guide

- `index.js` creates the Discord client, registers slash commands, listens for interactions, and routes commands.
- `feature_portal.js` collects all top-level features so `index.js` can load them from one place.
- `features/ping.js` defines and runs the `/ping` command.
- `features/joke.js` defines and runs the `/joke` command.
- `features/music_portal.js` defines the `/music` command, stores the music player state, joins voice, searches songs, and starts playback.
- `features/music/play.js` joins the user's voice channel, finds a song, queues it, and starts playback.
- `features/music/list.js` shows the current queue.
- `features/music/skip.js` skips the current song.
- `features/music/stop.js` clears the queue, stops playback, and disconnects from voice.

## Important Learning Note

This is still tutorial-level music code. It is good for learning slash commands, voice connections, queues, and basic playback.

Real production music bots usually need more advanced error handling, per-server queues, volume controls, reconnect logic, and extra handling for websites that change how audio streams work.
