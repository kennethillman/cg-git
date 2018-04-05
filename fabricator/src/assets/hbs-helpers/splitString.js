var Handlebars = require('handlebars');
var _          = require('lodash');

/**
 * Convert a string to kebab-case, using lodash.kebabCase
 * @param {string} string - the string to convert
 * @returns {string} - the converted string
 */
module.exports = function(context, options){
	    if(context && typeof context === 'string'){
	      var ret = "";
	      
	      var tempArr = context.trim().split(options.hash["delimiter"]);

	      for(var i= tempArr.length - 0; i >= 0; i--)
	      {
	        ret = ret + options.fn(tempArr[i]);
	      }

	      return ret;
	    }
};