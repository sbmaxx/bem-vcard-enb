modules.define('i-bem__dom', function(provide, BEMDOM) {
///////////
    BEMDOM.decl({ name: 'card' }, {

        _onClick: function(e) {

            var current = $(e.currentTarget),
                lang = this.getMod(current, 'lang');

            this.findBlockOn('link', { block: 'link',  modName: 'disabled', modVal: 'yes' })
                .delMod('disabled');

            e.block.setMod('disabled', 'yes');

            this
                .switchSide(lang)
                .changeTitle(lang);

        },

        changeTitle: function(lang) {

            document.title = this.params[lang];
            return this;

        },

        switchSide: function(lang) {

            var current = this.elem('side', 'lang', lang),
                opened = this.elem('side', 'state', 'opened');

            this.delMod(current, 'state', 'closed');

            this.nextTick(function() {
                this.setMod(opened, 'state', 'closed');
                this.setMod(current, 'state', 'opened');
            });

            return this;

        }

    }, {
        live: function() {
            console.log('lviebindto');
            this.liveBindTo('link', 'click', function(e) {
                this._onClick(e);
            });
        }
    });

    provide(BEMDOM);

});
