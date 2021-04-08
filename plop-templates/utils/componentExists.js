/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */
const fs = require("fs");

// Check whether components or containers directory exists in /src folder
if (!fs.existsSync("src/components")) {
  fs.mkdirSync("src/components");
}

if (!fs.existsSync("src/containers")) {
  fs.mkdirSync("src/containers");
}

const pageComponents = fs.readdirSync("src/components");
const pageContainers = fs.readdirSync("src/containers");
const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  let component = comp
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
  return components.indexOf(component) >= 0;
}

module.exports = componentExists;
