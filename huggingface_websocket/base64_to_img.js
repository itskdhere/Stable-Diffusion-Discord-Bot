import { AttachmentBuilder } from "discord.js";

function base64ToImg(output, sessionHash) {

    let attachmentArr = [];
    let i;

    for (i = 0; i <= 3; i++) {
        const base64Str = output[i];

        const base64Data = base64Str.replace(/^data:image\/jpeg;base64,/, "");

        const bufferData = Buffer.from(base64Data, 'base64');

        const attachment = new AttachmentBuilder(bufferData, { name: `${sessionHash}_${i}.jpeg` });

        // attachment.attachment = bufferData;
        // attachment.name = `${sessionHash}_${i}.jpeg`;

        attachmentArr.push(attachment);
    }

    console.log("attachmentArr: " + attachmentArr);

    return attachmentArr;
}

export default base64ToImg;