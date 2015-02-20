# MWN WorkWork
[WorkWork](https://soundcloud.com/subpop/clipping-work-work-feat-cocc) is a bunch of shell and provisioning scripts that ensure all MWN developers are using the same tools the same way.

[WorkWork](http://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3) has been designed to be run right after a fresh OS install, so mileage may vary on established machines. If you come across and errors or bad code: fix, document, pull request :)

## Requirements
* OS X or some flavour of Linux
* OS X systems require Xcode, or at very least the Xcode Command Line Tools. If you don't have this installed, you will receive a prompt as part of the install process below
* All of the [local dependencies](#local-dependencies), which will be installed with the scripts below

## Installation
Open your terminal and run: `curl https://raw.githubusercontent.com/mamamia/mwn-workwork/master/installer | sh`

This little script will install Git (if missing), clone this repo into your workspace directory, then add the `bin` folder to your PATH.

Once finished, you should run `ww --workstation` to complete the provisioning of your machine.

## Local dependencies
* [Git](http://git-scm.com/downloads)
* [PHP](http://php.net/downloads.php)
  * [Composer](https://getcomposer.org/download)
* [Docker](https://docs.docker.com/installation/)
  * [boot2docker](http://boot2docker.io/) (OS X only)
  * [VirtualBox](https://www.virtualbox.org/wiki/Downloads) (OS X only)
* [Ansible](http://docs.ansible.com/intro_installation.html)
* [Terraform](https://www.terraform.io/downloads.html)
* [AWS CLI](http://aws.amazon.com/cli/)
* [Node.js](http://nodejs.org/download/)
  * [Grunt](http://gruntjs.com/getting-started)