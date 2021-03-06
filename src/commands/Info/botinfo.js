module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'botinfo',
        categoria: '📖 • Informação',
        desc: 'Mostra informações do bot'
      },
      en: {
        nome: 'botinfo',
        categoria: '📖 • Information',
        desc: 'Show botinfo'
      },
      aliases: ['info', 'bi'],
      run: this.run
    }
  }

  async run (ctx) {
    const {
      cpuUsage
    } = require('os-utils')
    const moment = require('moment')
    const data = await global.db.all()

    const dono = await global.star.getRESTUser('717766639260532826')
    const dono2 = await global.star.getRESTUser('630493603575103519')

    require('moment-duration-format')
    await cpuUsage(function (v) {
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_hosting:845646508040126494> Botinfo | ${global.star.user.username}`)
      embed.description(ctx.idioma.botinfo.text.replace('%u', global.star.guilds.reduce((acc, guild) => acc + guild.memberCount, 0)).replace('%g', global.star.guilds.size))
      embed.thumbnail(global.star.user.avatarURL)
      embed.field(`<:st_host:830841046153691197> ${ctx.idioma.botinfo.com}`, `\`RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB;\nCPU: ${v.toFixed(2)}%;\`\n\`DATABASE: ${data.length} files;\`\n\`UPTIME: ${moment.duration(global.star.uptime).format('d:h:m:s')}.\``, true)
      embed.field('<:st_github:850386245887852545> Github:', `${ctx.idioma.botinfo.open} **[open-source](https://github.com/stardiscordbot/starbot)**!`, true)
      embed.field(`➕ ${ctx.idioma.botinfo.add}`, `${ctx.idioma.botinfo.textt}`, true)
      embed.field(`🎖️ ${ctx.idioma.botinfo.pessoas}`, `>>> • \`${dono.username}#${dono.discriminator}\` & \`${dono2.username}#${dono2.discriminator}\` ${ctx.idioma.botinfo.por}\n${ctx.idioma.botinfo.ded.replace('%u', ctx.message.author.mention)}`)
      embed.color('#dd3af0')
      ctx.send(embed.create)
    })
  }
}

// ADG, Davi e LRD
