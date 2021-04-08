/**
 * requireField
 *
 * Check whether the user has provided input for the given prompt
 */

const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + " is required";
    }
    return true;
  };
};

module.exports = requireField;
