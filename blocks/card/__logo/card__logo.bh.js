module.exports = function(bh) {

    bh.match('card__logo', function(ctx, json) {

        ctx.tag('a');

        ctx.attrs({
            target: '_blank',
            href: 'http://' + json.site
        });

        ctx.content({
            tag: 'img',
            attrs: {
                width: 110,
                height: 44,
                src: '../../blocks/card/__logo/card__logo_lang_' + json.lang + '.svg'
            }
        });

    });

}
