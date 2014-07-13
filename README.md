# bem vcard

Визитная карточка по БЭМ:
* сборка на enb;
* bem-core v2;
* bem-components v2;
* шаблоны на bh;
* stylus;
* заинлайненные SVG-логотипы для поддержки Retina;
* borschik (uglify js) для минимизации статики;
* корректная поддержка различных разрешений.

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
scp pages/index/_index.js $HOSTING:/var/www/
scp pages/index/_index.css $HOSTING:/var/www/
scp -r blocks/font/ $HOSTING:/var/www/blocks/font/
```

http://rozhdestvenskiy.ru
