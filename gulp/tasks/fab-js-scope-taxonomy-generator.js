
const fs            = require('fs'); 
const gulp          = require('gulp');
const path          = require('path');

const config        = require('../config');


///////////////////////////
//
// Taxonomy JS scope file 
// - Generates a file (HTML) containg each taxonomies JS namescope.
//
///////////////////////////


const jsScopeTaxonomyOutput = function(){

        let     html        = 'var UI = window.UI || {}; ';
        const   htmlEnd     = '';
        let     htmlTaxo    = '';
        let     htmlBrand   = '';
        const   filePath    = path.join(__dirname, '../../src/assets/scripts/inline/UI.inlineGeneratedJsScope.js');

        config.brands.forEach(brand =>  {
            const nameClean  = brand.toLowerCase();                                          
            htmlBrand = 'UI.'+nameClean+' = UI.'+nameClean+' || {}; '
            html += htmlBrand;
        });

        config.taxonomy.forEach(taxo =>  {
            const name  = taxo[0].toLowerCase();      // Name -> All in lower case "1-taxo"
            const nameClean  = name.substring(2);     // Name -> Removes number prefix "1-"
            htmlTaxo = 'UI.'+nameClean+' = UI.'+nameClean+' || {}; '
            html += htmlTaxo;
        });

        html += htmlEnd;

        return fs.writeFile(filePath, html, (error) => error && console.error('yoyo' +error));

}


// Fabricator default taxonomy file generation
gulp.task('fab-js-scope-taxonomys:generate', function() {
    return jsScopeTaxonomyOutput();
});





