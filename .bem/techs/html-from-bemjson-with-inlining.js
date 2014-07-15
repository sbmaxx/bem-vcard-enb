module.exports = require('enb-bh/techs/html-from-bemjson').buildFlow()
    .name('html-from-bemjson-with-inlining')
    .useSourceFilename('js', '_?.js')
    .useSourceFilename('css', '_?.css')
    .createTech();
