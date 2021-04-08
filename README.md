# Plop

## What is Plop?

Micro-generator framework that makes it easy for an entire team to create files with a level of uniformity.
It is a small tool that gives you a simple way to generate code or any other type of flat text files in a consistent way. You see, we all create structures and patterns in our code (routes, controllers, components, helpers, etc). These patterns change and improve over time so when you need to create a NEW _insert-name-of-pattern-here_, it's not always easy to locate the files in your codebase that represent the current "best practice." That's where plop saves you. With plop, you have your "best practice" method of creating any given pattern in CODE. Code that can easily be run from the terminal by typing `plop`. Not only does this save you from hunting around in your codebase for the right files to copy, but it also turns "the right way" into "the easiest way" to make new files.

If you boil plop down to its core, it is basically glue code between [inquirer](https://github.com/SBoudrias/Inquirer.js/) prompts and [handlebar](https://github.com/wycats/handlebars.js/) templates.

## Why Generators?

Because when you create your boilerplate separate from your code, you naturally put more time and thought into it.

Because saving your team (or yourself) 5-15 minutes when creating every route, component, controller, helper, test, view, etc...

## Installation

### 1. Add plop to your project

```
$ npm install --save-dev plop
```

### 2. Install plop globally (optional, but recommended for easy access)

```
$ npm install -g plop
```

### 3. Create a plopfile.js at the root of your project

```javascript
module.exports = function (plop) {
  // create your generators here
  plop.setGenerator("basics", {
    description: "this is a skeleton plopfile",
    prompts: [
      // array of inquirer prompts
      // questions we want to ask in CLI and save questions for
    ],
    actions: [
      // array of actions
      // what should be generated based off of the above prompts
    ],
  });
};
```

## Your First Plopfile

A plopfile starts its life as a lowly node module that exports a function which accepts the `plop` object as its first parameter.

```javascript
module.exports = function (plop) {};
```

The `plop` object exposes the plop api object which contains the `setGenerator(name, config)` function. This is the function that you use to (wait for it) create a generator for this plopfile. When `plop` is run from the terminal in this directory (or any sub-directory), a list of these generators will be displayed.

Let's try setting up a basic generator to see how that looks.

```javascript
module.exports = function (plop) {
  // controller generator
  plop.setGenerator("controller", {
    description: "application controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "controller name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{name}}.js",
        templateFile: "plop-templates/controller.hbs",
      },
    ],
  });
};
```

The _controller_ generator we created above will ask us 1 question, and create 1 file. This can be expanded to ask as many questions as needed, and create as many files as needed. There are also additional actions that can be used to alter our codebase in different ways.

## Using Prompts

Plop uses the [inquirer.js](https://github.com/SBoudrias/Inquirer.js) library to gather user data. A list of [prompt types](https://github.com/SBoudrias/Inquirer.js/#prompt-types) can be found on the inquirer official website.

## CLI Usage

Once plop is installed, and you have created a generator, you are ready to run plop from the terminal. Running `plop` with no parameters will present you with a list of generators to pick from. You can also run `plop [generatorName]` to trigger a generator directly. If you did not install plop globally, you will need to setup an npm script to run plop for you.

```javascript
// package.json
{
    ...,
    "scripts": {
        "generate": "plop"
    },
    ...
}
```

## How to run

This is where plop magic will happen.

```sh
npm run generate
```

## Documentation

[Click Here](https://www.evernote.com/shard/s409/sh/aa5975cc-d321-f599-336d-2c4804432961/f5bd7c8387d1e0e32a904191ab377fed)

##

![React-Starter-CLI](React-Starter-CLI.gif)
