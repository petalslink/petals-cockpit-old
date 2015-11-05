## Petals COCKPIT

Petals COCKPIT is a web application prototype to drive Petals ESB servers.


### Before You Begin

Use a *standard* structure such as "MEAN": MongoDB, Express, AngularJS, Node.js.
WebStorm was used to develop it, but any IDE should work. Everything you need is to...

1. Install [Node.js](https://nodejs.org/)
2. Install [Git](https://git-scm.com/)
3. Install [MongoDB](https://www.mongodb.org/)


### What is what?

- What is BOWER?
Bower is a package manager. It can be used when you want to add packages of code to your web app, Bower can help you quickly install the code, and help you upgrade to newer versions.
- What is GRUNT?
Grunt helps you automate repetitive tasks. Grunt comes in lots of different varieties, and its job is to make your job easier.
- What is YO?
Yo is a scaffolding tool. It can be used to create and set-up your app by asking you questions, taking your input and pre-filling parts of your app based on your preferences.
It can also help you to quickly create and extend parts of your app.
- What is MEANJS?
The MEAN.js generator is the MEAN based code that will be used by Yo to help you pre-populate parts of your app.


### Building

Open a terminal in your project's directory.

```
cd /wherever/you/want/petals-cockpit
```

Then, execute these commands.

```properties
# Install NPM dependencies
npm cache clean
npm update

# Install Bower dependencies
bower update

# ... or...
./node_modules/bower/bin/bower update
```


### Running your Application

Once the install process is over, you will be able to run your application with Grunt.
Run Grunt's default task.

```properties
grunt

# ... or...
./node_modules/grunt-cli/bin/grunt
```


### Logging in as an Admin

After running the application, open your web browser to...

	http://localhost:3000

... and log in with the following credentials.

```
Username : 'SuperAdmin'
Password : 'stage2015'
```
