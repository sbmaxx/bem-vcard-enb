var Card = {

    init: function() {

        this.card = document.querySelector('.card');
        this.params = JSON.parse(this.card.dataset.bem).card;

        var toArray = Array.prototype.slice,
            fillLang = function(elem) {
                console.log('elem: ', elem);
                console.log('elem: ', elem.dataset && elem.dataset.lang);
                return {
                    lang: elem.dataset.lang,
                    elem: elem
                };
            };

        this.sides = toArray.call(this.card.querySelectorAll('.card__side'));
        this.links = toArray.call(this.card.querySelectorAll('.card__switch .card__link'));

        this.sides = this.sides.map(fillLang);
        this.links = this.links.map(fillLang);

        window.addEventListener('onhaschange', Card._onHashChange, false);

        this._onHashChange();

        setTimeout(function() {
            addClass(Card.card, 'card_animation');
            addClass(Card.card, 'card_visible');
        }, 0);

    },
    _onHashChange: function() {
        var lang = this._getLangFromHash();
        lang && this.changeLang(lang);
    },

    changeLang: function(lang) {
        console.log('lang: ', lang);
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
        document.querySelector('link[rel="shortcut icon"]').setAttribute('href', this.params.favicons[lang]);
        return this;
    },

    _changeUrl: function(lang) {

        var link;

        this.links.forEach(function(link) {
            if (link.lang === lang) {
                addClass(link.elem, 'link_disabled');
            } else {
                removeClass(link.elem, 'link_disabled');
            }
        });

        return this;

    },

    _switchSide: function(lang) {

        var to,
            from;

        this.sides.forEach(function(side) {
            if (side.lang === lang) {
                to = side.elem;
            } else {
                from = side.elem;
            }
        });

        removeClass(to, 'side_state_closed');

        if (hasClass(this.card, 'card_animation')) {
            setTimeout(function() {
                addClass(from, 'card_state_closed');
                addClass(to, 'card_state_opened');
            }, 100);
        } else {
            addClass(from, 'card_state_closed');
            addClass(to, 'card_state_opened');
        }
        return this;

    },

    _getLangFromHash: function() {
        var lang = location.hash.match(/l=(\w{2})/);
        return lang ? lang[1] : '';
    }

};

function addClass(elem, className) {
    elem.className += ' ' + className;
}

function removeClass(elem, className) {

    if (!hasClass(elem, className)) {
        return;
    }

    var classes = elem.className.split(' '),
        idx = classess.indexOf(className);

    classes.splice(idx, 1);

    elem.className = classes.join(' ');

}

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) !== -1
}
