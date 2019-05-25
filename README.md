# Med DB - A MC536 database project

Repository for the "Database" course, a webpage that helps hospitals manage their information in relation to patients, doctors, exams, etc... 

Made with Angular, Node.js with Express and PostgreSQL.

<!-- ## Getting Started

If you want to try  -->

### Prerequisites

To run the server you are going to need *Node.js* in your PC, you can install easily with a quick search on the internet. 

Node.js comes with a very handy manager called *npm*, and we are going to use to make things simple to start the server.

You do not need to download a database management system to run the server.

However, if you want to run the server AND the database, that's going to be a little bit more complicated, you will need to download Postgres too and do the setup. The SQL files can be found on the SQL directory on this repo, and you will have to deal with the keys.js on the config directory later on.


### Installing and running the servers

First, clone this repository to your PC:

```
git clone https://github.com/danielferragut/MC536.git
```

Change directories to the new *MC536* directory created, more specifically you want to go to */MC536/server* directory.

To run the server, you will need to install the *node_modules* that the server needs to run. To do that run the command:

```
npm install
```
This should take some minutes to complete.

After the installation, you are able to run the server now, but it will cause an error due to the lack of keys for the database, if you want the keys.js for the database hit me up with a message. If you want to test on your own database, you will need to edit the fields on the keysTemplate.js in the config directory and rename it to keys.js.

After dealing with the keys.js, you can finally run the server with the command:

```
npm start
```

You should see a *Server listening requests at port 3000:* message if everthing is OK.


## Running the tests

If you want to run tests on the server, run the command:

```
npm test
```


<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).  -->

## Authors

* **Daniel Ferragut** - *Backend and documentation*
* **The rest of the team** - *To be added in the future*

