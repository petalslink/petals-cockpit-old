# Petals COCKPIT

- This is a web application prototype to drive Petals ESB servers.
- This app provides a starter project that implements best practices in coding, building and testing AngularJS applications using Material design. 

Features include:

- A well-organized component hierarchy starting from `approot`. Components are implemented using directives (no dangling controllers). This provides a good architectural direction until Angular 2.0 becomes available.
- Follows [AngularJS Style Guide](https://github.com/johnpapa/angularjs-styleguide).
- Uses [AngularUI Router](https://github.com/angular-ui/ui-router) for flexible routing and nested views.
- Uses [Angular Material](https://material.angularjs.org) to implement an interface that conforms to Material design.
- Provides logging and exception handling frameworks with toaster notifications.
- Provides a Gulp based build system – code changes are reflected in the browser immediately.
- Uses Karma, Mocha and Chai for testing.

## Requirements

WebStorm was used to develop it, but any IDE should work. Everything you need is to...

1. - Install Node
       - on OSX, install [home brew](http://brew.sh/) and type `brew install node`
       - on Windows, use the installer available at [nodejs.org](http://nodejs.org/)
       - On OSX you can alleviate the need to run as sudo by [following John Papa's instructions](http://jpapa.me/nomoresudo)
   - Open terminal
   - Type `npm install -g node-inspector bower gulp`
   
2. Install [Git](https://git-scm.com/)

3. Install [MongoDB](https://docs.mongodb.com/manual/installation/)

### Quick Start

Clone this repo
```bash

Open a terminal in your project's directory.

```
cd /wherever/you/want/petals-cockpit
```

$ npm install
$ bower install

- `npm install` will install the required node libraries under `node_modules` and then call `bower install` which will install the required client-side libraries under `bower_components`.

### Running your Application

Once the install process is over, you will be able to run your application with Gulp.
Run Gulp's default task.

```
$ gulp serve-dev
```
Petals cockpit starts and displays an authentication page in your browser :

![Authentication Popup](doc/authentication.png?raw=true)

By default , we use 'admin', 'admin' to authenticate.
