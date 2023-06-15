import { Client, Partials, GatewayIntentBits, ActivityType, ChannelType } from 'discord.js';
import http from 'http';
import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

import initDiscordCommands from './initCommands.js';
import commandHandler from './commandHandler.js';

async function main() {
    await initDiscordCommands().catch(e => console.log(chalk.red(e)));

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
        ],
        partials: [Partials.Channel]
    });

    client.once('ready', () => {
        console.log(`Logged in as ${chalk.blueBright(client.user.tag)}`);
        console.log(chalk.greenBright('Connected to Discord Gateway'));
        console.log(new Date());

        client.user.setStatus('online');
        client.user.setActivity(process.env.ACTIVITY_NAME, { type: ActivityType.Playing });
    });

    client.on("interactionCreate", async interaction => {
        commandHandler(interaction);
    });

    client.login(process.env.DISCORD_BOT_TOKEN).catch(e => console.log(chalk.red(e)));
}

main().catch(e => console.log(chalk.red(e)));

if (process.env.HTTP_SERVER) {
    http.createServer((req, res) => res.end('BOT is Up && Running..!!')).listen(process.env.PORT);
}

setInterval(() => {
    axios
        .get('https://discord.com/api/v10')
        .catch(error => {
            if (error.response.status == 429) {
                console.log("Discord Rate Limited");
                console.warn("Status: " + error.response.status)
                console.warn(error)
                // TODO: Take Action (e.g. Change IP Address)
            }
        });

}, 30000);