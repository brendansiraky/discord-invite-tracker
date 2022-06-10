import DiscordJs, { Intents } from 'discord.js'

export const discordClient = new DiscordJs.Client({
    intents: [
        // Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
    ],
    partials: [
        'CHANNEL',
        'GUILD_MEMBER',
        'USER',
        'MESSAGE'
    ]
})