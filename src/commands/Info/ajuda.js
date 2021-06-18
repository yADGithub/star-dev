module.exports = class Ajuda {
    constructor() {
        return {
            pt: {
                nome: 'ajuda',
                categoria: '📖 • Informação',
                desc: 'Veja minha lista de comandos!',
                exemplos: [
                    "ajuda",
                    "ajuda ping"
                ]
            },
            en: {
                nome: 'help',
                categoria: '📖 • Information',
                desc: 'View my command list!',
                exemplos: [
                    "help",
                    "help ping"
                ]
            },
            aliases: ['help', 'cmds', 'commands', 'comandos'],
            run: this.run
        }
    }

    async run(ctx) {
        //const lang = `${await db.get(`idioma-${ctx.message.guildID}`)}`.split('-').filter(a => a.length > 0);
        let idioma = await db.get(`idioma-${ctx.message.guildID}`) || 'pt-br'
        var devs = [];

        if (idioma == 'pt-zeDroguinha') {
            idioma = 'pt-br'
        }

        var desenvolvedores = await db.get('devs');
        for (const desenvolvedor of desenvolvedores) {
            const dev = await star.getRESTUser(desenvolvedor);
            devs.push(dev.username);
        }

        let categorias = {}
        const embed = new star.manager.ebl;
        embed.title('<:ES_startodeolho:815580030415536179> ' + ctx.idioma.help.title + star.user.username);
        embed.color('#dd3af0');

        switch (idioma) {
            case 'pt-br':
                if (ctx.args[0]) {
                    const cmd = await star.commands.get(ctx.args[0]) || star.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

                    if (!cmd) return message.quote(`:x: ${ctx.message.author.mention} **|** Esse comando não existe`)
                    const help = new star.manager.ebl;
                    help.title('<:st_util_info:835532528617259068> ' + `Informações do comando: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``) //.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' '))
                    help.field('📚 Descrição:', `\`${cmd.pt.desc}\``, false)
                    help.field(':small_blue_diamond: Permissões do bot:', `\`${cmd.permissoes.bot.join('`, `') || `Esse comando não necessita de permissões`}\``, false)
                    help.field(':small_orange_diamond: Permissões do usuário:', `\`${cmd.permissoes.membro.join('`, `') || `Esse comando não necessita de permissões especiais para ser executado`}\``, false)
                    help.thumbnail(star.user.avatarURL)
                    help.color('#dd3af0')

                    if (cmd.aliases.join(', ') !== '') {
                        help.field(':twisted_rightwards_arrows: Sinônimos:', `\`${cmd.aliases.join('`, `')}\``, false)
                    }

                    return ctx.send(help.create)
                }

                star.commands.forEach(comando => {
                    if (!categorias[comando.pt.categoria])
                        categorias[comando.pt.categoria] = [];
                    categorias[comando.pt.categoria].push(
                        `\`${comando.pt.nome}\``
                    );
                });
                embed.description(`>>> Olá, meu nome é: **${star.user.username}**!\nAtualmente possuo: **${star.commands.size}** comandos;\nMe [adicione](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446), ou se junte ao meu [suporte](https://discord.gg/2pFH6Yy) caso queira!`)
                embed.thumbnail(star.user.avatarURL)
                for (var categoria in categorias) {
                    embed.field(categoria, `${categorias[categoria].join(', ')}`);
                }
                embed.footer(ctx.idioma.help.creators + devs.join(', '));
                ctx.send(embed.create);

                break;

            case 'en-us':
                if (ctx.args[0]) {
                    const cmd = await star.commands.get(ctx.args[0]) || star.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

                    if (!cmd) return message.quote(`:x: ${ctx.message.author.mention} **|** This command does not exist`)
                    const help = new star.manager.ebl;
                    help.title('<:st_util_info:835532528617259068> ' + `Command information: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``) //.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' '))
                    help.field('📚 Description:', `\`${cmd.en.desc}\``, false)
                    help.field(':small_blue_diamond: Bot permissions:', `\`${cmd.permissoes.bot.join('`, `') || `This command does not need permissions.`}\``, false)
                    help.field(':small_orange_diamond: User permissions:', `\`${cmd.permissoes.membro.join('`, `') || `This command does not need special permissions to run`}\``, false)
                    help.thumbnail(star.user.avatarURL)
                    help.color('#dd3af0')

                    if (cmd.aliases.join(', ') !== '') {
                        help.field(':twisted_rightwards_arrows: Aliases:', `\`${cmd.aliases.join('`, `')}\``, false)
                    }

                    return ctx.send(help.create)
                }
                star.commands.forEach(cmd => {
                    if (!categorias[cmd.en.categoria]) {
                        categorias[cmd.en.categoria] = [];
                    }
                    categorias[cmd.en.categoria].push(`\`${cmd.en.nome}\``)
                })
                embed.description(`>>> Hi, my name is: **${star.user.username}**!\nI currently have: **${star.commands.size}** commands;\nMe [add](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446), or join my [support](https://discord.gg/2pFH6Yy) if you want!`)
                embed.thumbnail(star.user.avatarURL)
                for (var categoria in categorias) {
                    embed.field(categoria, `${categorias[categoria].join(', ')}`);
                }

                embed.footer(ctx.idioma.help.creators + devs.join(', '));
                ctx.send(embed.create);
                break;
        }

    }
}