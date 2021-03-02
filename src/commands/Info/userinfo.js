const prettyMilliseconds = require('pretty-ms');

module.exports = class UserInfoCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ajuda',
				categoria: '📖 • Info',
				desc: 'Veja todos os comandos que você pode usar.'
			},
			en: {
				nome: 'help',
				categoria: '📖 • Info',
				desc: 'See all bot commands that are available.'
			},
			aliases: ['ui', 'whois'],
			run: this.run
		};
	}
	async run(client, message, args, prefixo, idioma) {
		const embed = new (require('discord.js')).MessageEmbed();
		let user;
		try {
			user = message.mentions.members.first() || (((args[0]&&!isNaN(args[0]))?await message.guild.members.fetch(String(args[0])) : message.member))
			let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';

			switch (idioma) {
				case 'pt':
					embed.setTitle(`${user.user.username}`);
					embed.addField(`🗣️ Tag no Discord:`, `**\`${user.user.tag}\`**`);
					embed.addField(`🔢 ID no Discord:`, `**\`${user.user.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Conta criada há:`,
						`${prettyMilliseconds(Date.now() - user.user.createdTimestamp, {
							verbose: true
						})
							.replace('day', 'dia')
							.replace('minute', 'minuto')
							.replace('second', 'segundo')
							.replace('week', 'semana')
							.replace('year', 'ano')
							.replace('hour', 'hora')}`
					);
					embed.addField(
						`📆 Entrou aqui há:`,
						`${prettyMilliseconds(Date.now() - user.joinedTimestamp, {
							verbose: true
						})
							.replace('day', 'dia')
							.replace('minute', 'minuto')
							.replace('second', 'segundo')
							.replace('week', 'semana')
							.replace('year', 'ano')
							.replace('hour', 'hora')}`
					);
					embed.setThumbnail(
						user.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Executado por: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
				case 'en':
					embed.setTitle(`${user.user.username}`);
					embed.addField(`🗣️ Discord Tag:`, `**\`${user.user.tag}\`**`);
					embed.addField(`🔢 Discord ID:`, `**\`${user.user.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Account Created:`,
						`${prettyMilliseconds(Date.now() - user.user.createdTimestamp, {
							verbose: true
						})} **ago**.`
					);
					embed.addField(
						`📆 Joined here:`,
						`${prettyMilliseconds(Date.now() - user.joinedTimestamp, {
							verbose: true
						})} **ago**.`
					);
					embed.setThumbnail(
						user.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Used: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
			}
		} catch (e) {
			return message.quote(
				`:x: ${message.author} **|** ${idioma.avatar.unknown}`
			);
		}
	}
};

//Davi
