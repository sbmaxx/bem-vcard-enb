NODE_MODULES := ./node_modules/

ENB := $(NODE_MODULES).bin/enb
NPM := npm
BOWER := bower

ifneq (,$(findstring B,$(MAKEFLAGS)))
	ENB_FLAGS := --no-cache
endif

all:: $(ENB) server

%:: $(ENB)
	$(if $(findstring GNUmakefile,$@),,$(ENB) make $@ $(ENB_FLAGS))

.PHONY: server
server:: $(ENB)
	echo "Open http://localhost:8080/pages/index/index.html to see build results."
	@$(ENB) server

$(ENB):: install

.PHONY: install
install:
	@$(NPM) install
	@cp example_data.js data.js

.PHONY: production development
production development:
	YENV=$@ $(ENB) make $(ENB_FLAGS) pages/index

# Deploy
REMOTE_COPY = scp
REMOTE_DOMAIN = rozhdestvenskiy.ru
REMOTE_PATH = /var/www/vhosts/rozhdestvenskiy.ru/public/

.PHONY: deploy
deploy:
	$(REMOTE_COPY) pages/index/index.html $(REMOTE_DOMAIN):$(REMOTE_PATH)
	$(REMOTE_COPY) pages/index/_index.css $(REMOTE_DOMAIN):$(REMOTE_PATH)
	$(REMOTE_COPY) pages/index/_index.js $(REMOTE_DOMAIN):$(REMOTE_PATH)
	ssh $(REMOTE_DOMAIN) "mkdir -p $(REMOTE_PATH)blocks/font"
	$(REMOTE_COPY) -r blocks/font $(REMOTE_DOMAIN):$(REMOTE_PATH)blocks/font

.PHONY: clean
clean::
	$(ENB) make clean
