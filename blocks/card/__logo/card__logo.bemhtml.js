/*global block,tag,attrs,content*/
block('card').elem('logo')(
    tag()('a'),
    attrs()(function() {
        return {
            href: this.ctx.site
        };
    }),
    content()(function() {
        return {
            tag: 'span',
            content: this.ctx.name,
            attrs: {
                itemprop: 'affiliation'
            }
        };
    })
);
