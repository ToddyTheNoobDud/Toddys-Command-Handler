export const Button = {
    name: 'test',
    run: async(iclient, interaction) => {
        await interaction.reply({
            content: 'test'
        })
    }
}