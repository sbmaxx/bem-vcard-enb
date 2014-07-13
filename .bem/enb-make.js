module.exports = function (config) {
    config.mode("development", function () {
        config.node("pages/index", function (nodeConfig) {
            nodeConfig.addTechs([
                [require("enb/techs/file-copy"), {
                    sourceTarget: "?.js",
                    destTarget: "_?.js"
                }],
                [require("enb/techs/file-copy"), {
                    sourceTarget: "?.css",
                    destTarget: "_?.css"
                }]
            ]);
        });
    });
    config.mode("production", function () {
        config.node("pages/index", function (nodeConfig) {
            nodeConfig.addTechs([
                [require("enb-borschik/techs/borschik"), {
                    sourceTarget: "?.js",
                    destTarget: "_?.js",
                    minify: true,
                    freeze: false
                }],
                [require("enb-borschik/techs/borschik"), {
                    sourceTarget: "?.css",
                    destTarget: "_?.css",
                    minify: true,
                    freeze: true
                }]
            ]);
        });
    });

    config.node("pages/index", function (nodeConfig) {
        nodeConfig.addTechs([
            [require("enb/techs/levels"), {
                levels: getLevels()
            }],
            [require("enb/techs/file-provider"), {
                target: "?.bemjson.js"
            }],
            require("enb/techs/bemdecl-from-bemjson"),
            require("enb/techs/deps-old"),
            require("enb/techs/files"),
            [ require('enb-bh/techs/bh-server-include'), {
                jsAttrName: 'data-bem',
                jsAttrScheme: 'json'
            }],
            require('enb-bh/techs/html-from-bemjson'),
            [ require('enb-diverse-js/techs/browser-js'), {
                target: '?.pre.js'
            }],
            [ require('enb-modules/techs/prepend-modules'), {
                source: '?.pre.js'
            }],
            require("enb-stylus/techs/css-stylus-with-autoprefixer")
        ]);
        nodeConfig.addTargets(["?.html", "_?.js", "_?.css"]);

        function getLevels() {

            var libs = ['bem-core', 'bem-components'],
                levels = ['common.blocks', 'desktop.blocks'],
                ret = [];

            libs.forEach(function(lib) {
                levels.forEach(function(level) {
                    ret.push(config.resolvePath({
                        path: 'bower_components/' + lib + '/' + level,
                        check: 'true'
                    }));
                });
            });

            ret.push(config.resolvePath({
                "path": "blocks",
                "check": true
            }));

            return ret;

        }
    });
}
