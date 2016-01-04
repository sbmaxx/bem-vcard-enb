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
                    freeze: true,
                    tech: 'cleancss'
                }]
            ]);
        });
    });

    config.node("pages/index", function (nodeConfig) {

        nodeConfig.addTechs([
            [require("enb-bem-techs/techs/levels"), {
                levels: getLevels()
            }],
            [require("enb/techs/file-provider"), {
                target: "?.bemjson.js"
            }],
            [require("enb/techs/file-provider"), {
                target: "?.bemdecl.js"
            }],
            // require("enb/techs/bemdecl-from-bemjson"),
            require("enb-bem-techs/techs/deps-old"),
            require("enb-bem-techs/techs/files"),
            [ require('enb-bh/techs/bh-server-include'), {
                jsAttrName: 'data-bem',
                jsAttrScheme: 'json'
            }],
            [ require('enb-diverse-js/techs/browser-js'), {
                target: '?.js'
            }],
            // [ require('enb-modules/techs/prepend-modules'), {
            //     source: '?.pre.js'
            // }],
            require("enb-stylus/techs/stylus"),
            require('./techs/html-from-bemjson-with-inlining')
        ]);

        nodeConfig.addTargets(["_?.js", "_?.css", "?.html"]);

        function getLevels() {

            var ret = [];

            ret.push(config.resolvePath({
                "path": "blocks",
                "check": true
            }));

            return ret;

        }

    });
}
