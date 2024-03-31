import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const Command = {
    name: 'modal',
    description: 'modal lol',
    run: async(client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('test')
        .setTitle('Test Modal')

        const Question = new TextInputBuilder()
        .setCustomId('Question')
        .setLabel('Whats 9 + 10?')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('21 or 19?')
        
        const first = new ActionRowBuilder().addComponents(Question);

        modal.addComponents(first);
        await interaction.showModal(modal);
    }
}
