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

        await interaction.reply({ content: `__Current Settings:__ \n\nModel ID: ${modelId}\nModel Name: ${modelName}\nGuidance Scale: ${modelGuidanceScale}` });


    } else if (model != null && guidanceScale == null) {
        let newSettings = settings;
        newSettings.default = model;
        fs.writeFileSync('./../settings.json', JSON.stringify(newSettings, null, 2));
        console.log(newSettings);
        await interaction.reply({ content: `Done!` });


    } else if (model == null && guidanceScale != null) {
        let newSettings = settings;
        const defaultModelId = settings.default;
        const i = await getModelInfo(defaultModelId);

        if (settings.models[i].guidanceScale == 'N/A') {
            await interaction.reply({ content: `This model does not support guidance scaling.` });
        } else {
            newSettings.models[i].guidanceScale = guidanceScale;
            fs.writeFileSync('./../settings.json', JSON.stringify(newSettings, null, 2));
            console.log(newSettings);
            await interaction.reply({ content: `Done!` });
        }


    } else if (model != null && guidanceScale != null) {
        let newSettings = settings;
        newSettings.default = model;
        const defaultModelId = settings.default;
        const i = await getModelInfo(defaultModelId);

        if (settings.models[i].guidanceScale == 'N/A') {
            await interaction.reply({ content: `This model does not support guidance scaling.` });
        } else {
            newSettings.models[i].guidanceScale = guidanceScale;
            fs.writeFileSync('./../settings.json', JSON.stringify(newSettings, null, 2));
            console.log(newSettings);
            await interaction.reply({ content: `Done!` });
        }

    }
}

export default settingsInteractionHandler;