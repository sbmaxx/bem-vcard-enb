/*global block,tag,attrs,content,js*/
var i18n = {
    ru: {
        tel: 'тел.: ',
        telExt: ', доб. ',
        fax: 'факс: ',
        cell: 'моб.: '
    },
    en: {
        tel: 'tel. ',
        telExt: ' ext. ',
        fax: 'fax ',
        cell: 'cell. '
    }
};

block('card')(
    js()(function() {
        var titles = {};
        var ctx = this.ctx;

        ctx.order.forEach(function(lang) {
            titles[lang] = ctx.cards[lang].name;
        });

        return {
            titles: titles,
            favicons: ctx.favicons
        };
    }),

    content()(function() {
        var content;
        var ctx = this.ctx;

        content = ctx.order.map((lang, i) => {
            return {
                elem: 'side',
                mix: { elem: 'layout' },
                attrs: {
                    'data-lang': lang,
                    'itemscope': true,
                    'itemtype': 'http://data-vocabulary.org/Person'
                },
                elemMods: {
                    lang: lang,
                    state: i === 0 ? 'opened' : 'closed'
                },
                content: {
                    elem: 'content',
                    mix: { elem: 'rectangle' },
                    data: ctx.cards[lang]
                }
            };
        });

        if (ctx.order.length) {
            content.push({
                elem: 'switch',
                content: ctx.order.map((lang, i) => {
                    return {
                        elem: 'link',
                        attrs: {
                            'data-lang': lang
                        },
                        elemMods: { disabled: i === 0 ? 'yes' : '' },
                        url: '#' + lang,
                        content: lang
                    };
                })
            });
        }

        return content;
    }),

    elem('content').content()(function() {
        var data = this.ctx.data;

        return [
            {
                elem: 'logo',
                lang: data.lang,
                site: data.company.site,
                name: data.company.name
            },
            {
                elem: 'text',
                content: [
                    {
                        elem: 'title',
                        data: {
                            name: data.name,
                            position: data.position
                        },
                        lang: data.lang
                    },
                    {
                        elem: 'address',
                        data: data.address,
                        lang: data.lang
                    },
                    {
                        elem: 'contact',
                        data: data,
                        lang: data.lang
                    },
                    {
                        elem: 'extra',
                        data: data.extra,
                        lang: data.lang
                    }
                ]
            }
        ];
    }),

    elem('title').content()(function() {
        return [
            {
                elem: 'name',
                content: this.ctx.data.name
            },
            {
                elem: 'position',
                content: this.ctx.data.position
            }
        ];
    }),

    elem('name')(
        tag()('h1'),
        attrs()({
            itemprop: 'name'
        })
    ),

    elem('position').attrs()({
        itemprop: 'title'
    }),

    elem('address')(
        attrs()(function() {
            return {
                itemprop: 'address',
                itemscope: true,
                itemtype: 'http://data-vocabulary.org/Address'
            };
        }),

        match(function() { return typeof this.ctx.data !== 'string'; })(
            match(function() { return this.ctx.data.lang === 'ru'; })
                .content()(function() {
                    return [ 'country', 'city', 'zip', 'street-address' ];
                }),

            content()(function() {
                return ['city', 'zip', 'country', 'street-address'];
            }),

            content()(function() {
                var ctx = this.ctx;
                return applyNext().map(function(el, i) {
                    return [
                        i !== 0 ? ', ' : '',
                        {
                            elem: el,
                            content: ctx.data[el]
                        }
                    ];
                })
            })
        )
    ),

    elem('country')(
        tag()('span'),
        attrs()({
            itemprop: 'country-name'
        })
    ),

    elem('city')(
        tag()('span'),
        attrs()({
            itemprop: 'locality'
        })
    ),

    elem('zip')(
        tag()('span'),
        attrs()({
            itemprop: 'postal-code'
        })
    ),

    elem('street-address')(
        tag()('span'),
        attrs()({
            itemprop: 'street-address'
        })
    ),

    elem('contact').content()(function() {
        var content = [];
        var data = this.ctx.data.contact;

        if (data.work) {
            content.push({
                elem: 'tel',
                elemMods: { type: 'work' },
                content: [
                    i18n[this.ctx.lang].tel,
                    {
                        elem: 'phone-link',
                        raw: data.work.replace(/\(|\)|\s|\-/g, ''),
                        content: data.work
                    },
                    data.workExt
                        ? i18n[this.ctx.lang].telExt + data.workExt
                        : ''
                ]
            });
        }

        if (data.cell) {
            content.push({
                elem: 'tel',
                elemMods: { type: 'cellular' },
                content: [
                    i18n[this.ctx.lang].cell,
                    {
                        elem: 'phone-link',
                        raw: data.cell.replace(/\(|\)|\s|\-/g, ''),
                        content: data.cell
                    }
                ]
            });
        }

        content.push({
            elem: 'gap'
        });

        ['email', 'site'].filter((prop) => data[prop]).forEach(function(prop) {
            content.push({
                elem: prop,
                data: data[prop]
            });
        });

        content.push({
            elem: 'gap'
        });

        ['skype', 'github', 'twitter'].filter((prop) => data[prop]).forEach(function(prop) {
            content.push({
                elem: prop,
                content: data[prop]
            });
        });

        return content;
    }),

    elem('phone-link')(
        tag()('a'),
        attrs()(function() {
            return {
                href: 'tel:' + this.ctx.raw
            };
        })
    ),

    elem('site').content()(function() {
        return {
            elem: 'link',
            attrs: {
                itemprop: 'url'
            },
            url: this.ctx.data,
            content: this.ctx.data.replace(/https?:\/\//, '')
        };
    }),

    elem('email').content()(function() {
        return {
            elem: 'link',
            url: 'mailto:' + this.ctx.data,
            content: this.ctx.data
        };
    }),

    elem('github').content()(function() {
        return {
            elem: 'link',
            url: 'https://github.com/' + this.ctx.content,
            content: 'github.com/' + this.ctx.content
        };
    }),

    elem('skype').content()(function() {
        return [
            'skype: ',
            {
                elem: 'link',
                url: 'skype:' + this.ctx.content + '?chat',
                content: {
                    tag: 'span',
                    attrs: {
                        itemprop: 'nickname'
                    },
                    content: this.ctx.content
                }
            }
        ];
    }),

    elem('twitter').content()(function() {
        return {
            elem: 'link',
            url: 'https://twitter.com/' + this.ctx.content,
            content: 'twitter.com/' + this.ctx.content
        };
    }),

    elem('link')(
        tag()('a'),
        attrs()(function() {
            return {
                href: this.ctx.url
            };
        })
    )
);
