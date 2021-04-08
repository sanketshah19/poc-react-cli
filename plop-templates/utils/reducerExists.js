/**
 * reducerExists
 *
 * Check whether the given reducer exist in either the reducer directory
 */

const { readdirSync } = require("fs");

const reducers = readdirSync("src/appRedux/reducers");

function reducerExists(name) {
  let reducer = name
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
  const reducerPath = reducers.map((file) => file.split(".js")[0]);
  return reducerPath.indexOf(reducer) >= 0;
}

module.exports = reducerExists;
