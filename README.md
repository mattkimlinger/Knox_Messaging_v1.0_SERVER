# Knox
## A Secure Messaging Platform
### created by Matt Kimlinger
https://github.com/mattkimlinger
## Setup Instructions
 ### 1: Dependancies
in a teminal, use  'yarn install' or 'Npm install' to add dependencies

ON BOTH PROJECT FOLDERS

*Knox_Messaging_v1.0*
https://github.com/mattkimlinger/Knox_Messaging_v1.0

*Knox_Messaging_v1.0_SERVER*
https://github.com/mattkimlinger/Knox_Messaging_v1.0_SERVER

 ### 1: Database
in postico create a new databse named
*knox_messaging_v1.0*

copy and run all items from database.sql into the newly created database

### 2 Server Connection
press cmd + space to open "newwork utility" and copy your IP address, navigate to constants/server.js and update as such

module.exports = { 

    serverHost: 'http://[YOUR_IP_ADDRESS]:3000'

}
### 3 spin up server
in a terminal under Knox_Messaging_v1.0_SERVER project folder

**yarn start  or npm start**

### 4 Start package bundling
in a new terminal under Knox_Messaging_v1.0 project folder

**yarn start  or npm start**


### Expo App (Android)
If you have the expo app for Android
1. select Tunnel in the metro bundler 
2. scan the QR code on the expo app (must be Andrioid)
alternatively 
1. make sure both devices are connected to the same Network
2. select Lan in the metro bundler 
2. scan the QR code on the expo app (must be Andrioid)
### Simulator
in the metro bundler select iphone simluator


## Sign in 
#### as JohnDoe of JaneDoe, password: 1234
of create a new account (contacts cannot be added at this point however)
