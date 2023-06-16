import WebSocket from 'ws';
import chalk from 'chalk';

import base64ToImg from './base64_to_img.js';

import settings from './../settings.json' assert { type: "json" };

async function getModelInfo(defaultModelId) {
    for (let i = 0; i < settings.models.length; i++) {
        if (settings.models[i].id === defaultModelId) {
            return i;
        }
    }
}

async function hf_ws(interaction, sessionHash, prompt, negativePrompt) {
    console.log(chalk.cyanBright(settings));
    const defaultModelId = settings.default;
    const i = await getModelInfo(defaultModelId);

    const ws = new WebSocket(settings.models[i].uri);

    ws.on('error', function error(e) {
        console.log(chalk.redBright('WebSocket Connection Error:\n'));
        console.log(e);
        interaction.editReply({ content: `❌ HuggingFace WebSocket Error:\n\`\`\`\n${e}\`\`\`\n` });
    });

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

            case 'process_starts':
                interaction.editReply({ content: "Generating Images..." });
                break;

            case 'send_data':
                let send_data_payload;

                if (settings.models[i].id == 'sd-v1-4') {
                    send_data_payload = JSON.stringify({ "fn_index": 3, "data": [prompt], "session_hash": sessionHash });

                } else if (settings.models[i].id == 'sd-v2-1') {
                    send_data_payload = JSON.stringify({ fn_index: 3, data: [`${prompt}`, `${negativePrompt}`, `${settings.models[i].guidanceScale}`], session_hash: sessionHash });
                } else {
                    send_data_payload = JSON.stringify({ "data": [`${prompt}`], "event_data": null, "fn_index": 0, "session_hash": `${sessionHash}` });
                }

                ws.send(send_data_payload);
                interaction.editReply({ content: "Starting..." });
                console.log(chalk.blueBright(send_data_payload));
                break;

            case 'process_completed':
                interaction.editReply({ content: "Uploading...⬆" });
                let output = message.output.data[0];
                ws.close();

                let attachmentArr = base64ToImg(output, sessionHash);
                const files = Array.isArray(attachmentArr) ? attachmentArr : [];

                interaction.editReply({ content: `"${prompt}" ~ ${settings.models[i].name} \n`, files: files });
                break;
        }

    });

    ws.on('close', function close() {
        console.log(chalk.bgRed('WebSocket Connection Closed'));
        console.log('\n\n');
    });
}

export default hf_ws;