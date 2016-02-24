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

- `gulp serve-dev` will serve up the Angular application in a browser window. It is designed for an efficient development process. As you make changes to the code, the browser will update to reflect the changes immediately.

When you are ready to build the application for production, run the following command:
```bash
$ gulp serve-build
```

This will build a production-ready package in the `/build` folder.

## Folder Structure

The folder structure is project. The description below includes reasons for some of my customizations.

### Highest Level Structure

```
/bower_components
/gulp-tasks
/node_modules
/src
/test
```

- `bower_components:` Bower components downloaded by `bower install`

- `gulp-tasks:` contains all the tasks

- `node_modules:` Node.js modules downloaded by `npm install`

- `src:` contains client, server, and test

- `client:` contains index HTML, app and images

- `app:` contains all the client source files including HTML, styles (in SASS format) and JavaScript

- `test:` contains client tests. This folder is intentionally kept separate from client source because I expect many different types of tests in this folder (unit, integration, acceptance). On real projects, the number of test files can easily exceed the number of source files, hence I like to keep the clutter away from the real source - just my preference!

### Source Folder Structure

```
/src
    /client
        /app
            /components
            /core
            /framework
            /petals
            /app.module.js
            /app.scss
            /..
        /images
        /index.html
    /server
    /test
```

## Sass

- The prepocessor allows :
    - save time
    - to write an easily readable code by avoiding repetition
    - benefit of easily modifiable style sheets

## Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp autotest`

    Runs a watch to run all unit tests.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-fonts`

    Remove all fonts from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp fonts`

    Copy all fonts from source to the build folder

- `gulp images`

    Copy all images from source to the build folder

### Styles

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

### Building Production Code

- `gulp html`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp html` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.
