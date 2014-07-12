// @copypaste https://github.com/bem/bem-components/tree/v2/common.blocks/link
module.exports = function(bh) {
    bh.match('link_pseudo', function(ctx, json) {
        json.url || ctx.tag('span');
    });
};
