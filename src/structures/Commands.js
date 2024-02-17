import { ApplicationCommandType, REST, Routes } from 'discord.js'
import { Filereader } from '../utils/filereader.js'
import { pathToFileURL } from 'url'
import { token, botId } from '../../config.js'

export const CommandHandler = async (client, roothPath) => {
    const AllFiles = await Filereader(`${roothPath}/src/commands`);
    const rest = new REST({ version: '10' }).setToken(token);
    const CommandsArray = [];
    
    if (AllFiles.length > 0) {
        for (const CommandFile of AllFiles) {
            const { Command } = await import(pathToFileURL(CommandFile))
            if (Command && !Command.ignore && Command.name && Command.description) {
                client.slashCommands?.set(Command.name, Command);
                CommandsArray.push({
                    name: Command.name,
                    nsfw: Command.nsfw ?? false,
                    description: Command.description,
                    type: ApplicationCommandType.ChatInput,
                    options: Command.options ?? []
                });
            }
        }

        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(botId), { body: CommandsArray });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}