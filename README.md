<img src="logo.png" alt="workwork" width="35%" />

[workwork](https://soundcloud.com/subpop/clipping-work-work-feat-cocc) is a bunch of shell and Ansible provisioning scripts that ensure all MWN developers are using the same tools, the same way.

[workwork](http://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3) has been designed to be run right after a fresh OS install, so mileage may vary on established machines. If you come across any errors or bad code: fix, document, and [create a pull request](https://help.github.com/articles/creating-a-pull-request/) :ok_hand:

## Requirements
- 64-bit Unix operating system (known working: OS X 10.9+, Debian 8)
- `sudo` and `curl`

## Installation
Open your terminal of choice, and run
``` sh
$ curl workwork.mamamianetwork.com/install | sh
```

## FAQ
### What does this actually do?
1. Run install shell script (`install`)
  - Ensure your system meets requirements
  - Install (OS X only)
    - [Xcode Command Line Tools](https://developer.apple.com/xcode/downloads/)
    - [Homebrew](http://brew.sh/)
  - Update package lists
  - Install
    - [Git](http://git-scm.com/downloads/)
    - [Ansible](http://docs.ansible.com/intro_installation.html)
  - Clone this repo into `~/workspace/mwn-workwork/`
2. Run the Ansible playbook (`install.yml`)
  * Add the bin folder of this repo to the PATH via dotfiles
  * Add `eval $(docker-machine env default)` to dotfiles (OS X only)
  * Install
    * [Docker](https://docs.docker.com/installation/) (Linux only)
    * [Docker Toolbox](https://www.docker.com/toolbox/) (OS X only)
    * [MySQL](http://dev.mysql.com/downloads/installer/)
    * [PHP](http://php.net/downloads.php)
      * [Composer](https://getcomposer.org/download/)
    * [Node.js](http://nodejs.org/download/)
      * [Bower](http://bower.io/#install-bower)
      * [Grunt](http://gruntjs.com/getting-started/)
    * [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
      * [Sass](http://sass-lang.com/install/)

### I'm not sure piping a random script to shell is a [good idea](http://www.seancassidy.me/dont-pipe-to-your-shell.html)
Hey, good one for pointing that out! Please check out the [install](https://raw.githubusercontent.com/mamamia/mwn-workwork/master/install) script and [workstation.yml](https://raw.githubusercontent.com/mamamia/mwn-workwork/master/ansible/workstation.yml) prior to running to make sure there are no commands that might hurt your system. You can also download the repo and run the script locally if you are worried about getting disconnected from the internet while running the script.

## Next steps
Once finished, close your terminal window and head over to one of the site repositories.  
There, you can read up on how to initialise your first site!

:thumbsup:

## Known issues

### Provision fails when installing homebrew casks
There may be issues when installing workwork for the first time over a slow connection on new machines running OS X. If the `install homebrew casks` task fails, install [Docker Toolbox](https://www.docker.com/toolbox) manually, then run:
``` sh
$ ww --install --extra-vars="skip_casks=true"
```

### Sudo errors
Sometimes `sudo` escalation will time out when installing workwork before Ansible has a chance to run the task that required `sudo` access. If this happens, just run the provision script again.
``` sh
$ ww --install
```

### Script jumps ahead before docker containers have finished downloading
Docker containers are currently started with bash commands instead of Ansible, so running `ww init [site]` on a new machine may yield unpredictable results. If you come across any errors, just run the init script again after the docker containers have finished downloading.
