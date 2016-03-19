var fs = require('fs'),
    path = require('path'),
    data = require(path.resolve(__dirname, '../../data.js')),
    lang = data.order[0],
    title = data.cards[lang].name;

module.exports = {
    block: 'page',
    title: title,
    favicon: data.favicons[lang],
    head: [
        {
            elem: 'meta',
            attrs: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        },
        {
            elem: 'css',
            content: fs.readFileSync(path.resolve(__dirname, 'index.min.css'), { encoding: 'utf8' })
        }
    ],
    content: [
        {
            block: 'card',
            order: data.order,
            cards: data.cards,
            favicons: data.favicons
        },
        {
            tag: 'script',
            content: fs.readFileSync(path.resolve(__dirname, 'index.min.js'), { encoding: 'utf8' })
        },
        data.metrikaId ? {
            block: 'metrika',
            metrikaId: data.metrikaId
        } : ''
    ]
};
