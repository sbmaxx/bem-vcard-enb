module.exports = function(bh) {

    bh.match('metrika', function(ctx, json) {
        return [
            {
                tag: 'script',
                content: 'Metrika.init(' + json.metrikaId + ')'
            },
            {
                tag: 'noscript',
                content: {
                    tag: 'img',
                    attrs: {
                        src: '//mc.yandex.ru/watch/' + json.metrikaId,
                        style: 'position:absolute; left:-9999px;',
                        alt: ''
                    }
                }
            }
        ];
    });
};
