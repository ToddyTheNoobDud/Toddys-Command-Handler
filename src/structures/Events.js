import { Filereader } from '../utils/filereader.js';
import { pathToFileURL } from 'node:url';

export const EventHandler = async (client, rootPath) => {
    const eventFiles = Filereader(`${rootPath}/src/events`);
    if (!eventFiles.length) return;

    const promises = [];
    for (const event of eventFiles) {
        promises.push(
            (async () => {
                try {
                    const { Event: clientEvent } = await import(pathToFileURL(event)) || {};
                    if (clientEvent) {
                        client.events?.set(clientEvent.name, clientEvent);

                        if (!clientEvent.ignore) {
                            if (clientEvent.customEvent) clientEvent.run(client);
                            else if (clientEvent.runOnce) client.once(clientEvent.name, (...args) => clientEvent.run(...args, client));
                            else client.on(clientEvent.name, (...args) => clientEvent.run(client, ...args));
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            })()
        );
    }

    await Promise.allSettled(promises);
};
