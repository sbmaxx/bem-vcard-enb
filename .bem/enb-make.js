module.exports = function(config) {
    config.node('desktop.bundles/index');

    config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
            new (require('enb/techs/bemdecl-from-bemjson'))(),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('enb/techs/js'))(),
            new (require('enb/techs/css'))(),
            new (require('enb/techs/css-ie'))(),
            new (require('enb/techs/css-ie6'))(),
            new (require('enb/techs/css-ie7'))(),
            new (require('enb/techs/css-ie8'))(),
            new (require('enb/techs/css-ie9'))(),
            new (require('enb-bemhtml/techs/bemhtml'))(),
            new (require('enb/techs/html-from-bemjson'))()
        ]);
        nodeConfig.addTargets([
            '?.html', '_?.js', '_?.css', '_?.ie.css', '_?.ie6.css', '_?.ie7.css', '_?.ie8.css', '_?.ie9.css'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.ie.css', destTarget: '_?.ie.css' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.ie6.css', destTarget: '_?.ie6.css' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.ie7.css', destTarget: '_?.ie7.css' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.ie8.css', destTarget: '_?.ie8.css' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.ie9.css', destTarget: '_?.ie9.css' })
            ]);
        });
    });
    config.mode('production', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.ie.css', destTarget: '_?.ie.css' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.ie6.css', destTarget: '_?.ie6.css' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.ie7.css', destTarget: '_?.ie7.css' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.ie8.css', destTarget: '_?.ie8.css' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.ie9.css', destTarget: '_?.ie9.css' })
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'bem-bl/blocks-common',
        'bem-bl/blocks-desktop',
        'bemhtml/common.blocks',
        'common.blocks',
        'desktop.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
