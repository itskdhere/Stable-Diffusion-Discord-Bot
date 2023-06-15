async function pingInteractionHandler(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...🌐', fetchReply: true });
    await interaction.editReply(`Websocket Heartbeat: ${interaction.client.ws.ping} ms. \nRoundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp} ms\n</>`);
}

export default pingInteractionHandler;