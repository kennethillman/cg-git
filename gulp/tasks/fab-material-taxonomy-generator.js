
const fs            = require('fs'); 
const del           = require('del');
const gulp          = require('gulp');
const path          = require('path');

const config        = require('../config');


///////////////////////////
//
// Taxonomy files 
// - Generates files (HTML) for each Taxonomy
//
///////////////////////////

const materialTaxonomyOutput = function(){

    function writeHtml(taxo) {
        let html = '';
        const name  = taxo[0].toLowerCase();                                          // All in lower case "1-taxo"
        const type  = taxo[1].toLowerCase();                                          // All in lower case "material"
        const nameClean  = name.substring(2);                                         // Removes number prefix "1-"
        const nameHeader = nameClean.charAt(0).toUpperCase() + nameClean.slice(1);    // Makes first letter uppercase "Taxo"
        const outputPath = path.join(__dirname, '../../fabricator/src/views');

        // Material or View
        if (type === 'material') {
        html = `---
title: Styleguide | ${nameHeader}
fabricator: true
---

<h1 data-f-toggle="labels" class="f-h1">${nameHeader}</h1>

{{#each materials.${name}.items}}

{{> f-item this}}

{{/each}}`;
        } else if (type === 'view') {
        html = `---
fabricator: true
---

<h1 data-f-toggle="labels">${nameHeader}</h1>

<ul>
{{#each views.${name}.items}}

    <li>
        <a href="${name}/{{@key}}.html" class="f-item-heading" target="_blank">{{@key}}</a>
    </li>

{{/each}}
</ul>`;
        }

        const filePath = path.join(outputPath, `${name}.html`);

        return fs.writeFile(filePath, html, (error) => error && console.error(error));

    }

    config.taxonomy.forEach(taxo => writeHtml(taxo));

}

///////////////////////////
//
// Delete Taxonomy files 
// - Deletes generated files (HTML) for each Taxonomy
//
///////////////////////////

// Function to delte generated taxonomy files
const materialTaxonomyDeletion = function(){

    config.taxonomy.forEach(taxo =>  {
        
        const fileName  = taxo.toLowerCase() + '.html';
        const deletionPath = path.join(__dirname, '../../fabricator/src/views/', fileName); 

        // Delete
        del(deletionPath);

    });
}


// Fabricator default taxonomy file generation
gulp.task('fab-material-taxonomys:generate', function() {
    return materialTaxonomyOutput();
});

// Delete generated taxonomy files
gulp.task('fab-material-taxonomys:delete-generated', function() {
    return materialTaxonomyDeletion();
});







