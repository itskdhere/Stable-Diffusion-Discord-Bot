import hash from "../huggingface_websocket/hash.js";
import hf_ws from "../huggingface_websocket/hugging_face.js";

async function imagineInteractionHandler(interaction) {
  const prompt = interaction.options.getString("prompt");
  const negativePrompt = interaction.options.getString("negative-prompt");

  console.log(prompt);
  console.log(negativePrompt);

  await interaction.reply({ content: "Queued...⏲" });

  const sessionHash = await hash(11);

  await hf_ws(interaction, sessionHash, prompt, negativePrompt);
}

export default imagineInteractionHandler;

