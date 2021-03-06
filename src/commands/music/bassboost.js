module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'bassboost',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro bassboost'
      },
      en: {
        nome: 'bassboost',
        categoria: '🎵 • Music',
        desc: 'Activates the bassboost filter'
      },
      aliases: ['bass', 'boost', 'bb', 'bass-boost'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      if (player.bassboost === false) {
        await global.star.music.players.get(ctx.message.channel.guild.id).setBassboost(true)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', 'bassboost')}`)
      }
      if (player.bassboost === true) {
        await global.star.music.players.get(ctx.message.channel.guild.id).setBassboost(false)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', 'bassboost')}`)
      }
    }
  }
}
