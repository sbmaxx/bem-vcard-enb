var fs = require('fs'),
    inlineJS = fs.readFileSync('./blocks/page/page__inline.js', { encoding: 'utf8' }),
    borschik = new (require('borschik/lib/techs/js').Tech)({ techOptions: {} });

var data = require('../../data.js'),
    generator = require('../generator/generator.js');

module.exports = generator(data, './');
