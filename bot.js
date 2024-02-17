import { performance } from "node:perf_hooks";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { token } from "./config.js";
import { CommandHandler } from "./src/structures/Commands.js";
import { EventHandler } from "./src/structures/Events.js";

let start = performance.now();
const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds |
      GatewayIntentBits.GuildMessages |
      GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.events = new Map();
client.slashCommands = new Map();

CommandHandler(client, rootPath);
EventHandler(client, rootPath);
client.login(token);

let end = performance.now();
const startupTime = (end - start) / 1000; // to seconds
console.log(`Startup time: ${startupTime} seconds`);