# Service Task
## Installation instructions
Install NVM
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
	export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
Install Node with NVM
	nvm install node
Install Service Task
	npm i
## Run Service task in development mode
	node .

Explore your [new instance](http://localhost:3000/)
## Setup production mode
...
