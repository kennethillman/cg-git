var Handlebars = require('handlebars');
var _          = require('lodash');

/**
 * Convert a string to kebab-case, using lodash.kebabCase
 * @param {string} string - the string to convert
 * @returns {string} - the converted string
 */
module.exports = function(a, b, options) {
      if (a && a.indexOf(b) > -1 ) {
	    return options.fn(this);
	  } else{
	    return options.inverse(this);	
	  }
};
