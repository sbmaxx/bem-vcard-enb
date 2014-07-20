# bem vcard

![vcard example](https://raw.githubusercontent.com/sbmaxx/bem-vcard-enb/v2/example.png)

Визитная карточка по БЭМ:
* сборка на enb;
* шаблоны на bh;
* stylus;
* заинлайненные SVG-логотипы для поддержки Retina;
* заинлайненная статика (JS, CSS);
* borschik (uglify js) для минимизации статики;
* plain javascript*;
* 0 внешних запросов, всего 38.9KB;
* корректная поддержка различных разрешений.

\* — для версии с bem-core/bem-components необходимо переключиться на ветку `v2`

##Development
```bash
git clone https://github./sbmaxx/bem-vcard-enb.git
cd bem-vcard-enb
make install
make
```
Данные править в `data.js` в корне проекта.

##Production
```bash
make production
scp pages/index/index.html $HOSTING:/var/www/
scp -r blocks/font/ $HOSTING:/var/www/blocks/font/
```

http://rozhdestvenskiy.ru
