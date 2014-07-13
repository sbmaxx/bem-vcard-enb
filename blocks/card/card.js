modules.define('card', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('card', {

        onSetMod: {
            js: {
                inited: function() {

                    this._sides = this.elem('side').map(function(i, elem) {
                        elem = $(elem);
                        return {
                            lang: this.getMod(elem, 'lang'),
                            elem: elem
                        };
                    }.bind(this)).toArray();

                    this.bindToWin('hashchange', this._onHashChange);

                    this._onHashChange();

                    this.nextTick(function() {
                        this
                            .setMod('animation')
                            .setMod('visible');
                    });

                }
            }
        },

        _onHashChange: function(e) {
            var lang = this._getLangFromHash();
            lang && this.changeLang(lang);
        },

        changeLang: function(lang) {
            this._changeTitle(lang);
            this._changeFavicon(lang);
            this._switchSide(lang);
            this._changeUrl(lang);
        },

        _changeTitle: function(lang) {
            document.title = this.params.titles[lang];
            return this;
        },

        _changeFavicon: function(lang) {
            $('link[rel="shortcut icon"]').attr('href', this.params.favicons[lang]);
            return this;
        },

        _changeUrl: function(lang) {

            var link;

            this.elem('link').each(function(i, elem) {
                elem = $(elem);
                link = this.findBlockOn(elem, 'link');
                link.setMod('disabled', this.hasMod(elem, 'lang', lang));
            }.bind(this));

            return this;

        },

        _switchSide: function(lang) {

            var to,
                from;

            this._sides.forEach(function(side) {
                if (side.lang === lang) {
                    to = side.elem;
                } else {
                    from = side.elem;
                }
            });

            this.delMod(to, 'state', 'closed');

            if (this.hasMod('animation')) {
                setTimeout(function() {
                    this.setMod(from, 'state', 'closed');
                    this.setMod(to, 'state', 'opened');
                }.bind(this), 100);
            } else {
                this.setMod(from, 'state', 'closed');
                this.setMod(to, 'state', 'opened');
            }

            return this;

        },

        _getLangFromHash: function() {
            var lang = location.hash.match(/l=(\w{2})/);
            return lang ? lang[1] : '';
        }

    }, {
        live: false
    });

    provide(BEMDOM);

});
