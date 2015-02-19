# MWN WorkWork
[WorkWork](https://soundcloud.com/subpop/clipping-work-work-feat-cocc) is a bunch of shell and provisioning scripts that ensure all MWN developers are using the same tools the same way.

[WorkWork](http://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3) has been designed to be run right after a fresh OS install, so mileage may vary on established machines. If you come across and errors or bad code: fix, document, pull request :)

## Requirements
* OS X or some flavour of Linux
* OS X systems require Xcode, or at very least the Xcode Command Line Tools. If you don't have this installed, you will receive a prompt as part of the install process below

## Installation
Open your terminal and run: `curl http://git.io/AqvT | sh`

This little script will install Git (if missing), clone this repo into your workspace directory, then add the `bin` folder to your PATH.

Once finished, you should run `ww init workstation` to complete the provisioning of your machine.