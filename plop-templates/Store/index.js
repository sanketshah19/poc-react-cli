/**
 * Store Generator
 */

const reducerExists = require("../utils/reducerExists");

module.exports = {
  description: "Create a reusable redux module with thunk (actions/reducer)",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is your redux module name?",
      validate: (value) => {
        if (!value) {
          return "Redux module name is required";
        } else {
          return reducerExists(value)
            ? "A Redux module with this name already exists"
            : true;
        }
      },
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/appRedux/actions/{{pascalCase name}}.js",
      templateFile: "plop-templates/Store/modulesWithThunk/actions.js.hbs",
    },
    {
      type: "add",
      path: "src/appRedux/reducers/{{pascalCase name}}.js",
      templateFile: "plop-templates/Store/modulesWithThunk/reducer.js.hbs",
    },
    {
      type: "add",
      path: "src/constants/types/{{pascalCase name}}.js",
      templateFile: "plop-templates/Store/modulesWithThunk/types.js.hbs",
    },
    {
      type: "add",
      path: "src/appRedux/reducers/rootReducer.js",
      templateFile: "plop-templates/Store/injectable-rootReducer.js.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/appRedux/reducers/rootReducer.js",
      pattern: `/* INJECT_IMPORT_REDUCER */`,
      template: `import {{pascalCase name}}Reducer from './{{pascalCase name}}';`,
    },
    {
      type: "append",
      path: "src/appRedux/reducers/rootReducer.js",
      pattern: `/* INJECT_REDUCER */`,
      template: `\t{{camelCase name}}: {{pascalCase name}}Reducer,`,
    },
  ],
};
