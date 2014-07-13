var fs = require('fs'),
    inlineJS = fs.readFileSync('./blocks/page/page__inline.js', { encoding: 'utf8' }),
    borschik = new (require('borschik/lib/techs/js').Tech)({ techOptions: {} });

var data = require('../../data.js'),
    lang = data.order[0],
    title = data.cards[lang].name;

var favicons = {
    ru: '//yastatic.net/morda-logo/i/favicon_islands.ico',
    en: '//yastatic.net/morda-logo/i/favicon_comtr.ico'
};

module.exports = {
    block: 'page',
    title: title,
    favicon: favicons[lang],
    head: [
        { elem: 'css', url: '_index.css' },
        {
            elem: 'meta',
            attrs: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        },
        {
            elem: 'js',
            content: borschik.minimize(inlineJS)
        },
        {
            elem: 'meta',
            attrs: {
                name: 'format-detection',
                content: 'telephone=no'
            }
        },
        {
            elem: 'js',
            url: '//yastatic.net/jquery/2.1.1/jquery.min.js'
        },
        {
            elem: 'js',
            url: '_index.js'
        }
    ],
    content: {
        block: 'card',
        order: data.order,
        cards: data.cards,
        favicons: favicons
    }
};
