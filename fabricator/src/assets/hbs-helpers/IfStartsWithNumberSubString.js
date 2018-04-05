var Handlebars = require('handlebars');
var _          = require('lodash');

/**
 * If "a" string starts with a number subString it "b"
 * @param {a} string - the string to convert
 * @param {b} string - subString amount
 * @returns {string} - the converted string
 */

module.exports = function(a, b) {

	var string = a;

	if (a.match(/^\d/)) {
   		string = a.substring(b); 
	}
	 
	return string;
};
