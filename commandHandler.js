import pingInteractionHandler from './commands/ping.js';
import helpInteractionHandler from './commands/help.js';
import imagineInteractionHandler from './commands/imagine.js';
import settingsInteractionHandler from './commands/settings.js';

async function commandHandler(interaction) {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "imagine":
            imagineInteractionHandler(interaction);
            break;
        case "ping":
            pingInteractionHandler(interaction);
            break;
        case "help":
            helpInteractionHandler(interaction);
            break;
        case 'settings':
            settingsInteractionHandler(interaction);
            break;
        default:
            await interaction.reply({ content: 'Command Not Found' });
    }
}

export default commandHandler;