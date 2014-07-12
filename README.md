# bem vcard

Визитная карточка по БЭМ:
* сборка на enb;
* bem-core v2;
* шаблоны на bh;
* stylus;
* заинлайненные SVG-логотипы для поддержки Retina;
* корректная поддержка различных разрешений.

##Development
```bash
git clone https://github./sbmaxx/bem-vcard-enb.git
cd bem-vcard-enb
make install
make
```

##Production
```bash
YENV=production ./node_modules/.bin/enb make pages/index
```

http://rozhdestvenskiy.ru
