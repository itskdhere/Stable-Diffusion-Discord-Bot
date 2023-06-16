import { REST, Routes } from 'discord.js';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const initDiscordCommands = async () => {

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

    try {
        console.log('Started refreshing application commands (/)');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands })
            .then(() => { console.log('Successfully reloaded application commands (/)') })
            .catch(e => console.log(chalk.red(e)));

        console.log('Connecting to Discord Gateway...');

    } catch (error) {
        console.log(chalk.red(error));
    }
};

const commands = [
    {
        name: 'imagine',
        description: 'Generate an image based on the prompt',
        dm_permission: false,
        options: [
            {
                name: "prompt",
                description: "Your Image Prompt",
                type: 3,
                required: true
            },
            {
                name: "negative prompt",
                description: "Your Negative Prompt",
                type: 3,
                required: false
            }
        ]
    },
    {
        name: 'settings',
        description: 'Change Bot Settings',
        dm_permission: false,
        options: [
            {
                name: "model",
                description: "Select a Model",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'ping',
        description: 'Check Websocket Heartbeat && Roundtrip Latency'
    },
    {
        name: 'help',
        description: 'Get Help'
    }
];

export default initDiscordCommands;