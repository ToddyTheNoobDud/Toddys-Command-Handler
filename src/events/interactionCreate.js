export const Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        switch (true) {
            case interaction.isChatInputCommand():
                const command = client.slashCommands.get(interaction.commandName);
                if (command) command.run(client, interaction);
                break;
            case interaction.isButton():
                const buttonCommand = client.buttonCommands.get(interaction.customId);
                if (buttonCommand) buttonCommand.run(client, interaction) 
                else await interaction.reply({ content: 'Button is disabled', ephemeral: true })
                break;
            case interaction.isModalSubmit():
                const modalInteraction = client.modals.get(interaction.customId);
                if (!modalInteraction) return;
                else await modalInteraction.run(client, interaction);
                break;
        }
    }
}
