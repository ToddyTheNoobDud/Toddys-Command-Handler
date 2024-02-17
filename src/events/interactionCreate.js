export const Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
    }
}