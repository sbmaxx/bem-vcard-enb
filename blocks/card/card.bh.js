module.exports = function(bh) {

    var i18n = {
        ru: {
            tel: 'тел.: ',
            telExt: ', доб. ',
            fax: 'факс: ',
            cell: 'моб.: ',
            site: '',
            skype: 'skype: '
        },
        en: {
            tel: 'tel. ',
            telExt: ' ext. ',
            fax: 'fax ',
            cell: 'cell. ',
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
            titles: titles,
            favicons: json.favicons
        });

        var content = [];

        json.order.forEach(function(lang) {
            content.push({
                elem: 'side',
                mix: [{ elem: 'layout' }],
                attrs: {
                    'data-lang': lang,
                    'itemscope': true,
                    'itemtype' : 'http://data-vocabulary.org/Person'
                },
                mods: {
                    lang: lang,
                    state: 'opened'
                },
                content: [
                    {
                        elem: 'rectangle-container',
                        content: {
                            elem: 'rectangle',
                            data: json.cards[lang]
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
                     elem: 'link',
                     attrs: {
                         'data-lang': lang
                     },
                     elemMods: mods,
                     url: '#' + lang,
                     content: lang
                 };

             })
        });

        ctx.content(content, true);

    });

    bh.match('card__rectangle', function(ctx, json) {

        json.data.contact.workRaw = json.data.contact.work.replace(/\(|\)|\s|\-/g, '');
        json.data.contact.cellRaw = json.data.contact.cell.replace(/\(|\)|\s|\-/g, '');

        ctx.content([
            {
                elem: 'logo',
                lang: json.data.lang,
                site: json.data.company.site,
                name: json.data.company.name
            },
            {
                elem: 'text',
                content: [
                    {
                        elem: 'title',
                        data: {
                            name: json.data.name,
                            position: json.data.position
                        },
                        lang: json.data.lang
                    },
                    {
                        elem: 'address',
                        data: json.data.address,
                        lang: json.data.lang
                    },
                    {
                        elem: 'contact',
                        data: json.data,
                        lang: json.data.lang
                    },
                    {
                        elem: 'extra',
                        data: json.data.extra,
                        lang: json.data.lang
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

    bh.match('card__name', function(ctx, json) {
        ctx.tag('h1');
        ctx.attrs({
            itemprop: 'name'
        });
    });

    bh.match('card__position', function(ctx) {
        ctx.attrs({
            itemprop: 'title'
        });
    });

    bh.match('card__address', function(ctx, json) {

        var order = json.lang === 'ru'
            ? ['country', 'city', 'zip']
            : ['city', 'zip', 'country'];

        ctx.attrs({
            itemprop: 'address',
            itemscope: true,
            itemtype: 'http://data-vocabulary.org/Address'
        });

        var content = [];

        order.forEach(function(el, i) {
            content.push({
                elem: el,
                content: json.data[el]
            });
            if (i !== order.length - 1) {
                content.push(', ');
            }
        });

        content.push(
            { tag: 'br' },
            {
                elem: 'street-address',
                content: json.data['street-address']
            }
        );

        ctx.content(content, true);

    });

    bh.match('card__country', function(ctx) {
        ctx.tag('span');
        ctx.attrs({
            itemprop: 'country-name'
        });
    });

    bh.match('card__city', function(ctx) {
        ctx.tag('span');
        ctx.attrs({
            itemprop: 'locality'
        });
    });

    bh.match('card__zip', function(ctx) {
        ctx.tag('span');
        ctx.attrs({
            itemprop: 'postal-code'
        });
    });

    bh.match('card__street-address', function(ctx) {
        ctx.tag('span');
        ctx.attrs({
            itemprop: 'street-address'
        });
    });

    bh.match('card__contact', function(ctx, json) {

        var content = [],
            data = json.data.contact;

        data.work && content.push({
            elem: 'tel',
            elemMods: { type: 'work' },
            content: [
                i18n[json.lang].tel,
                data.work,
                data.workExt
                    ? i18n[json.lang].telExt + data.workExt
                    : ''
            ]
        });

        data.cell && content.push({
            elem: 'tel',
            elemMods: { type: 'cellular' },
            content: [
                i18n[json.lang].cell,
                data.cell
            ]
        });

        content.push({
            elem: 'gap'
        });

        ['email', 'site'].forEach(function(prop) {
            if (data[prop]) {
                content.push({
                    elem: prop,
                    data: data[prop]
                })
            }
        });

        content.push({
            elem: 'gap'
        });

        ['skype','github'].forEach(function(prop) {
            if (data[prop]) {
                content.push({
                    elem: prop,
                    data: json.data.nickname || data[prop]
                });
            }
        });

        ctx.content(content, true);

    });

    bh.match('card__site', function(ctx, json) {
        ctx.content({
            elem: 'link',
            attrs: {
                itemprop: 'url'
            },
            url: json.data.url,
            content: json.data.text
        }, true);
    });

    bh.match('card__email', function(ctx, json) {
        ctx.content({
            elem: 'link',
            url: 'mailto:' + json.data,
            content: json.data
        }, true);
    });

    bh.match('card__github', function(ctx, json) {
        ctx.content({
            elem: 'link',
            url: '//github.com/' + json.data,
            content: 'github.com/' + json.data
        }, true);
    });

    bh.match('card__skype', function(ctx, json) {
        ctx.content([
            'skype: ',
            {
                elem: 'link',
                url: 'skype:' + json.data + '?chat',
                content: {
                    tag: 'span',
                    attrs: {
                        itemprop: 'nickname'
                    },
                    content: json.data
                }
            }
        ], true);
    });

    bh.match('card__link', function(ctx, json) {
        ctx.tag('a');
        ctx.attrs({
            href: json.url
        });
    });

};
