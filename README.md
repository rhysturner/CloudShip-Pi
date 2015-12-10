#CloudShip Server
##Peddle powered animation

###Author Rhys Turner

###Details

Using raspberry pi and a reed switch connected to PGIO port 23 and ground pins run the server on the app and connect locally.

###Installation

####Requirements

1. Raspberry Pi and a switch connected to ground and GPIO 23 pins

1. Chrome 45+

1. have **Read** access to the [https://github.com/rhysturner/CloudShip-Pi](https://github.com/rhysturner/CloudShip-Pi) repository

1. have your **SSH Keys** installed at [Bitbucket](https://bitbucket.org/)

1. install [NodeJS](http://nodejs.org/)

1. install **express**, **webpack** and **browserify** globally

    $ npm install -g express webpack browserify

Run the following comands on the raspberry pi

	$ git clone git@bitbucket.org:rhysturner/cloudship-server.git
    $ cd cloudship-server
    $ npm install

Test from the Raspberry pi
	
	$ npm install
	$ npm start

Open chrome on your pi and go to http://localhost:8000