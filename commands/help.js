async function helpInteractionHandler(interaction) {
    await interaction.reply("Use **/imagine** slash command to generate images from a text prompt.\nUse **/settings** slash command to change the default model and guidance scale.\nUse **/ping** slash command to check the websocket heartbeat and roundtrip latency.");
}

export default helpInteractionHandler;