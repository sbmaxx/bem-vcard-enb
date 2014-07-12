module.exports = function(bh) {

    bh.match('card__logo', function(ctx, json) {

        ctx.tag('a');

        ctx.attrs({
            target: '_blank',
            href: 'http://' + json.site
        });

    });

}
