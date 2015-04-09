var Card = (function() {

    var toArray = Array.prototype.slice;

    var modSideOpened = 'card__side_state_opened';
    var modSideClosed = 'card__side_state_closed';
    var modAnimation = 'card_animation';
    var modVisible = 'card_visible';
    var modLinkDisabled = 'card__link_disabled';

    return {

        init: function() {

            var fillLang;

            this.card = document.querySelector('.card');
            this.params = JSON.parse(this.card.dataset.bem).card;

            fillLang = function(elem) {
                return {
                    lang: elem.dataset.lang,
                    elem: elem
                };
            };

            this.sides = toArray.call(this.card.querySelectorAll('.card__side'));
            this.links = toArray.call(this.card.querySelectorAll('.card__switch .card__link'));

            this.sides = this.sides.map(fillLang);
            this.links = this.links.map(fillLang);

            // trying to fix google's markup tool
            removeClass(this.sides[1].elem, modSideOpened);
            addClass(this.sides[1].elem, modSideClosed);

            window.addEventListener('hashchange', this._onHashChange.bind(this), false);

            this._onHashChange();

            setTimeout(function() {
                addClass(Card.card, modAnimation);
                addClass(Card.card, modVisible);
            }, 0);

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

            var to,
                from,
                cb

            cb = function() {
                removeClass(from, modSideOpened);
                addClass(from, modSideClosed);
                removeClass(to, modSideClosed);
                addClass(to, modSideOpened);
            };

            this.sides.forEach(function(side) {
                if (side.lang === lang) {
                    to = side.elem;
                } else {
                    from = side.elem;
                }
            });

            removeClass(to, modSideClosed);

            if (hasClass(this.card, modAnimation)) {
                setTimeout(cb,  100);
            } else {
                // здесь нельзя просто setTimeout(cb, 100), т.к. в nextTick появится модификатор анимации
                cb();
            }


            return this;

        },

        _getLangFromHash: function() {
            var lang = location.hash.match(/(\w{2})/);
            return lang ? lang[1] : '';
        }
    }

    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }

    function removeClass(elem, className) {

        if (!hasClass(elem, className)) {
            return;
        }

        var classes = elem.className.split(/\s/),
            idx = classes.indexOf(className);

        classes.splice(idx, 1);

        elem.className = classes.join(' ');

    }

    function hasClass(elem, className) {
        return elem.className.split(/\s/).indexOf(className) !== -1;
    }

}());

var consoleCSS = {
    'font-size': '18px',
    'font-family': '15px',
    'line-height': '50px',
    'margin': '15px',
    'padding': '10px',
    'display': 'inline-block'
};

function stringifyCSS(cssObject) {
    var result = '';

    for (var key in cssObject) {
        result += key + ':' + cssObject[key] + ';'
    }

    return result;
}

if (typeof console !== 'undefined') {
    console.log('%c https://github.com/sbmaxx/bem-vcard-enb', stringifyCSS(consoleCSS));
}
