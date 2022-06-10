import { Message } from 'discord.js'

import { config } from './config'
import { discordClient } from './utils/discordClient'

discordClient.login(config.INVITE_TRACKER_BOT_TOKEN)

discordClient.on('ready', async () => {
    console.log('Invite Bot Connected!')
})

discordClient.on('messageCreate', async (message: Message) => {    
    if (message.content === '!invites') {
        const invites = await message.guild?.invites.fetch({
            cache: true
        })

        const inviteCounter = {}

        if (invites) {
            invites.forEach(invite => {

                const uses = invite.uses
                const inviter = invite.inviter
                const { username, discriminator } = inviter

                if (uses === 0 || inviter.bot) {
                    return 
                }

                const name = `${username}#${discriminator}`
                inviteCounter[name] = (inviteCounter[name] || 0) + uses
                
            })
        }
        
        let replyText = `Invites:`

        const sortedInvites = Object.keys(inviteCounter).sort(
            (a, b) => inviteCounter[b] - inviteCounter[a]
        )

        for (const invite of sortedInvites) {
            const count = inviteCounter[invite]
            replyText += `\n${invite} - ${count}`
        }

        message.reply(replyText)
    }
})


