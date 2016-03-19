module.exports = require('enb-bemxjst/techs/bemjson-to-html').buildFlow()
    .name('html-from-bemjson-with-inlining')
    .useSourceFilename('js', '?.min.js')
    .useSourceFilename('css', '?.min.css')
    .createTech();
