const componentGenerator = require("./plop-templates/Component/index");
const containerGenerator = require("./plop-templates/Container/index");
const storeGenerator = require("./plop-templates/Store/index");

module.exports = (plop) => {
  plop.setWelcomeMessage(
    "Welcome to plop! What type of file would you like to generate?"
  );
  plop.setGenerator("component", componentGenerator);

  plop.setGenerator("container", containerGenerator);

  plop.setGenerator("redux store", storeGenerator);
};
