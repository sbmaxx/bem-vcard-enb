module.exports = function(bh) {
    bh.match('page', function(ctx) {
        ctx.mix({
            block: 'font',
            mods: { face: 'textbook-new' }
        });
    })
}
