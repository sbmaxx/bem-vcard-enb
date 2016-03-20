module.exports = require('enb-bemxjst/techs/bemjson-to-html').buildFlow()
    .name('html-from-bemjson-with-inlining')
    .useSourceFilename('footJs', '?.min.js')
    .useSourceFilename('footCss', '?.inline.min.css')
    .useSourceFilename('headCss', '?.min.css')
    .createTech();
