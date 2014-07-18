module.exports = function(bh) {

    bh.match('card__logo', function(ctx, json) {

        ctx.tag('a');

        ctx.attrs({
            href: 'http://' + json.site
        });

    });

}
