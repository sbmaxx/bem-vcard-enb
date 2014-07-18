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
	@$(BOWER) install

.PHONY: production development
production development:
	YENV=$@ $(ENB) make $(ENB_FLAGS) pages/index
	scp -P pages/index/index.html rozhdestvenskiy.ru:/var/www/vhosts/rozhdestvenskiy.ru/public/

.PHONY: clean
clean::
	$(ENB) make clean
