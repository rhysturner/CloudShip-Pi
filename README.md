#CloudShip Server
##Peddle powered animation

###Author Rhys Turner

###Details

Using raspberry pi and a reed switch connected to PGIO port 23 and ground pins run the server on the app and connect locally.

###Installation

####Requirements

1. Raspberry Pi and a switch connected to ground and GPIO 23 pins

1. Chrome 45+

1. have **Read** access to the [rhysturner/cloudship-server/overview](https://bitbucket.org/rhysturner/cloudship-server/overview) repository

1. have your **SSH Keys** installed at [Bitbucket](https://bitbucket.org/)

1. install [NodeJS](http://nodejs.org/)

1. install **express**, **webpack** and **browserify** globally

    $ npm install -g express webpack browserify

Run the following comands on the raspberry pi

	$ git clone git@bitbucket.org:rhysturner/cloudship-server.git
    $ cd cloudship-server
    $ npm install

Test

	$ npm start