import WebSocket from 'ws';
import chalk from 'chalk';

import base64ToImg from './base64_to_img.js';

// import models from './../models.json' assert { type: "json" };

async function hf_ws(sessionHash, prompt, interaction) {
    const ws = new WebSocket('wss://stabilityai-stable-diffusion.hf.space/queue/join');

    ws.on('error', console.error);

    ws.on('open', function open() {
        console.log('\n\n');
        console.log(chalk.bgGreen('WebSocket Connection Established'));
    });

    ws.on('message', function incoming(data) {
        let message = JSON.parse(data);
        console.log(message);

        switch (message.msg) {
            case 'send_hash':
                const send_hash_payload = JSON.stringify({ "session_hash": sessionHash, "fn_index": 3 });
                ws.send(send_hash_payload);
                console.log(chalk.blueBright(send_hash_payload));
                break;

            case 'send_data':
                // const send_data_payload = JSON.stringify({ "fn_index": 3, "data": [prompt], "session_hash": sessionHash });
                const negativePrompt = "";
                const guidanceScale = 9;
                const send_data_payload = JSON.stringify({ fn_index: 3, data: [`${prompt}`, `${negativePrompt}`, `${guidanceScale}`], session_hash: sessionHash });
                ws.send(send_data_payload);
                console.log(chalk.blueBright(send_data_payload));
                break;

            case 'process_completed':
                let output = message.output.data[0];
                ws.close();
                let attachmentArr = base64ToImg(output, sessionHash);
                const files = Array.isArray(attachmentArr) ? attachmentArr : [];
                interaction.editReply({ content: `"${prompt}"\n`, files: files });
                console.log('\n\n');
                console.log(attachmentArr);
                console.log('\n\n');
                console.log(files);
                break;
        }

    });

    ws.on('close', function close() {
        console.log(chalk.bgRed('WebSocket Connection Closed'));
        console.log('\n\n');
    });
}

export default hf_ws;

// https://github.com/onury5506/Discord-ChatGPT-Bot/blob/master/discord/discord_helpers.js#L34