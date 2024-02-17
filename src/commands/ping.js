export const Command = {
    name: 'ping',
    description: 'pong',
    run: async(client, interaction) => {
        await interaction.reply({
            content: 'pong'
        })
    }
}