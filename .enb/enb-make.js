var techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        stylus: require('enb-stylus/techs/stylus'),

        // js
        browserJs: require('enb-js/techs/browser-js'),

        // bemhtml
        bemhtml: require('enb-bemxjst/techs/bemhtml'),
        bemjsonToHtml: require('./techs/html-from-bemjson-with-inlining')
    },
    enbBemTechs = require('enb-bem-techs');

module.exports = function(config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('pages/index', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: [ 'blocks' ] }],
            [techs.fileProvider, { target: '?.bemjson.js' }],
            [techs.fileProvider, { target: '?.bemdecl.js' }],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // для "больших" ресурсов — картинки/шрифты
            // большая часть визуального оформления приезжает в head, всё "ненужное" — в подвале
            [techs.fileProvider, { target: '?.inline.bemdecl.js' }],
            [enbBemTechs.deps, { target: '?.inline.deps.js', bemdeclFile: '?.inline.bemdecl.js' }],
            [enbBemTechs.files, { filesTarget: '?.inline.files', dirsTarget: '?.inline.dirs', depsFile: '?.inline.deps.js' }],

            // css
            [techs.stylus, {
                target: '?.css',
                sourcemap: false,
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],

            [techs.stylus, {
                target: '?.inline.css',
                filesTarget: '?.inline.files',
                sourcemap: false,
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],


            // bemhtml
            [techs.bemhtml, { sourceSuffixes: ['bemhtml.js'] }],

            // html
            [techs.bemjsonToHtml],

            // js
            [techs.browserJs, { target: '?.js' }],

            // borschik
            [techs.borschik, { source: '?.js', target: '?.min.js', minify: isProd }],
            [techs.borschik, { source: '?.css', target: '?.min.css', tech: 'cleancss', minify: isProd }],
            [techs.borschik, { source: '?.inline.css', target: '?.inline.min.css', tech: 'cleancss', minify: isProd }]
        ]);

        nodeConfig.addTargets(['?.html', '?.min.js', '?.min.css', '?.inline.min.css']);
    });
};
