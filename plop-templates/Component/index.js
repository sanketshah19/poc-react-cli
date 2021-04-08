/**
 * Component Generator
 */

const componentExists = require("../utils/componentExists");
// const requireField = require("../utils/requireField");

const ComponentPromptNames = {
  ComponentType: "ComponentType",
  ComponentName: "ComponentName",
  wantMemo: "wantMemo",
  wantTests: "wantTests",
};

module.exports = {
  description: "Create a reusable component",
  // User input prompts provided as arguments to the template
  prompts: [
    {
      type: "list",
      // Variable name for this input
      name: ComponentPromptNames.ComponentType,
      // Prompt to display on command line
      message: "Select Component Type",
      default: "functional",
      choices: () => [
        { name: "Functional component", value: "functional" },
        { name: "Class Component", value: "class" },
      ],
    },
    {
      // Raw text input
      type: "input",
      name: ComponentPromptNames.ComponentName,
      message: "What should it be called?",
      validate:
        // requireField("name"),
        (value) => {
          if (!value) {
            return "Component name is required";
          } else {
            return componentExists(value)
              ? "A component with this name already exists"
              : true;
          }
        },
    },
    {
      when: function (response) {
        return response.ComponentType === "functional";
      },
      type: "confirm",
      name: ComponentPromptNames.wantMemo,
      default: false,
      message: "Do you want to wrap your component in React.memo?",
    },
    {
      type: "confirm",
      name: ComponentPromptNames.wantTests,
      default: false,
      message: "Do you want to have tests?",
    },
  ],
  actions: function (data) {
    const actions = [
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: `src/components/{{pascalCase ${ComponentPromptNames.ComponentName}}}/{{pascalCase ${ComponentPromptNames.ComponentName}}}.module.css`,
        // Handlebars template used to generate content of new file
        templateFile: "plop-templates/Component/component.module.css.hbs",
      },
      {
        type: "add",
        path: "src/components/index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/components/index.js",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase ${ComponentPromptNames.ComponentName}}} from './{{pascalCase ${ComponentPromptNames.ComponentName}}}';`,
      },
      {
        type: "append",
        path: "src/components/index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase ${ComponentPromptNames.ComponentName}}},`,
      },
    ];

    if (data.ComponentType === "functional") {
      actions.push({
        type: "add",
        path: `src/components/{{pascalCase ${ComponentPromptNames.ComponentName}}}/index.js`,
        templateFile: "plop-templates/Component/functionComponent.js.hbs",
      });
    } else {
      actions.push({
        type: "add",
        path: `src/components/{{pascalCase ${ComponentPromptNames.ComponentName}}}/index.js`,
        templateFile: "plop-templates/Component/classComponent.js.hbs",
      });
    }

    if (data.wantTests) {
      actions.push({
        type: "add",
        path: `src/components/{{pascalCase ${ComponentPromptNames.ComponentName}}}/{{pascalCase ${ComponentPromptNames.ComponentName}}}.test.js`,
        templateFile: "plop-templates/Component/test.js.hbs",
      });
    }
    return actions;
  },
};
