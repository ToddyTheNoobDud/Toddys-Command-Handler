import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export const Command = {
    name: 'button',
    description: 'button lol',
    run: async(client, interaction) => {
        const Button = new ButtonBuilder()
        .setCustomId('test')
        .setStyle(ButtonStyle.Success)
        .setEmoji('👍')

    await interaction.reply({
        components: [new ActionRowBuilder().addComponents(Button)]
    })
    }
}
