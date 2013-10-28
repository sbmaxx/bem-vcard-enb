({
    block: 'b-page',
    title: 'Роман Рождественский — sbmaxx@yandex-team.ru',
    favicon: '//yandex.st/morda-logo/i/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'js', url: 'http://yandex.st/jquery/1.9.1/jquery.min.js' },
        { elem: 'js', url: '_index.js' },
        {
            elem: 'meta',
            attrs: {
                name: 'viewport',
                content: 'width=600, initial-scale=1.0'
            }
        }
    ],
    content: {
        block: 'card',
        cards: [
            {
                lang: 'ru',
                i18n: {
                    tel: 'тел.: ',
                    fax: 'факс: ',
                    cellular: 'моб.: ',
                    phoneAdd: ', доб. '
                },
                data: {
                    name: 'Роман Рождественский',
                    position: 'Руководитель группы разработки интерфейсов мультимедийных поисков',
                    contact: {
                        country: 'Россия',
                        locality: 'Москва',
                        zip: '119021',
                        address: 'ул. Льва Толстого, д. 16',
                        phone: '+7 (495) 739-70-00',
                        phoneAdd: '6598',
                        cellular: '+7 (965) 21-404-62',
                        site: 'yandex.ru'
                    },
                    extra: {
                        email: 'sbmaxx@yandex-team.ru',
                        skype: 'sbmaxx',
                        github: 'sbmaxx'
                    }
                }
            },
            {
                lang: 'en',
                i18n: {
                    tel: 'tel. ',
                    fax: 'fax ',
                    cellular: 'cel. ',
                    phoneAdd: ' ext. '
                },
                data: {
                    name: 'Roman Rozhdestvenskiy',
                    position: 'Team leader at group of multimedia search interfaces',
                    contact: {
                        country: 'Russia',
                        locality: 'Moscow',
                        zip: '119021',
                        address: '16, Leo Tolstoy St.',
                        phone: '+7 (495) 739-70-00',
                        phoneAdd: '6598',
                        cellular: '+7 (965) 21-404-62',
                        site: 'yandex.com'
                    },
                    extra: {
                        email: 'sbmaxx@yandex-team.ru',
                        skype: 'sbmaxx',
                        github: 'sbmaxx'
                    }
                }
            }
        ]
    }
})
