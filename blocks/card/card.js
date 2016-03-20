var Card = (function() {
    var toArray = Array.prototype.slice;

    var modSideOpened = 'card__side_state_opened';
    var modSideClosed = 'card__side_state_closed';
    var modAnimation = 'card_animation';
    var modVisible = 'card_visible';
    var modLinkDisabled = 'card__link_disabled_yes';

    return {

        init: function() {
            this.card = document.querySelector('.card');
            this.params = JSON.parse(this.card.dataset.bem).card;

            this.sides = toArray.call(this.card.querySelectorAll('.card__side')).map(fillLang);
            this.links = toArray.call(this.card.querySelectorAll('.card__switch .card__link')).map(fillLang);

            // trying to fix google's markup tool
            removeClass(this.sides[1].elem, modSideOpened);
            addClass(this.sides[1].elem, modSideClosed);

            window.addEventListener('hashchange', this._onHashChange.bind(this), false);

            this._onHashChange();

            setTimeout(function() {
                addClass(Card.card, modAnimation);
                addClass(Card.card, modVisible);
            }, 0);

            // drop phone links on desktop
            if (!hasClass(document.documentElement, 'mobile')) {
                setTimeout(function () {
                    toArray.call(document.querySelectorAll('.card__phone-link')).forEach(function(elem) {
                        elem.removeAttribute('href');
                    });
                }, 0);
            }

            function fillLang(elem) {
                return {
                    lang: elem.dataset.lang,
                    elem: elem
                };
            }
        },

        _onHashChange: function() {
            var lang = this._getLangFromHash();
            if (lang) {
                this.changeLang(lang);
            }
        },

        changeLang: function(lang) {
            this
                ._changeTitle(lang)
                ._changeFavicon(lang)
                ._switchSide(lang)
                ._changeUrl(lang);
        },

        _changeTitle: function(lang) {
            document.title = this.params.titles[lang];
            return this;
        },

        _changeFavicon: function(lang) {
            document.querySelector('link[rel="shortcut icon"]').setAttribute('href', this.params.favicons[lang]);
            return this;
        },

        _changeUrl: function(lang) {
            this.links.forEach(function(link) {
                if (link.lang === lang) {
                    addClass(link.elem, modLinkDisabled);
                } else {
                    removeClass(link.elem, modLinkDisabled);
                }
            });

            return this;
        },

        _switchSide: function(lang) {
            var from;
            var to;

            if (this.sides[0].lang === lang) {
                to = this.sides[0].elem;
                from = this.sides[1].elem;
            } else {
                to = this.sides[1].elem;
                from = this.sides[0].elem;
            }

            removeClass(to, modSideClosed);

            if (hasClass(this.card, modAnimation)) {
                setTimeout(doSwitch, 100);
            } else {
                // здесь нельзя просто setTimeout(cb, 100), т.к. в nextTick появится модификатор анимации
                doSwitch();
            }

            function doSwitch() {
                removeClass(from, modSideOpened);
                addClass(from, modSideClosed);
                removeClass(to, modSideClosed);
                addClass(to, modSideOpened);
            }

            return this;
        },

        _getLangFromHash: function() {
            var lang = document.location.hash.match(/(\w{2})/);
            return lang ? lang[1] : '';
        }
    };

    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }

    function removeClass(elem, className) {
        if (!hasClass(elem, className)) {
            return;
        }

        var classes = elem.className.split(/\s/);
        var idx = classes.indexOf(className);

        classes.splice(idx, 1);

        elem.className = classes.join(' ');
    }

    function hasClass(elem, className) {
        return elem.className.split(/\s/).indexOf(className) !== -1;
    }
}());
