async function settingsInteractionHandler(interaction) {
    const options = interaction.options;
    const model = options.getString('model');
    await interaction.reply(model + 'Settings Comming Soon!');
}

export default settingsInteractionHandler;