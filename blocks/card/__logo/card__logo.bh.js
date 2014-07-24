module.exports = function(bh) {

    bh.match('card__logo', function(ctx, json) {

        ctx.content([
            {
                tag: 'a',
                attrs: {
                    href: 'http://' + json.site
                },
                content:
                    {
                        tag: 'span',
                        content: json.name,
                        attrs: {
                            itemprop: 'affiliation'
                        }
                    }

            }
        ])

    });

}
