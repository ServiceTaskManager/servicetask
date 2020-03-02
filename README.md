# Service Task
## Installation instructions

Install NVM

	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
	export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

Install Node with NVM

	nvm install node

Install Firebase

	npm install -g firebase-tools

Install Service Task

	git clone https://github.com/Fulbert/servicetask.git
	cd servicetask
	yarn install

## Run Service task in development mode

	quasar dev -m spa

Explore your [new instance](http://localhost:8080/)

## Run in production mode

	firebase login
	firebase deploy
