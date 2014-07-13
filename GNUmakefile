NODE_MODULES := ./node_modules/

ENB := $(NODE_MODULES).bin/enb
NPM := npm

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

install:
	@$(NPM) install
	patch node_modules/enb-stylus/techs/css-stylus.js < css-stylus.patch
	bower install

.PHONY: clean
clean::
	$(ENB) make clean
