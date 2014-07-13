var fs = require('fs');

module.exports = {
    block: 'page',
    title: 'Роман Рождественский — sbmaxx@yandex-team.ru',
    favicon: '//yastatic.net/morda-logo/i/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' },
        {
            elem: 'meta',
            attrs: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        },
        {
            elem: 'js',
            content: [
                "(function() { \
                    var card, orientation; \
                    card = { \
                        width: 600, \
                        height: 360 \
                    }; \
                    orientation = getOrientation(); \
                    window.addEventListener('orientationchange', function() { \
                        orientation = getOrientation(); \
                        computeAndSetScale(); \
                    }); \
                    function getAvailWidth() { \
                        return window.screen[ orientation === 'landscape' ? 'availHeight' : 'availWidth' ]; \
                    } \
                    function getAvailHeight() { \
                        return window.screen[ orientation === 'landscape' ? 'availWidth' : 'availHeight' ]; \
                    } \
                    function getMetaViewport() { \
                        return document.querySelector('meta[name=\"viewport\"]'); \
                    } \
                    function setInitialScale(scale) { \
                        return getMetaViewport().setAttribute('content', 'width=device-width, initial-scale=' + scale); \
                    } \
                    function getOrientation() { \
                        return Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait'; \
                    } \
                    function computeAndSetScale() { \
                        var width = getAvailWidth(), \
                            height = getAvailHeight(); \
                        if (width > card.width && card.height < height) { \
                            return; \
                        } \
                        if (width < height) { \
                            setInitialScale(width/card.width); \
                        } else { \
                            setInitialScale(height/card.height); \
                        } \
                    } \
                    computeAndSetScale(); \
                }()); \
                "
            ]
        },
        {
            elem: 'meta',
            attrs: {
                name: 'format-detection',
                content: 'telephone=no'
            }
        },
        {
            elem: 'js',
            url: '//yastatic.net/jquery/2.1.1/jquery.min.js'
        },
        {
            elem: 'js',
            url: '_index.js'
        }
    ],
    content: [
        {
            block: 'card',
            order: ['ru', 'en'],
            cards: {
                'ru': {
                    lang: 'ru',
                    name: 'Роман Рождественский',
                    position: 'Руководитель службы интерфейсов мультимедийных поисков',
                    contact: {
                        country: 'Россия',
                        city: 'Москва',
                        zip: '119021',
                        address: 'ул. Льва Толстого, д. 16',
                        phone: '+7 (495) 739-70-00',
                        phoneAdd: '6598',
                        cellular: '+7 (965) 214-04-62',
                        site: 'yandex.ru'
                    },
                    extra: {
                        email: 'sbmaxx@yandex-team.ru',
                        skype: 'sbmaxx',
                        github: 'sbmaxx'
                    }
                },
                'en': {
                    lang: 'en',
                    name: 'Roman Rozhdestvenskiy',
                    position: 'Head of multimedia search interfaces department',
                    contact: {
                        country: 'Russia',
                        city: 'Moscow',
                        zip: '119021',
                        address: '16, Leo Tolstoy St.',
                        phone: '+7 (495) 739-70-00',
                        phoneAdd: '6598',
                        cellular: '+7 (965) 214-04-62',
                        site: 'yandex.com'
                    },
                    extra: {
                        email: 'sbmaxx@yandex-team.ru',
                        skype: 'sbmaxx',
                        github: 'sbmaxx'
                    }
                }
            }
        }
    ]

};
