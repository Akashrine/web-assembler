#[Node.js](http://nodejs.org/)

##Installing Node.js

On Linux Just follow the instructions to get your system up to date with all of the required dependencies.

`sudo apt-get install build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion`

The best way to install Node.js is installing with [nvm](https://github.com/creationix/nvm).

cURL:
`$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh`

Wget:

`$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh`

Once installed, restart the terminal and run the following command to install Node.js.

`$ nvm install 0.10`

Or you can download the [installer](http://nodejs.org/) and install it.

### Manually install nvm

```
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

To activate nvm, you need to source it from your bash shell
`source ~/.nvm/nvm.sh`

Add this to ~/.bashrc, ~/.profile, or ~/.zshrc file to have it automatically sourced upon login.

```
#==============================================================================
#Node.js
#==============================================================================
export NVM_HOME="$HOME/.nvm"
if [ -f "$NVM_HOME/nvm.sh" ]; then
    source "$NVM_HOME/nvm.sh"
fi

if [ -r $NVM_HOME/bash_completion ]; then
    . $NVM_HOME/bash_completion
fi
#==============================================================================
```

### Using nvm

To download, compile, and install the latest v0.10.x release of node, do this:
```
nvm install 0.10
nvm ls
node --version
node -v
```

And then in any new shell just use the installed version:
```
nvm use 0.10
nvm alias latest 0.10
nvm alias default 0.10
nvm unalias latest
```

## NPM

Npm is node package modules, node js package manager.

### Getting help:
npm has a lot of help documentation about all of its commands. The npm help command is your best friend. You can also tack --help onto any npm command to get help on that one command.
`npm help npm`

### Installing stuff:

npm install blerg installs the latest version of blerg. You can also give install a tarball, a folder, or a url to a tarball. If you run npm install without any arguments, it tries to install the current folder.
`npm install`

### Showing things:

The npm ls command shows what's on your system, and also what's available in the registry. The arguments are beautifully colored greps.
`npm ls`
`npm ls express`

### Updating packages:

The update command does a few things.

Search the registry for new versions of all the packages installed.
If there's a newer version, then install it.
Point dependent packages at the new version, if it satisfies their dependency.
Remove the old versions, if no other package names them as a dependency.
So basically, update behaves a lot like a "standard" package manager's update command, except that it also checks to make sure that the new version isn't going to break anything before it points stuff at it.

`npm update -g npm`

### Making a Package: The package.json file.

The package.json file goes in the root of your package. It tells npm how your package is structured, and what to do to install it.

Most of the time, you only need the "name", "version", and "main" fields (even for node-waf compiled addons).

`npm init`

### Add npm tab completion to shell

```
#==============================================================================
#Node.js
#==============================================================================

npm tab completion.
if npm -v >/dev/null 2>&1; then
    . <(npm completion)
fi

#==============================================================================
```

### Search for packages
```
npm search ncurses
npm search supervisor
```

### View details for packages
```
npm view ncurses
npm view ncurses licenses
npm view ncurses dependencies
npm view ncurses repository.type
```

### Local install packages to a folder
```
npm install express
npm uninstall express
```
### Global install packages
```
npm install express -g
npm ls -g
```

### Uninstall packages
```
npm uninstall express -g
```






