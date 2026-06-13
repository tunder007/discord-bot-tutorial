// feature_portal.js
// This file collects all top-level bot features in one place.
// index.js imports this list so it can register and route every command.

import { data as pingData, execute as executePing } from './features/ping.js';
import { data as jokeData, execute as executeJoke } from './features/joke.js';
import { data as musicData, execute as executeMusic } from './features/music_portal.js';

export const features = [
  {
    data: pingData,
    execute: executePing,
  },
  {
    data: jokeData,
    execute: executeJoke,
  },
  {
    data: musicData,
    execute: executeMusic,
  },
];
