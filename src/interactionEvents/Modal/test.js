export const Modal = {
    name: "test",
    run: async (client, interaction) => {
        await interaction.reply({
            content: "Oh ma gah!"
        });
    }
}; 