var fs = require('fs'),
    path = require('path'),
    data = require(path.resolve(__dirname, '../../data.js'));

var inline = {
    headCss: fs.readFileSync(path.resolve(__dirname, 'index.min.css'), { encoding: 'utf8' }),
    footJs: fs.readFileSync(path.resolve(__dirname, 'index.min.js'), { encoding: 'utf8' }),
    footCss: fs.readFileSync(path.resolve(__dirname, 'index.inline.min.css'), { encoding: 'utf8' })
};

module.exports = getBEMJSON(data);
module.exports.getBEMJSON = getBEMJSON;

function getBEMJSON(data) {
    var lang = data.order[0],
        title = data.cards[lang].name;

    return {
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
                content: inline.headCss
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
                elem: 'css',
                content: inline.footCss
            },
            {
                tag: 'script',
                content: inline.footJs
            },
            data.metrikaId ? {
                block: 'metrika',
                metrikaId: data.metrikaId
            } : ''
        ]
    };
}
