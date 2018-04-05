
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

const config = require('../config');


///////////////////////////
//
// SVG sprite
// – Generate svg spritemap and accompanying .scss-file
// + .json-file containing symbol data used for generating Fabricator material HTML files (FOR THE STYLEGUIDE)
//
///////////////////////////

const spriteOutput = function(folder){

    let name = folder || '';

    let spriteConfig = {
            shape:     {
                id: {
                    generator: '%s', // set the symbol id (%s == filename without extension)
                },
            },
            mode:      {
                symbol: { // use the «symbol» mode: https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md#defs--symbol-mode
                    dest:       '.', // make output destination relative to «gulp.dest()»
                    dimensions: '%s', // don't add the default "-dims" string, just use the value from «prefix»
                    prefix:     '%s', // selectors used in SCSS output
                    sprite:     'svg-'+ name +'-sprite.svg', // .svg sprite output path
                    render:     {
                        scss: {
                            dest:     '_svg-'+ name +'.scss', // .scss output path
                            template: './src/assets/svg/_templates/svg-symbols-template.scss', // path to custom SCSS output template file
                        },
                        json: { // output a JSON file with data for each symbol, so Fabricator materials can be automatically created
                            dest:     'svg-' + name +'.json', // '../../_data/svg-symbols.json'
                            template: './src/assets/svg/_templates/svg-symbols-template.json',
                        },
                    },
                },
            },
        };

        return gulp.src(path.join('./src/assets/svg/', name, '/**/*.svg')) 
                   .pipe(gulpif(!config.lint, using()))
                   .pipe(svgSprite(spriteConfig))
                   .pipe(gulp.dest('src/assets/generated/svg'))
                   .pipe(filter('**/*.svg')) // output only the .svg sprite file to the dist path
                   .pipe(gulp.dest('dev/assets/svg/'))
                   .pipe(gulpif(config.prod,gulp.dest('dist/assets/svg/')))
                   //.pipe(debug())
                   .pipe(size({ title: 'SVG sprite' }))

}

// Seagal default icons
gulp.task('svg:icons', function() {
    return spriteOutput('icons');
});

// SVG graphics , (ex Badges)
gulp.task('svg:graphics', function() {
    return spriteOutput('graphics');
});

// SVG Logos, Sprite for fabricator brand section
gulp.task('svg:logos', function() {
    return spriteOutput('logos');
});



