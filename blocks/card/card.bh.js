module.exports = function(bh) {

    var i18n = {
        ru: {
            tel: 'тел.: ',
            fax: 'факс: ',
            cellular: 'моб.: ',
            phoneAdd: ', доб. ',
            site: ''
        },
        en: {
            tel: 'tel. ',
            fax: 'fax ',
            cellular: 'cell. ',
            phoneAdd: ' ext. ',
            site: ''
        }
    };

    bh.match('card', function(ctx, json) {

        ctx.js({
            titles: json.cards.map(function(card) {
                return {
                    lang: card.lang,
                    title: card.data.name + ' — ' + card.data.extra.email
                };
            })
        });

        var cards = json.cards,
            content = [],
            langs = [];

        content.push(cards.map(function(card, i) {

            langs.push(card.lang);

            return {
                elem: 'side',
                mix: [{ elem: 'layout' }],
                mods: {
                    lang: card.lang,
                    state: i === 0 ? 'opened' : ''
                },
                content: [
                    {
                        elem: 'info',
                        mix: [{ elem: 'rectangle' }],
                        card: card
                    },
                    {
                        elem: 'triangle'
                    }
                ]
            }

        }));

        content.push({
            elem: 'switch',
            content: langs.map(function(lang, i) {
                 var mods = {
                     pseudo: 'yes'
                 };

                 if (i === 0) {
                     mods.disabled = 'yes';
                 }

                 return {
                     block: 'link',
                     mix: [{ block: 'card', elem: 'link', elemMods: { lang: lang } }],
                     mods: mods,
                     js: true,
                     content: lang
                 }
             })
        });

        ctx.content(content);

    });

    bh.match('card__info', function(ctx, json) {

        var card = json.card,
            data = card.data;

        ctx.content([
            {
                elem: 'logo',
                lang: card.lang,
                site: data.contact.site
            },
            {
                elem: 'text',
                content: [
                    {
                        elem: 'title',
                        data: {
                            name: data.name,
                            position: data.position
                        }
                    },
                    {
                        elem: 'contact',
                        data: data.contact,
                        lang: card.lang,
                        i18n: card.i18n
                    },
                    {
                        elem: 'extra',
                        data: data.extra
                    }
                ]
            }
        ]);

    });

    bh.match('card__title', function(ctx, json) {
        ctx.content([
            {
                elem: 'name',
                content: json.data.name
            },
            {
                elem: 'position',
                content: json.data.position
            }
        ]);
    });

    bh.match('card__name', function(ctx) {
        ctx.tag('h1');
    });

    bh.match('card__address', function(ctx, json) {

        var order = json.elemMods.lang === 'ru'
            ? ['country', 'city', 'zip']
            : ['city', 'zip', 'country'];

        var content = [];

        content.push(order.map(function(el) {
            return json.data[el];
        }).join(', '))    ;

        content.push(
            { tag: 'br' },
            json.data.address
        );

        ctx.content(content)

    });

    bh.match('card__contact', function(ctx, json) {

        var data = json.data,
            lang = json.lang,
            content = [];

        content.push({
            elem: 'address',
            elemMods: { lang: lang },
            data: data
        });

        data.phone && content.push({
            elem: 'phone',
            content: [
                i18n[lang].tel,
                data.phone,
                data.phoneAdd
                    ? i18n[lang].phoneAdd + data.phoneAdd
                    : ''
            ]
        });

        ['cellular', 'fax', 'site'].forEach(function(prop) {
            data[prop] && content.push({
                elem: prop,
                content: [
                    i18n[lang][prop],
                    data[prop]
                ]
            });
        })

        ctx.content(content, true);

    });

    bh.match('card__site', function(ctx, json) {
        ctx.content({
            block: 'link',
            url: 'http://' + ctx.content(),
            content: ctx.content()
        }, true);
    });

    bh.match('card__extra', function(ctx, json) {

        var data = json.data;

        ctx.content(['email', 'github', 'skype'].map(function(prop) {
            return data[prop] ? ({
                elem: prop,
                content: data[prop]
            }) : '';
        }));

    });

    bh.match('card__email', function(ctx) {
        ctx.content({
            block: 'link',
            url: 'mailto:' + ctx.content(),
            content: ctx.content()
        }, true);
    });

    bh.match('card__github', function(ctx) {
        ctx.content({
            block: 'link',
            url: 'http://github.com/' + ctx.content(),
            content: 'github.com/' + ctx.content()
        }, true);
    });

    bh.match('card__skype', function(ctx) {
        ctx.content([
            'skype: ',
            {
                block: 'link',
                url: 'skype:' + ctx.content() + '?chat',
                content: ctx.content()
            }
        ], true);
    });

};
