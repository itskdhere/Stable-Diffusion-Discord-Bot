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
        description: 'Generate an image based on a text prompt',
        dm_permission: false,
        options: [
            {
                name: "prompt",
                description: "Image Prompt",
                type: 3,
                required: true
            },
            {
                name: "negative-prompt",
                description: "Negative Prompt (only for Stable Diffusion v2.1)",
                type: 3,
                required: false
            }
        ]
    },
    {
        name: 'settings',
        description: 'View/Change Bot Settings',
        dm_permission: false,
        options: [
            {
                name: "model",
                description: "Select Default Model",
                type: 3,
                required: false,
                choices: [
                    { name: "Stable Diffusion v1.4", value: "sd-v1-4" },
                    { name: "Stable Diffusion v2.1", value: "sd-v2-1" }
                ]
            },
            {
                name: "guidance-scale",
                description: "Set Guidance Scale (only for v2.1) [Value between 0 and 50]",
                type: 3,
                min_value: 0,
                max_value: 50,
                required: false
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