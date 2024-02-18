import { ApplicationCommandType, REST, Routes } from 'discord.js'
import { Filereader } from '../utils/filereader.js'
import { pathToFileURL } from 'url'
import { token, botId } from '../../config.js'

export const CommandHandler = async (client, roothPath) => {
    const AllFiles = await Filereader(`${roothPath}/src/commands`);
    const rest = new REST({ version: '10' }).setToken(token);
    
    if (AllFiles.length > 0) {
        const commandsPromises = AllFiles.map(async (CommandFile) => {
            const { Command } = await import(pathToFileURL(CommandFile));
            if (Command && !Command.ignore && Command.name && Command.description) {
                client.slashCommands?.set(Command.name, Command);
                return {
                    name: Command.name,
                    nsfw: Command.nsfw ?? false,
                    description: Command.description,
                    type: ApplicationCommandType.ChatInput,
                    options: Command.options ?? []
                };
            }
        });

        const CommandsArray = (await Promise.all(commandsPromises)).filter(Boolean);

        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(botId), { body: CommandsArray });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}
