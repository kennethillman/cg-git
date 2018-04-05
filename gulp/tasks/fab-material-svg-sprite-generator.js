
const fs            = require('fs'); 
const del           = require('del');
const gulp          = require('gulp');
const debug         = require('gulp-debug');
const gulpif        = require('gulp-if');
const imagemin      = require('gulp-imagemin');
const filter        = require('gulp-filter');
const using         = require('gulp-using');
const rename        = require('gulp-rename');
const size          = require('gulp-size');
const svgSprite     = require('gulp-svg-sprite');
const path          = require('path');
const runSequence   = require('run-sequence');


const config        = require('../config');


///////////////////////////
//
// SVG Materials
// - Generate Fabricator material files (HTML) for each SVG symbol.
//
///////////////////////////


// Delete task
// - Deletes genreated material -> fabricator/src/materials/components/svg-**
// - Deletes generated files json,scss and svg in -> assets/generated/svg
// - Deletes svg sprite in -> assets/dev
// - Deletes svg sprite in -> assets/dist
// - Deletes svg sprite in -> fabricator/src/assets/svg/
gulp.task('svg:delete-generated', (cb) => del(['src/ui/2-atoms/svg-**/*.html','src/assets/generated/svg/*.{json,scss,svg}','dev/svg/*.svg','dist/svg/*.svg','fabricator/src/assets/svg/*.svg'], cb));


// Function to make the svg materials
const materialOutput = function(folder){

    let svgPath = '../../src//ui/2-atoms/svg-' + folder;
    
    const outputPath = path.join(__dirname, svgPath);
    let name = folder;

    function writeHtml(id, width, height) {
        let name            = id;
        const html = `---
layout: f-g-3
class-preview: f-icon 
notes: |
  Default dimensions *(px)*: **${width.replace('px', '')}x${height.replace('px', '')}** 
---

<svg role="img" title="${name}" class="${id} svg-icon {{#if class}} {{class}}{{/if}}">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg/svg-icons-sprite.svg#${id}"></use>
</svg>`;

        const filePath = path.join(outputPath, `${id}.html`);

        return fs.writeFile(filePath, html, (error) => error && console.error(error));
    }

    const json = require('../../src/assets/generated/svg/svg-'+ name +'.json');

    Object.keys(json).forEach((key) => writeHtml(key, json[key].width, json[key].height));


}

// OLD SVG LINK FOR MATERIAL:
// <use xlink:href="/assets/svg/svg-${folder}-sprite.svg#${id}"></use> 



// Icons
gulp.task('materials:icons', function() {
    return materialOutput('icons');
});

// SVG graphics , (ex Badges)
gulp.task('materials:graphics', function() {
    return materialOutput('graphics');
});

// SVG graphics , (ex Badges)
gulp.task('materials:logos', function() {
    return materialOutput('logos');
});


// combined task
gulp.task('svg', (cb) => runSequence('svg:delete-generated', ['svg:icons',/*'svg:graphics','svg:logos',*/ ], 'materials:icons',/* 'materials:graphics', 'materials:logos',*/ cb));




