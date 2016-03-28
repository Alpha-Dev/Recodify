# Recodify
Recodify is a NodeJS application that cralws GitHub projects and searches for files, and parses the data. Parsing is done through Rule objects, which take the file's body and extension. Recodify is currently in active development.

##Tools and Libraries
Recodify is a written in Javascript using the latest EmacaScript2015 (ES6) standards. This is mainly because of its support of object oriented programming. 

- Babel is used to compile the ES6 code for use
- Mocha is used for unit testing, and Unit.JS runs as an assertion library to simplify the syntax for Mocha. 
- Gulp is used as the main build tool (Gulp Shell is also used to run shell commands on build)
- Request.js is used as the HTTP request library

##Building the Project
The gulpfile includes certain tasks

- build - build's the project with the output in the 'dist' folder. Run the project from the dist/main.js file
- runScript - run the script from the dist folder
- test - run defined tests
- buildRun - builds the project then runs the program
- default - builds the project then runs the test
