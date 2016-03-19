# bem vcard

![vcard example](https://raw.githubusercontent.com/sbmaxx/bem-vcard-enb/plainjs/example.png)

Визитная карточка по БЭМ:
* сборка на [enb](https://github.com/enb-make/enb);
* шаблоны на [bemhtml](https://github.com/bem/bem-xjst);
* [stylus](https://github.com/learnboost/stylus);
* заинлайненные SVG-логотипы для поддержки Retina;
* заинлайненная статика (JS, CSS);
* [borschik](https://github.com/bem/borschik) для минимизации статики;
* plain javascript на клиенте*;
* нет внешних запросов;
* полный размер документа всего 38.9KB;
* корректная поддержка различных разрешений на мобильных устройствах;
* поддержка [Person microdata](http://www.data-vocabulary.org/Person).

##Development
```bash
git clone https://github.com/sbmaxx/bem-vcard-enb.git
cd bem-vcard-enb
npm install
npm start
```
Свои данные изменять в `data.js` в корне проекта.

##Production
```bash
npm rum prod
```
