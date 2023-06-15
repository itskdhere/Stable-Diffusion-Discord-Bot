import hash from "../huggingface_websocket/hash.js";
import hf_ws from "../huggingface_websocket/hugging_face.js";

async function imagineInteractionHandler(interaction) {
  const prompt = interaction.options.getString("prompt");
  console.log(prompt);

  await interaction.reply({ content: "Generating Images..." });

  const sessionHash = await hash(11);

  await hf_ws(sessionHash, prompt, interaction);
}

export default imagineInteractionHandler;


// -----------------------------------------------------------------

/*
Session Hash 
Websocket 
Base64 to JPEG
*/

/*
https://huggingface.co/spaces/stabilityai/stable-diffusion-1
https://huggingface.co/spaces/stabilityai/stable-diffusion
*/

/*
fetch("wss://stabilityai-stable-diffusion-1.hf.space/queue/join", {
  "headers": {
    "accept-language": "en-GB,en;q=0.9,bn;q=0.8",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-websocket-extensions": "permessage-deflate; client_max_window_bits",
    "sec-websocket-key": "RDj9qmeh/GRPgjTrFNg1rw==",
    "sec-websocket-version": "13"
  },
  "body": null,
  "method": "GET"
});
*/

/*   3xlh0acipvk
{ "session_hash": "l6d3elfbcq" , "fn_index": 3}
{"fn_index": 3, "data": ["an anime styled night sky"], "session_hash": "l6d3elfbcq"}
*/