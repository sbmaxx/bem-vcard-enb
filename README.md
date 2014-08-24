# bem vcard

![vcard example](https://raw.githubusercontent.com/sbmaxx/bem-vcard-enb/plainjs/example.png)

Визитная карточка по БЭМ:
* сборка на [enb](https://github.com/enb-make/enb);
* шаблоны на [bh](https://github.com/enb-make/bh);
* [stylus](https://github.com/learnboost/stylus);
* заинлайненные SVG-логотипы для поддержки Retina;
* заинлайненная статика (JS, CSS);
* [borschik](https://github.com/bem/borschik) для минимизации статики;
* plain javascript на клиенте*;
* нет внешних запросов;
* полный размер документа всего 38.9KB;
* корректная поддержка различных разрешений на мобильных устройствах;
* поддержка [Person microdata](http://www.data-vocabulary.org/Person).

\* — для версии с bem-core/bem-components необходимо переключиться на ветку `v2`

##Development
```bash
git clone https://github.com/sbmaxx/bem-vcard-enb.git
cd bem-vcard-enb
make install
make
```
Данные править в `data.js` в корне проекта. Файл с данными появляется после `make install` путём копирования `example_data.js`. Это сделано для того, чтобы хранить в репозитории чистые данные, не смешанные с форками.

##Production
```bash
make production
scp pages/index/index.html $HOSTING:/var/www/
scp -r blocks/font/ $HOSTING:/var/www/blocks/font/
```

https://rozhdestvenskiy.ru
