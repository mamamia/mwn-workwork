# workwork
[workwork](https://soundcloud.com/subpop/clipping-work-work-feat-cocc) is a bunch of shell and Ansible provisioning scripts that ensure all MWN developers are using the same tools the same way.

[workwork](http://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3) has been designed to be run right after a fresh OS install, so mileage may vary on established machines. If you come across any errors or bad code: fix, document, and [create a pull request](https://help.github.com/articles/creating-a-pull-request/) :ok_hand:

## Requirements

* 64-bit Unix operating system (only OS X and Debian have been tested thus far)
* `sudo` and `curl`

## Installation
Open your terminal and run `curl workwork.mamamia.com.au/install | sh`

## What will this do?
* Run install shell script
  * Check your system against the requirements listed above
  * Install
    * [Xcode Command Line Tools](https://developer.apple.com/xcode/downloads/) (OS X only)
    * [Homebrew](http://brew.sh/) (OS X only)
  * Update package lists
  * Install
    * [Git](http://git-scm.com/downloads/)
    * [Ansible](http://docs.ansible.com/intro_installation.html)
  * Clone this repo into `~/workspace/mwn-workwork/`
* Run Ansible playbook `workstation.yml`
  * Add the bin folder of this repo to the PATH via dotfiles
  * Add `boot2docker shellinit` to dotfiles (OS X only)
  * Install (not in this order)
    * [Docker](https://docs.docker.com/installation/)
      * [docker-compose](http://docs.docker.com/compose/install/)
      * [boot2docker](http://boot2docker.io/) (OS X only)
      * [VirtualBox](https://www.virtualbox.org/wiki/Downloads/) (OS X only)
    * [MySQL](http://dev.mysql.com/downloads/installer/)
    * [PHP](http://php.net/downloads.php)
      * [Composer](https://getcomposer.org/download/)
    * [Node.js](http://nodejs.org/download/)
      * [Bower](http://bower.io/#install-bower)
      * [Grunt](http://gruntjs.com/getting-started/)
    * [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
      * [Sass](http://sass-lang.com/install/)

But don't just take my word for it! Check out the [install](https://raw.githubusercontent.com/mamamia/mwn-workwork/master/install) script and [workstation.yml](https://raw.githubusercontent.com/mamamia/mwn-workwork/master/ansible/workstation.yml) to follow along :thumbsup:

## Next steps
Once finished, close your terminal window and head over to one of the site repositories. There, you can read up on how to initialise your first site!

## Troubleshooting
### Docker i/o timeout
**Problem:** `ww start [site]` errors with `dial tcp: lookup index.docker.io on 192.168.178.1:53: read udp 192.168.178.1:53: i/o timeout`  
**Solution:** Run `boot2docker stop && boot2docker start && ww start [site]`
