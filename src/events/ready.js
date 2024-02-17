import { ActivityType } from 'discord.js'

export const Event = {
    name: 'ready',
    runOnce: true,
    run: async (client) => {
        client.user.setActivity('Handler by mushroom0162', {
            type: ActivityType.Listening
        })
        client.user.setStatus('idle');
        console.log(`logged in ${client.user.tag}`)
    }
}

