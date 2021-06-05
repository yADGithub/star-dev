module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['embedLinks'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'moneyrank',
				categoria: '💸 • Economia',
				desc: 'Veja o rank de money'
			},
			en: {
				nome: 'moneyrank',
				categoria: '💸 • Economy',
				desc: 'See the money rank'
			},
			aliases: ['topmoney', 'topwallet', 'topm', 'topbank'],
			run: this.run
		};
	}
	async run(ctx) {
        let xpa = await db.all()
        let xp = xpa.filter(lb => lb.ID.startsWith(`money-`)).sort((a, b) => b.data- a.data)
        let ien = xp.slice(0, 10)

        let xp2 = xpa.filter(lb => lb.ID.startsWith(`banco-`)).sort((a, b) => b.data- a.data)
        let ien2 = xp2.slice(0, 10)

        let content
        let content2
        //console.log(ien)

        for(let i = 0; i < ien.length; i++) {
            let user = await star.getRESTUser(ien[i].ID.split('-')[1])
            content += `**${i+1}.** \`${user.username}\` - **${ien[i].data}**\n`
        }

        for(let i = 0; i < ien2.length; i++) {
            let user = await star.getRESTUser(ien2[i].ID.split('-')[1])
            content2 += `**${i+1}.** \`${user.username}\` - **${ien[i].data}**\n`
        }

        const embed = new star.manager.ebl;
        embed.title(`💸 Top Money | ${star.user.username}`)
        embed.color('#dd3af0')
        embed.field(`❯ Top Money (Bank):`, ">>> " + content.replace("undefined", ""), true)
        embed.field(`❯ Top Money (Wallet):`, ">>> " + content2.replace("undefined", ""), true)
        embed.thumbnail(star.user.avatarURL)
        ctx.message.channel.createMessage(embed.create)
    }
};

//ADG, Davi e LRD