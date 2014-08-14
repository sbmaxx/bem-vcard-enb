var fs = require('fs');
    // borschik = new (require('borschik/lib/techs/js').Tech)({ techOptions: {} });

var favicons = {
    ru: '//yastatic.net/morda-logo/i/favicon_islands.ico',
    en: '//yastatic.net/morda-logo/i/favicon_comtr.ico'
};

module.exports = function(data, root, useInline) {

    root = root || '';

    var data = data || require(root + '../../data.js'),
        lang = data.order[0],
        title = data.cards[lang].name;

    return  {
        block: 'page',
        title: title,
        favicon: favicons[lang],
        head: [
            {
                elem: 'meta',
                attrs: {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }
            },
            useInline === false ? {
                elem: 'css',
                url : '_index.css'
            } : {
                elem: 'css',
                content: fs.readFileSync(root + 'pages/index/_index.css', { encoding: 'utf8' })
            }
        ],
        content: [
            {
                block: 'card',
                order: data.order,
                cards: data.cards,
                favicons: favicons
            },
            useInline === false ? {
                tag: 'script',
                attrs: {
                    src: '_index.js'
                }
            } : {
                tag: 'script',
                content: fs.readFileSync(root + 'pages/index/_index.js', { encoding: 'utf8' })
            }
        ]
    };

};
