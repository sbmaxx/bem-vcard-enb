module.exports = function(bh) {

    var i18n = {
        ru: {
            tel: 'тел.: ',
            fax: 'факс: ',
            cellular: 'моб.: ',
            phoneAdd: ', доб. ',
            site: '',
            skype: 'skype: '
        },
        en: {
            tel: 'tel. ',
            fax: 'fax ',
            cellular: 'cell. ',
            phoneAdd: ' ext. ',
            site: '',
            skype: 'skype: '
        }
    };

    bh.match('card', function(ctx, json) {

        var titles = {};

        json.order.forEach(function(lang) {
            titles[lang] =json.cards[lang].name;
        });

        ctx.js({
            titles: titles
        });

        var content = [];

        json.order.forEach(function(lang, i) {
            content.push({
                elem: 'side',
                mix: [{ elem: 'layout' }],
                mods: {
                    lang: lang,
                    state: i === 0 ? 'opened' : 'closed'
                },
                content: [
                    {
                        elem: 'rectangle-container',
                        content: {
                            elem: 'rectangle',
                            card: json.cards[lang]
                        }
                    },
                    {
                        elem: 'triangle-container',
                        content: [
                            { elem: 'triangle'},
                            { elem: 'triangle-shadow' }
                        ]
                    }
                ]
            });
        });

        json.order.length > 1 && content.push({
            elem: 'switch',
            content: json.order.map(function(lang, i) {

                 var mods = i === 0 ? { disabled: true } : null;

                 return {
                     block: 'link',
                     mix: [{
                         block: 'card',
                         elem: 'link',
                         elemMods: {lang: lang }
                     }],
                     mods: mods,
                     url: '#?l=' + lang,
                     content: lang
                 };

             })
        });

        ctx.content(content, true);

    });

    bh.match('card__rectangle', function(ctx, json) {

        ctx.content([
            {
                elem: 'logo',
                lang: json.card.lang,
                site: json.card.contact.site
            },
            {
                elem: 'text',
                content: [
                    {
                        elem: 'title',
                        data: {
                            name: json.card.name,
                            position: json.card.position
                        },
                        lang: json.card.lang
                    },
                    {
                        elem: 'contact',
                        data: json.card.contact,
                        lang: json.card.lang
                    },
                    {
                        elem: 'extra',
                        data: json.card.extra,
                        lang: json.card.lang
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


    bh.match('card__contact', function(ctx, json) {

        var content = [];

        content.push({
            elem: 'address',
            data: json.data,
            lang: json.lang
        });

        json.phone && content.push({
            elem: 'phone',
            content: [
                i18n[json.lang].tel,
                json.data.phone,
                json.data.phoneAdd
                    ? i18n[json.lang].phoneAdd + json.data.phoneAdd
                    : ''
            ]
        });

        ['cellular', 'fax', 'site'].forEach(function(prop) {
            json.data[prop] && content.push({
                elem: prop,
                content: [
                    i18n[json.lang][prop] || '',
                    json.data[prop]
                ].join('')
            });
        });

        ctx.content(content, true);

    });

    bh.match('card__address', function(ctx, json) {

        var order = json.lang === 'ru'
            ? ['country', 'city', 'zip']
            : ['city', 'zip', 'country'];

        var content = [];

        content.push(order.map(function(el) {
            return json.data[el];
        }).join(', '));

        content.push(
            { tag: 'br' },
            json.data.address
        );

        ctx.content(content)

    });

    bh.match('card__site', function(ctx, json) {
        ctx.content({
            block: 'link',
            url: 'http://' + ctx.content(),
            content: ctx.content()
        }, true);
    });

    bh.match('card__extra', function(ctx, json) {
        ctx.content(['email', 'github', 'skype'].map(function(prop) {
            return json.data[prop] ? ({
                elem: prop,
                lang: json.lang,
                content: json.data[prop]
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

    bh.match('card__skype', function(ctx, json) {
        ctx.content([
            i18n[json.lang].skype,
            {
                block: 'link',
                url: 'skype:' + ctx.content() + '?chat',
                content: ctx.content()
            }
        ], true);
    });

};
