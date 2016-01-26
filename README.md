## Petals COCKPIT

Petals COCKPIT is a web application prototype to drive Petals ESB servers.


### Before You Begin

WebStorm was used to develop it, but any IDE should work. Everything you need is to...

1. Install [Node.js](https://nodejs.org/)
2. Install [Git](https://git-scm.com/)
3. Install [MongoDB](https://www.mongodb.org/)


### What is what?

- What is BOWER?
Bower is a package manager. It can be used when you want to add packages of code to your web app, Bower can help you quickly install the code, and help you upgrade to newer versions.
- What is GULP?
Grunt helps you automate repetitive tasks. Grunt comes in lots of different varieties, and its job is to make your job easier.


### Building

Open a terminal in your project's directory.

```
cd /wherever/you/want/petals-cockpit-modular
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

Once the install process is over, you will be able to run your application with Gulp.
Run Gulp's default task.

```properties
gulp


### Setup Instructions

*NOTE:* This starter kit assumes that you already have bower (http://bower.io/) and gulp (http://gulpjs.com/) installed locally. If you don't, then run the following command first: ```npm install -g bower gulp```

1) Node Modules and Bower Components are not included in this repository to keep it light weight. After cloning or pulling changes from this repository, make sure to run the following command in terminal: ```npm install```

Bower dependencies should install automatically at the end of the NPM install process. If the dependencies don't install correctly you may need to manually run ```bower install``` as well.

2) Once everything is installed all you have to do is run ```gulp build``` and your new server will be running at ```http://localhost:5000``` (you can edit the port in the gulpFile). To speed up gulp times, the standard ```gulp``` task does not include copying over static files. Using the standard ```gulp``` task will be useful for most cases, but if you need to rebuild the whole ```dist``` folder, use ```gulp build```.


### This is an example of structure to modular architecture that we used

```
/app
--- /assets
------ /images
------ /icons
--- /common
------ /directives
------ /constants
------ /elements (common page elements like footer and header)
------ /resources
------ /services
------ /styles
------ common.js (common module requirements)
------ common.less
--- /modules
------ index.js
------ MainController.js
------ MainController.spec.js (controller unit tests)
------ modules.less
------ /module1 (ex: home)
--------- index.js (module definition)
--------- home.html (view)
--------- home.less (styles)
--------- HomeController.js (Controller inherits from MainController)
--------- HomeController.spec.js
--------- homeDirective.js (view definition)
--------- homeRoutes.js (route definitions)
------ /module2
--------- /sub-module1
--------- /sub-module2
--------- index.js (module definition - sub-modules are required in here)
--------- module.html
--------- module.less
--------- ModuleController.js
--------- ModuleController.spec.js
--------- moduleDirective.js
--------- moduleRoutes.js (route definitions and config options for nested sub-modules)
--- app.js
--- app.less
--- appConfig.js (main config file - no routes are defined here)
--- index.html
/dist (this is the gulp pipeline file output destination)
/libs (bower components install here)
/node_modules (npm installations go here)
```