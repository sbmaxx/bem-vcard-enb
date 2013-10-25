BEM.DOM.decl({ name: 'card' }, {

    onSetMod : {
        js : function() {
            BEM.blocks['link'].on(this.elem('link'), 'click', this._onClick, this);
        }
    },

    _onClick: function(e) {

        var current = e.target.domElem,
            lang = this.getMod(current, 'lang');

        this.findBlockOn('link', { block: 'link',  modName: 'disabled', modVal: 'yes' })
            .delMod('disabled');

        this.findBlockOn(current, 'link').setMod('disabled', 'yes');

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

        this.afterCurrentEvent(function() {
            this.setMod(opened, 'state', 'closed');
            this.setMod(current, 'state', 'opened');
        });

        return this;

    }


});
