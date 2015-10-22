<img src="logo.png" alt="workwork" width="35%" />

[workwork](https://soundcloud.com/subpop/clipping-work-work-feat-cocc) is a bunch of shell and Ansible provisioning scripts that ensure all MWN developers are using the same tools, the same way.

[workwork](http://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3) has been designed to be run right after a fresh OS install, so mileage may vary on established machines. If you come across any errors or bad code: fix, document, and [create a pull request](https://help.github.com/articles/creating-a-pull-request/) :ok_hand:

## Requirements
- Supported 64-bit Unix operating system
  - OS X 10.11
  - Debian 9
- `sudo` and `curl`

## Installation
Open your terminal of choice, and run
``` sh
$ curl -L workwork.mamamianetwork.com | sh
```
If the Ansible playbook ends early, you can safely kick it off again with
``` sh
$ ww --install
```

## FAQ
### I'm not sure piping a random script to shell is a [good idea](http://www.seancassidy.me/dont-pipe-to-your-shell.html)
Hey, good one for pointing that out! Clicking on each of the headline links in the summary below to check the code prior to installing is _highly recommended_. You can also download the repo and run the script locally if you are worried about getting disconnected from the internet while the script is running.

### In summary, what does this actually do?
##### 1. [`install`](install) (barebones install)
- Ensure your system meets base requirements
- Install [Homebrew](http://brew.sh/) (OS X only), which will prompt to install [Xcode Command Line Tools](https://developer.apple.com/xcode/downloads/)
- Update package lists
- Install
  - [Git](http://git-scm.com/downloads/)
  - [Ansible](http://docs.ansible.com/intro_installation.html)
- Clone this repo into `~/workspace/mwn-workwork/`
- Run the Ansible playbook which starts the actual install

##### 2. [`ansible/install.yml`](ansible/install.yml) (actual install)
- Symlink `bin/ww` to `/usr/local/bin/ww`
- Install
  - [Docker Engine](https://docs.docker.com/installation/) (Linux only)
  - [Docker Toolbox](https://www.docker.com/toolbox/) (OS X only)
  - [MySQL](http://dev.mysql.com/downloads/installer/)
  - [PHP](http://php.net/downloads.php)
    - [Composer](https://getcomposer.org/download/)
    - [WP-CLI](http://wp-cli.org/)
  - [Node.js](http://nodejs.org/download/)
    - [Bower](http://bower.io/#install-bower)
    - [Grunt](http://gruntjs.com/getting-started/)
  - [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
    - [Sass](http://sass-lang.com/install/)
- Make a workwork group, and add the group to the current user
- Disable sudo password for workwork group (to reduce playbook friction)
- Add `docker-machine shellinit` to `.bashrc` or `.zshrc` and `.bash_profile` (OS X only)
- Create and start default `docker-machine` (OS X only)

## Next steps
Once finished, close your terminal window and head over to one of the site repositories.  
There, you can read up on how to initialise your first site!

:thumbsup:

## Known issues

### OS X

#### Provision fails when installing homebrew casks
There may be issues when installing workwork for the first time over a slow connection on new machines running OS X. If the `install homebrew casks` task fails, install [Docker Toolbox](https://www.docker.com/toolbox) manually, then run:
``` sh
$ ww --install --extra-vars="skip_casks=true"
```

### Linux

#### Initial requirements missing on some linux distributions
Debian does not ship with `sudo` or `curl`, so you're likely to get the error `curl: command not found` when trying to install workwork on a fresh OS install. You will need to run the following:
``` sh
$ su
$ apt-get install -y sudo curl
$ adduser $(logname) sudo
$ exit
$ su - $USER
```
This will install the base requirements, add the logged in user to the sudo group, and reload the user group assignments without having to log out.
