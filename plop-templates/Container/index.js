/**
 * Container Generator
 */

const componentExists = require("../utils/componentExists");

const ContainerPromptNames = {
  ContainerType: "ContainerType",
  ContainerName: "ContainerName",
  wantMemo: "wantMemo",
  wantTests: "wantTests",
  wantConnected: "wantConnected",
};

module.exports = {
  description: "Create a container component",
  prompts: [
    {
      type: "list",
      // Variable name for this input
      name: ContainerPromptNames.ContainerType,
      // Prompt to display on command line
      message: "Select Container Type",
      default: "functional",
      choices: () => [
        { name: "Stateless", value: "functional" },
        { name: "Stateful", value: "class" },
      ],
    },
    {
      type: "input",
      name: ContainerPromptNames.ContainerName,
      message: "What should it be called?",
      default: "Form",
      validate: (value) => {
        if (!value) {
          return "Container name is required";
        } else {
          return componentExists(value)
            ? "A container with this name already exists"
            : true;
        }
      },
    },
    {
      when: function (response) {
        return response.ContainerType === "functional";
      },
      type: "confirm",
      name: ContainerPromptNames.wantMemo,
      default: false,
      message: "Do you want to wrap your container in React.memo?",
    },
    {
      type: "confirm",
      name: ContainerPromptNames.wantConnected,
      default: true,
      message: "Do you want the container to be connected to Redux?",
    },
    {
      type: "confirm",
      name: ContainerPromptNames.wantTests,
      default: false,
      message: "Do you want to have tests for container?",
    },
  ],
  actions: (data) => {
    const actions = [];

    if (data.wantConnected && data.ContainerType === "functional") {
      actions.push({
        type: "add",
        path: `src/containers/{{properCase ${ContainerPromptNames.ContainerName}}}/index.js`,
        templateFile: "plop-templates/Container/stateless.connected.js.hbs",
        abortOnFail: true,
      });
    } else if (data.wantConnected) {
      actions.push({
        type: "add",
        path: `src/containers/{{properCase ${ContainerPromptNames.ContainerName}}}/index.js`,
        templateFile: "plop-templates/Container/connected.js.hbs",
        abortOnFail: true,
      });
    } else if (data.ContainerType === "functional") {
      actions.push({
        type: "add",
        path: `src/containers/{{properCase ${ContainerPromptNames.ContainerName}}}/index.js`,
        templateFile: "plop-templates/Container/stateless.unconnected.js.hbs",
        abortOnFail: true,
      });
    } else {
      actions.push({
        type: "add",
        path: `src/containers/{{properCase ${ContainerPromptNames.ContainerName}}}/index.js`,
        templateFile: "plop-templates/Container/unconnected.js.hbs",
        abortOnFail: true,
      });
    }

    if (data.wantTests) {
      actions.push({
        type: "add",
        path: `src/containers/{{properCase ${ContainerPromptNames.ContainerName}}}/tests/index.test.js`,
        templateFile: "plop-templates/Container/test.js.hbs",
        abortOnFail: true,
      });
    }

    return actions;
  },
};
