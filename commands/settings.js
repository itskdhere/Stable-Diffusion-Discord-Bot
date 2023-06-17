import fs from 'fs';

import settings from './../settings.json' assert { type: "json" };

async function getModelInfo(defaultModelId) {
    for (let i = 0; i < settings.models.length; i++) {
        if (settings.models[i].id === defaultModelId) {
            return i;
        }
    }
}

async function settingsInteractionHandler(interaction) {
    const options = interaction.options;

    const model = options.getString('model');
    const guidanceScale = options.getString('guidance-scale');

    if (model == null && guidanceScale == null) {
        const defaultModelId = settings.default;
        const i = await getModelInfo(defaultModelId);

        const modelId = settings.models[i].id;
        const modelName = settings.models[i].name;
        const modelGuidanceScale = settings.models[i].guidanceScale;

        await interaction.reply({ content: `__Current Settings:__ \n\n**Model ID:** ${modelId}\n**Model Name:** ${modelName}\n**Guidance Scale:** ${modelGuidanceScale}\n</>` });


    } else if (model != null && guidanceScale == null) {
        const oldDefaultModelId = settings.default;
        const i = await getModelInfo(oldDefaultModelId);
        const oldDefaultModelName = settings.models[i].name;

        let newSettings = settings;
        newSettings.default = model;
        const newI = await getModelInfo(model);
        const newDefaultModelName = settings.models[newI].name;

        fs.writeFileSync('./settings.json', JSON.stringify(newSettings, null, 2));
        console.log(newSettings);
        await interaction.reply({ content: `✅ Successfully Changed Default Model From ${oldDefaultModelName} To **${newDefaultModelName}**` });


    } else if (model == null && guidanceScale != null) {
        let newSettings = settings;
        const defaultModelId = settings.default;
        const i = await getModelInfo(defaultModelId);
        const oldGuidanceScale = settings.models[i].guidanceScale;

        if (settings.models[i].guidanceScale == 'N/A') {
            await interaction.reply({ content: `❌ This Model Does Not Support Guidance Scaling!` });
        } else {
            if (guidanceScale >= 0 && guidanceScale <= 50) {
                newSettings.models[i].guidanceScale = guidanceScale;
                fs.writeFileSync('./settings.json', JSON.stringify(newSettings, null, 2));
                console.log(newSettings);
                await interaction.reply({ content: `✅ Successfully Changed Default Guidance Scaling From ${oldGuidanceScale} To **${guidanceScale}**` });
            } else {
                await interaction.reply({ content: `❌ Invalid Guidance Scale Value *${guidanceScale}* . Value Should Be Between **0** And **50**` });
            }
        }


    } else if (model != null && guidanceScale != null) {
        let newSettings = settings;

        const oldDefaultModelId = settings.default;
        const oldI = await getModelInfo(oldDefaultModelId);
        const newI = await getModelInfo(model);

        const oldDefaultModelName = settings.models[oldI].name;
        const newDefaultModelName = settings.models[newI].name;

        const oldGuidanceScale = settings.models[oldI].guidanceScale;

        if (settings.models[newI].guidanceScale == 'N/A') {
            newSettings.default = model;
            fs.writeFileSync('./settings.json', JSON.stringify(newSettings, null, 2));
            console.log(newSettings);
            await interaction.reply({ content: `✅ Successfully Changed Default Model From ${oldDefaultModelName} To **${newDefaultModelName}**\n❌ This Model Does Not Support Guidance Scaling!` });
        } else {
            newSettings.default = model;
            newSettings.models[newI].guidanceScale = guidanceScale;
            fs.writeFileSync('./settings.json', JSON.stringify(newSettings, null, 2));
            console.log(newSettings);
            await interaction.reply({ content: `✅ Successfully Changed Default Model From ${oldDefaultModelName} To **${newDefaultModelName}**\n✅ Successfully Changed Default Guidance Scaling From ${oldGuidanceScale} To **${guidanceScale}**` });
        }

    }
}

export default settingsInteractionHandler;