/**
 * JS and DOM helpers.
 */
// Convert JS function to invoked closure and stringify.
var jsToStr = function (fn) {
  return "(" + fn.toString() + ")()";
};

module.exports = {
  jsToStr: jsToStr
};
